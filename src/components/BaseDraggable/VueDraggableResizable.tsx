import { matchesSelectorToParentElements, addEvent, removeEvent } from './utils';
import { defineComponent, PropType, reactive, getCurrentInstance, ref, computed } from "vue";
interface props {
  className: string
  classNameDraggable: string
  classNameResizable: string
  classNameDragging: string
  classNameResizing: String
  classNameActive: String
  classNameHandle: String
  disableUserSelect: boolean
  enableNativeDrag: boolean
  preventDeactivation: boolean
  active: boolean
  draggable: boolean
  resizable: boolean
  lockAspectRatio: boolean
  w: number
  h: number
  minWidth: number
  minHeight: number
  maxWidth: number
  maxHeight: number
  x: number
  y: number
  z: number | string
  handles: Array<string>
  dragHandle: string | null
  dragCancel: string | null
  axis: 'x' | 'y' | 'both'
  grid: [number,number]
  parent: boolean
  onDragStart: Function
  onResizeStart: Function
}
const events = {
  mouse: {
    start: 'mousedown',
    move: 'mousemove',
    stop: 'mouseup'
  },
  touch: {
    start: 'touchstart',
    move: 'touchmove',
    stop: 'touchend'
  }
}

const userSelectNone = {
  userSelect: 'none',
  MozUserSelect: 'none',
  WebkitUserSelect: 'none',
  MsUserSelect: 'none'
}

