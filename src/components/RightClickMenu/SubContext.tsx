import "./subContext.less";
import { Transition, defineComponent, watch, ref, nextTick,h, reactive, DefineComponent } from "vue";
interface typeMenu {
  label?: string,
  name?: string,
  children?: Array<typeMenu>,
  show?: Boolean,
  function?:Function
}
interface typeBasePosition {
  left: Number,
  top: Number,
  width: Number,
  height: Number,
}
interface thisProps {
  menus: Array<typeMenu> | [],
  basePosition: typeBasePosition,
  show: Boolean,
  direction: "left" | "right"
}
const SubContext:DefineComponent = defineComponent({
  name: "SubContext",
  components: {
    Transition
  },
  setup(p, { emit, slots }) {
    let props = p as thisProps
    let data= reactive({menuList:props.menus.concat(),style:{}})

    let direction=props.direction
    const handleMouseenter=(menu:typeMenu)=>{
      menu.show = true;
    }
    const handleMouseleave=(menu:typeMenu)=>{
      menu.show = false;
    }
    
    const clickDocumentHandler=()=>{
      if (props.show) {
        emit("update", false);
      } else {
        emit("update", true);
      }
    }
    let root=ref<HTMLDivElement>()
    const setPosition=()=>{
      const ele =root.value!.parentElement!
      const {
        x,
        y,
        width,
        height,
      } = ele.getBoundingClientRect()
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
          direction = "right";
        }
      }
      data.style = {
        left: `${leftover}px`,
        top: `${topover}px`,
      };

      emit("setPosition", data.style);
    }
    const handleClick=(e:MouseEvent,menu:typeMenu)=>{
      e.preventDefault()
      if (!menu.children) {
        if (menu.function) {
          menu.function();
        }
        emit("menuItemClick", menu);
      }
    }
    const renderChildren=(menu:typeMenu)=>{
      return menu.children && menu.children.length > 0 ? h(
        <sub-context
          direction={direction}
          menus={menu.children}
          show={menu.show}
          onUpdate={(val:Boolean) => {
            menu.show = val;
          }}
          
          onMenuItemClick={handleClick}
          v-slots={{ ...slots }}
        ></sub-context>
      ) : (
          null
        );
    }
    watch(()=>props.show, (val) => {
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
    return ()=>h(
      <Transition name="contextmenu-fade">
        <div class="menu" style={data.style} v-show={props.show} ref={root}>
          {data.menuList.map((menu, index) => {
            return (
              <div

                class="menu-item"
                key={index}
                onMouseenter={() => handleMouseenter(menu)}
                onMouseleave={() => handleMouseleave(menu)}
                onMousedown={(e)=>{e.preventDefault();e.stopPropagation();e.stopImmediatePropagation()}}
                onClick={(e) => handleClick(e,menu)}
              >
                {menu.name && slots[menu.name] ? (
                  slots[menu.name]!(menu).concat(renderChildren(menu))
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
      type: Array,
      default: () => {
        return [];
      },
    },
    basePosition: {
      type: Object,
      default: function () {
        return {
          left: 0,
          top: 0,
          width: 0,
          height: 0,
        };
      },
    },
    show: {
      type: Boolean,
      default: false,
    },
    direction: {
      type: String,
      default: "right"
    }
  }
})
export default SubContext;
