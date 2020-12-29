import { matchesSelectorToParentElements, addEvent, removeEvent } from './utils';
import { defineComponent, PropType, reactive,getCurrentInstance } from "vue";
interface props{
  className:string
  classNameDraggable:string
  classNameResizable:string
  classNameDragging:string
  classNameResizing:String
  classNameActive:String
  classNameHandle:String
  disableUserSelect:boolean
  enableNativeDrag:boolean
  preventDeactivation:boolean
  active:boolean
  draggable:boolean
  resizable:boolean
  lockAspectRatio:boolean
  w:number
  h:number
  minWidth:number
  minHeight:number
  maxWidth:number
  maxHeight:number
  x:number
  y:number
  z:number|string
  handles:Array<string>
  dragHandle:string | null
  dragCancel:string | null
  axis:'x' | 'y' | 'both'
  grid:Array<number>
  parent:boolean
  onDragStart:Function
  onResizeStart:Function
}
export default defineComponent({
  name:'vue-draggable-resizable',
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
      validator: (val:number) => val > 0
    },
    h: {
      type: Number,
      default: 200,
      validator: (val:number) => val > 0
    },
    minWidth: {
      type: Number,
      default: 0,
      validator: (val:number) => val >= 0
    },
    minHeight: {
      type: Number,
      default: 0,
      validator: (val:number) => val >= 0
    },
    maxWidth: {
      type: Number,
      default: null,
      validator: (val:number) => val >= 0
    },
    maxHeight: {
      type: Number,
      default: null,
      validator: (val:number) => val >= 0
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
      validator: (val:string|number) => (typeof val === 'string' ? val === 'auto' : val >= 0)
    },
    handles: {
      type: Array as PropType<Array<string>>,
      default: () => ['tl', 'tm', 'tr', 'mr', 'br', 'bm', 'bl', 'ml'],
      validator: (val:Array<string>) => {
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
      validator: (val:string) => ['x', 'y', 'both'].includes(val)
    },
    grid: {
      type: Array as PropType<Array<number>>,
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
  setup(props:props){
    const data=reactive({
      rawWidth: props.w,
      rawHeight: props.h,
      rawLeft: props.x,
      rawTop: props.y,
      rawRight: null,
      rawBottom: null,

      left: props.x,
      top: props.y,
      right: null,
      bottom: null,

      aspectFactor: props.w / props.h,

      parentWidth: null,
      parentHeight: null,

      minW: props.minWidth,
      minH: props.minHeight,

      maxW: props.maxWidth,
      maxH: props.maxHeight,

      handle: null,
      enabled: props.active,
      resizing: false,
      dragging: false,
      zIndex: props.z
    })
    
  }
})