const userSelectAuto = {
  userSelect: 'auto',
  MozUserSelect: 'auto',
  WebkitUserSelect: 'auto',
  MsUserSelect: 'auto'
}
const data = reactive({
  rawWidth: 0,
  rawHeight: 0,
  rawLeft: 0,
  rawTop: 0,
  rawRight: null,
  rawBottom: null,

  left: 0,
  top: 0,
  right: null,
  bottom: null,

  aspectFactor: 0 / 0,

  parentWidth: null,
  parentHeight: null,

  minW: 0,
  minH: 0,

  maxW: 0,
  maxH: 0,

  handle: null,
  enabled: false,
  resizing: false,
  dragging: false,
  zIndex: 0 as number | string,
  mouseClickPosition: {} as {
    mouseX?: number,
    mouseY?: number,
    left?: number,
    right?: number,
    top?: number,
    bottom?: number,
    x?: number,
    y?: number,
    w?: number,
    h?: number
  },
  bounds: {} as {
    minLeft: number | null,
    maxLeft: number | null,
    minRight: number | null,
    maxRight: number | null,
    minTop: number | null,
    maxTop: number | null,
    minBottom: number | null,
    maxBottom: number | null
  }
})
let eventsFor = events.mouse
let deselect: (e: MouseEvent) => void
export default defineComponent({
  name: 'vue-draggable-resizable',
  props: {
    className: {
      type: String,
      default: 'vdr'
    },
    classNameDraggable: {
      type: String,
      default: 'draggable'
    },
    classNameResizable: {
      type: String,
      default: 'resizable'
    },
    classNameDragging: {
      type: String,
      default: 'dragging'
    },
    classNameResizing: {
      type: String,
      default: 'resizing'
    },
    classNameActive: {
      type: String,
      default: 'active'
    },
    classNameHandle: {
      type: String,
      default: 'handle'
    },
    disableUserSelect: {
      type: Boolean,
      default: true
    },
    enableNativeDrag: {
      type: Boolean,
      default: false
    },
    preventDeactivation: {
      type: Boolean,
      default: false
    },
    active: {
      type: Boolean,
      default: false
    },
    draggable: {
      type: Boolean,
      default: true
    },
    resizable: {
      type: Boolean,
      default: true
    },
    lockAspectRatio: {
      type: Boolean,
      default: false
    },
    w: {
      type: Number,
      default: 200,
      validator: (val: number) => val > 0
    },
    h: {
      type: Number,
      default: 200,
      validator: (val: number) => val > 0
    },
    minWidth: {
      type: Number,
      default: 0,
      validator: (val: number) => val >= 0
    },
    minHeight: {
      type: Number,
      default: 0,
      validator: (val: number) => val >= 0
    },
    maxWidth: {
      type: Number,
      default: null,
      validator: (val: number) => val >= 0
    },
    maxHeight: {
      type: Number,
      default: null,
      validator: (val: number) => val >= 0
    },
    x: {
      type: Number,
      default: 0,
      validator: (val) => typeof val === 'number'
    },
    y: {
      type: Number,
      default: 0,
      validator: (val) => typeof val === 'number'
    },
    z: {
      type: [String, Number],
      default: 'auto',
      validator: (val: string | number) => (typeof val === 'string' ? val === 'auto' : val >= 0)
    },
    handles: {
      type: Array as PropType<Array<string>>,
      default: () => ['tl', 'tm', 'tr', 'mr', 'br', 'bm', 'bl', 'ml'],
      validator: (val: Array<string>) => {
        const s = new Set(['tl', 'tm', 'tr', 'mr', 'br', 'bm', 'bl', 'ml'])

        return new Set(val.filter(h => s.has(h))).size === val.length
      }
    },
    dragHandle: {
      type: String,
      default: null
    },
    dragCancel: {
      type: String,
      default: null
    },
    axis: {
      type: String as PropType<props['axis']>,
      default: 'both',
      validator: (val: string) => ['x', 'y', 'both'].includes(val)
    },
    grid: {
      type:  Array as unknown as PropType<props['grid']>,
      default: () => [1, 1]
    },
    parent: {
      type: Boolean,
      default: false
    },
    onDragStart: {
      type: Function,
      default: null
    },
    onResizeStart: {
      type: Function,
      default: null
    }
  },
  setup(props: props, { emit }) {
    data.rawWidth = props.w
    data.rawHeight = props.h
    data.rawLeft = props.x
    data.rawTop = props.y
    data.left = props.x
    data.top = props.y
    data.aspectFactor = props.w / props.h
    data.minW = props.minWidth
    data.minH = props.minHeight
    data.maxW = props.maxWidth
    data.maxH = props.maxHeight
    data.enabled = props.active
    data.zIndex = props.z
    const width=computed(()=>{
      return data.parentWidth!-data.left-data.right!
    })
    const el = ref<HTMLDivElement>().value!
    const resetBoundsAndMouseState = () => {
      data.mouseClickPosition = { mouseX: 0, mouseY: 0, x: 0, y: 0, w: 0, h: 0 }

      data.bounds = {
        minLeft: null,
        maxLeft: null,
        minRight: null,
        maxRight: null,
        minTop: null,
        maxTop: null,
        minBottom: null,
        maxBottom: null
      }
    }
    const getParentSize=()=>{
      if (props.parent) {
        const style = window.getComputedStyle(el.parentNode! as Element, null)

        return [
          parseInt(style.getPropertyValue('width'), 10),
          parseInt(style.getPropertyValue('height'), 10)
        ]
      }

      return [null, null]
    }
    const handleMove=(e:TouchEvent)=>{
      const handle = data.handle
      const mouseClickPosition = data.mouseClickPosition

      const tmpDeltaX = mouseClickPosition.mouseX! - e.touches[0].pageX 
      const tmpDeltaY = mouseClickPosition.mouseY! - e.touches[0].pageY

      const [deltaX, deltaY] = this.snapToGrid(this.grid, tmpDeltaX, tmpDeltaY)

      if (!deltaX && !deltaY) return

      if (handle.includes('b')) {
        this.rawBottom = mouseClickPosition.bottom + deltaY
      } else if (handle.includes('t')) {
        this.rawTop = mouseClickPosition.top - deltaY
      }

      if (handle.includes('r')) {
        this.rawRight = mouseClickPosition.right + deltaX
      } else if (handle.includes('l')) {
        this.rawLeft = mouseClickPosition.left - deltaX
      }

      emit('resizing', data.left, data.top, data.width, data.height)
    }
    deselect = (e) => {
      const target = e.target as HTMLBaseElement

      const regex = new RegExp(props.className + '-([trmbl]{2})', '')

      if (!el.contains(target) && !regex.test(target.className)) {
        if (data.enabled && !props.preventDeactivation) {
          data.enabled = false

          emit('deactivated')
          emit('update:active', false)
        }

        removeEvent(document.documentElement, eventsFor.move, handleMove)
      }

      resetBoundsAndMouseState()
    }
    const snapToGrid=(grid:[number,number], pendingX:number, pendingY:number)=>{
      const x = Math.round(pendingX / grid[0]) * grid[0]
      const y = Math.round(pendingY / grid[1]) * grid[1]

      return [x, y]
    }
  }
})