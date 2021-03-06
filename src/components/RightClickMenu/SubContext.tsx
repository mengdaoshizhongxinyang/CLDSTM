import "./subContext.less";
import { Transition, defineComponent, watch, ref, nextTick, h, reactive, PropType, DefineComponent, onMounted } from "vue";
import { typeMenu } from "./type";

interface typeBasePosition {
  left: number,
  top: number,
  width: number,
  height: number
}
type position = {
  left: string
  top: string
}

const SubContext = defineComponent({
  name: "SubContext",
  components: {
    Transition
  },
  setup(props, { slots, emit }) {
    let data = reactive({ menuList: props.menus, style: {} as position })
    watch(()=>props.menus,()=>{
      data.menuList=props.menus
    })
    let direction = props.direction
    const handleMouseenter = (menu: typeMenu) => {
      menu.show = true;
    }
    const handleMouseleave = (menu: typeMenu) => {
      menu.show = false;
    }

    const clickDocumentHandler = () => {
      if (props.show) {
        emit('update', false)
      } else {
        emit('update', true)
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

      emit('setPosition', data.style)

    }
    const handleClick = (e: MouseEvent, menu: typeMenu) => {
      e.preventDefault()
      if (!menu.children) {
        if (menu.function) {
          menu.function();
        }
        emit('menuItemClick', e, menu)
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
      type: Array as PropType<typeMenu[]>,
      default: []
    },
    basePosition: {
      type: Object as PropType<typeBasePosition>,
      default: {
        left: 0,
        top: 0,
        width: 0,
        height: 0,
      }
    },
    show: {
      type: Boolean,
      default: false,
    },
    direction: {
      type: String as PropType<"left" | "right">,
      default: "right"
    }
  },
  emits: {
    update: (val: boolean) => { return true },
    menuItemClick: (e: MouseEvent, menu: typeMenu) => { return true },
    setPosition: (e: position) => { return true }
  }
})
export default SubContext;
