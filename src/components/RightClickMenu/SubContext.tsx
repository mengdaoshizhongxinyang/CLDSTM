import "./subContext.less";
<<<<<<< Updated upstream
import { Transition, defineComponent, watch, ref, nextTick, h, reactive, DefineComponent, PropType } from "vue";
=======
import { Transition, defineComponent, watch, ref, nextTick, h, reactive, PropType, DefineComponent, onMounted } from "vue";
import { sortAndDeduplicateDiagnostics } from "typescript";
>>>>>>> Stashed changes
interface typeMenu {
  label?: string,
  name?: string,
  children?: Array<typeMenu>,
<<<<<<< Updated upstream
  show?: Boolean,
=======
  show: boolean,
>>>>>>> Stashed changes
  function?: Function
}
interface typeBasePosition {
  left: number,
  top: number,
  width: number,
  height: number
}
<<<<<<< Updated upstream

=======
type position={
  left:string
  top:string
}
>>>>>>> Stashed changes
const SubContext = defineComponent({
  name: "SubContext",
  components: {
    Transition
  },
  setup(props, { emit, slots }) {
<<<<<<< Updated upstream

    let data = reactive({ menuList: props.menus.concat(), style: {} })

=======
    let data = reactive({ menuList: props.menus, style: {} as position })

>>>>>>> Stashed changes
    let direction = props.direction
    const handleMouseenter = (menu: typeMenu) => {
      menu.show = true;
    }
    const handleMouseleave = (menu: typeMenu) => {
      menu.show = false;
    }

    const clickDocumentHandler = () => {
<<<<<<< Updated upstream
      if (props.show) {
        emit("update", false);
      } else {
        emit("update", true);
=======
      if (props.onUpdate) {
        if (props.show) {
          props.onUpdate(false)
        } else {
          props.onUpdate(true)
        }
>>>>>>> Stashed changes
      }
    }
    let root = ref<HTMLDivElement>()
    const setPosition = () => {
      const ele = root.value!
      const {
        x,
        y,
        width,
        height,
      } = ele.parentElement!.getBoundingClientRect()
      let topover, leftover;
      let docHeight = document.documentElement.clientHeight;
      let docWidth = document.documentElement.clientWidth;
      let menuHeight = ele.getBoundingClientRect().height;
      let menuWidth = ele.getBoundingClientRect().width;
      topover =
        y + height + menuHeight <= docHeight ? y : y + height - menuHeight;
      if (direction == "left") {
        leftover = x - menuWidth;
      } else {
        leftover =
          x + width + menuWidth <= docWidth ? x + width : x - menuWidth;
        if (x + width + menuWidth > docWidth) {
          direction = "left";
        }
      }
      data.style = {
        left: `${leftover}px`,
        top: `${topover}px`,
      };
      emit("setPosition", data.style);
    }
    const handleClick = (e: MouseEvent, menu: typeMenu) => {
      e.preventDefault()
      if (!menu.children) {
        if (menu.function) {
          menu.function();
        }
        emit("menuItemClick", menu);
      }
    }
    const renderChildren = (menu: typeMenu) => {
      return menu.children && menu.children.length > 0 ? h(
        <SubContext
          direction={direction}
          menus={menu.children}
          show={menu.show}
          onUpdate={(val: boolean) => {
            menu.show = val;
          }}
          onMenuItemClick={handleClick}
          v-slots={{ ...slots }}
        ></SubContext>
      ) : (
          null
        );
    }
    watch(() => props.show, (val) => {
      if (val) {
        nextTick(setPosition);
        document.body.addEventListener("mousedown", clickDocumentHandler);
        direction = "right";
      } else {
        document.body.removeEventListener(
          "mousedown",
          clickDocumentHandler
        );
        data.menuList.forEach((item) => {
          item.show = false;
        });
      }
    })
    return () => h(
      <Transition name="contextmenu-fade">
        <div class="menu" style={data.style} v-show={props.show} ref={root}>
          {data.menuList.map((menu, index) => {
            return (
              <div
                class="menu-item"
                key={index}
                onMouseenter={() => handleMouseenter(menu)}
                onMouseleave={() => handleMouseleave(menu)}
                onMousedown={(e) => { e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation() }}
                onClick={(e) => handleClick(e, menu)}
              >
                {menu.name && slots[menu.name] ? (
                  slots[menu.name]!().concat(renderChildren(menu)!)
                ) : (
                    <div class="menu-item-content">
                      {menu.label}
                      {renderChildren(menu)}
                    </div>
                  )}
              </div>
            );
          })}
        </div>
      </Transition>
    );
  },
  props: {
    menus: {
<<<<<<< Updated upstream
      type: Array as PropType<typeMenu[]>,
=======
      type: Array as PropType<Array<typeMenu>>,
>>>>>>> Stashed changes
      default: []
    },
    basePosition: {
      type: Object as PropType<typeBasePosition>,
      default: {
        left: 0,
        top: 0,
        width: 0,
<<<<<<< Updated upstream
        height: 0
      },
=======
        height: 0,
      }
>>>>>>> Stashed changes
    },
    show: {
      type: Boolean,
      default: false,
    },
    direction: {
      type: String as PropType<"left" | "right">,
      default: "right"
    },
    onUpdate: {
      type: Function as PropType<(val: boolean) => void>
    },
    onMenuItemClick: {
      type: Function as PropType<(e: MouseEvent, menu: typeMenu) => void>
    },
    onSetPosition:{
      type:Function as PropType<(e:position)=>void>
    }
  }
})
export default SubContext;
