import VueDraggableResizable from "@/components/BaseDraggable";
import RightClickMenu from "@/components/RightClickMenu";
import IconManage from "@/components/IconManage";
import { useStore } from "@/store";
import { computed, defineComponent, h, reactive } from "vue";
import style from "./Frame.module.less";
interface Props {
  scrollX: boolean
  scrollY: boolean
  minWidth: number
  minHeight: number
  initialW: number
  initialH: number
  initialX: number
  initialY: number
  z: number
  appsId: number
  allowEnlarge: boolean
  allowMinimize: boolean
  draggable: boolean
  resizable: boolean
  dragCancel: string
}
export default defineComponent({
  components: {
    IconManage,
    VueDraggableResizable,
    RightClickMenu
  },
  setup(props: Props, { emit, slots }) {
    const data = reactive({
      headerMenu: false,
      contextMenuOffset: {
        left: 0,
        top: 0,
      },
      isFull: false,
      old_w: 0,
      old_h: 0,
      old_x: 0,
      old_y: 0,
      w: props.initialW,
      h: props.initialH,
      x: props.initialX,
      y: props.initialY,
      title: "",
    })
    const store = useStore()
    const getAppInfo = computed(() => store.getters.getAppInfo)
    const rightClick = (e: MouseEvent, button: string) => {
      data.headerMenu = true
    }
    const fullScrean = () => {
      if (!props.allowEnlarge) {
        return;
      }
      if (data.isFull === false) {
        let width = document.body.clientWidth;
        let height = document.body.clientHeight - 56;
        data.old_w = data.w;
        data.old_h = data.h;
        data.old_x = data.x;
        data.old_y = data.y;
        data.x = 0;
        data.y = 0;
        data.w = width;
        data.h = height;
        data.isFull = true;
      } else {
        data.x = data.old_x;
        data.y = data.old_y;
        data.w = data.old_w;
        data.h = data.old_h;
        data.isFull = false;
      }
      emit("resize", data.w, data.h)
    }
    const minimize = () => {
      if (props.allowMinimize) {
        store.dispatch("minimizeApps", props.appsId)
        emit('minimize')
      }
    }
    const handleResizestop = (x: number, y: number, w: number, h: number) => {
      data.x = x;
      data.y = y;
      data.w = w;
      data.h = h;
      emit("resize", w, h, x, y);
    }
    const handleDragstop = (x: number, y: number) => {
      data.x = x;
      data.y = y;
      emit("dragstop", x, y);
    }
    const close = () => {
      store.dispatch("closeApps", props.appsId);
      emit("close");
    }
    const active = () => {
      store.dispatch("activeApps", props.appsId);
    }
    return () => h(
      <vue-draggable-resizable
        class={style["filter-main"]}
        drag-handle={`.${style["header-back"]}`}
        minWidth={props.minWidth}
        minHeight={props.minHeight}
        w={data.w}
        h={data.h}
        x={data.x}
        y={data.y}
        z={props.z}
        draggable={props.draggable}
        onResizestop={(x: number, y: number, w: number, h: number) => handleResizestop(x, y, w, h)}
        onDragstop={(x: number, y: number) => handleDragstop(x, y)}
        onActivated={active}
        resizable={props.resizable}
        drag-cancel={props.dragCancel}
      >
        <div class={style["header"]} onDblclick={fullScrean}>
          <div class={style["header-slot"]}>
            {
              slots['name'] ? slots['name']() : null
            }
          </div>

          <div class={style["header-back"]} onContextmenu={(e) => rightClick(e, 'headerMenu')}>
            {
              slots["header-name-more"] ?
                slots["header-name-more"]() :
                <div class={style["header-title"]}>{getAppInfo.value(props.appsId).name || ""}</div>
            }
            <right-click-menu
              offset={data.contextMenuOffset}
              v-model={[data.headerMenu]}
            >
            </right-click-menu>
          </div>

          <div class={style["header-button-group"]}>
            {
              props.allowMinimize ? <div class={style["header-button"]} onClick={minimize}>
                <icon-manage icon="minus" iconStyle="outlined"></icon-manage>
              </div> : null
            }
            {
              props.allowEnlarge ? data.isFull ? <div class={style["header-button"]} onClick={fullScrean}>
                <icon-manage icon="block" iconStyle="outlined"></icon-manage>
              </div> : <div class={style["header-button"]} onClick={fullScrean}>
                  <icon-manage icon="border" iconStyle="outlined"></icon-manage>
                </div> : null
            }

            <div class={style["header-button-close"]} onClick={close}>
              <icon-manage icon="close" iconStyle="outlined"></icon-manage>
            </div>
          </div>
        </div>
        {
          
          slots['content'] ?
            slots['content']() :
            <div class={style["main-space"]}>
              <div class={style["content-header"]}></div>
              <div
                class={style["content"]}
                style={{
                  overflowX: scrollX ? 'auto' : 'hidden',
                  overflowY: scrollY ? 'auto' : 'hidden'
                }}
              >
                {
                  slots['default'] ? slots['default']() : null
                }
              </div>
            </div>
        }
      </vue-draggable-resizable>
    )
  },
  props: {
    scrollX: {
      type: Boolean,
      default: true,
    },
    scrollY: {
      type: Boolean,
      default: true,
    },
    minWidth: {
      type: Number,
      default: 146,
    },
    minHeight: {
      type: Number,
      default: 32,
    },
    initialW: {
      type: Number,
      default: 246,
    },
    initialH: {
      type: Number,
      default: 200,
    },
    initialX: {
      type: Number,
      default: 0,
    },
    initialY: {
      type: Number,
      default: 0,
    },
    z: {
      type: Number,
      default: 0,
    },
    appsId: {
      type: Number,
      default: 0,
    },
    allowEnlarge: {
      type: Boolean,
      default: true,
    },
    allowMinimize: {
      type: Boolean,
      default: true,
    },
    draggable: {
      type: Boolean,
      default: true,
    },
    resizable: {
      type: Boolean,
      default: true,
    },
    dragCancel: {
      type: String,
      default: ''
    }
  },
})