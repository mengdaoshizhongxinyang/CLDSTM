import "./subContext.less";
import { Transition, defineComponent, watch, computed, ref, nextTick,RendererElement } from "vue";
import { state } from '@/store';
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
const SubContext = defineComponent({
  name: "SubContext",
  components: {
    Transition
  },
  setup(p, { emit, slots, attrs }) {
    let style= {}
    let subStyle={
      x: 0,
      y: 0,
    }
    console.log(attrs)
    let props = p as thisProps
    let menuList = computed(() => {
      return props.menus?.concat([]);
    })
    let direction=props.direction
    const watchedShow = ref(props.show);
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
    const setPosition=()=>{
      const {
        x,
        y,
        width,
        height,
      } = this.$el.parentElement.getBoundingClientRect();
      let topover, leftover;
      let docHeight = document.documentElement.clientHeight;
      let docWidth = document.documentElement.clientWidth;
      let menuHeight = this.$el.getBoundingClientRect().height;
      let menuWidth = this.$el.getBoundingClientRect().width;
      topover =
        y + height + menuHeight <= docHeight ? y : y + height - menuHeight;
      if (this.$parent.direction == "left") {
        leftover = x - menuWidth;
      } else {
        leftover =
          x + width + menuWidth <= docWidth ? x + width : x - menuWidth;
        if (x + width + menuWidth > docWidth) {
          direction = "left";
        }
      }
      style = {
        left: `${leftover}px`,
        top: `${topover}px`,
      };

      emit("setPosition", style);
    }
    const handleClick=(menu:typeMenu)=>{
      if (!menu.children) {
        if (menu.function) {
          menu.function();
        }
        emit("menuItemClick", menu);
      }
    }
    const renderChildren=(menu:typeMenu)=>{
      return menu.children && menu.children.length > 0 ? (
        <SubContext
          menus={menu.children}
          show={menu.show}
          onUpdate={(val:Boolean) => {
            menu.show = val;
          }}
          onMenuItemClick={handleClick}
          scopedSlots={{ ...slots }}
        ></SubContext>
      ) : (
          ""
        );
    }
    watch(watchedShow, (val, oldVal) => {
      if (val) {
        nextTick(setPosition);
        document.body.addEventListener("mousedown", clickDocumentHandler);
        direction = "right";
      } else {
        document.body.removeEventListener(
          "mousedown",
          clickDocumentHandler
        );
        menuList.value.forEach((item) => {
          item.show = false;
        });
      }
    })
    return (
      <Transition name="contextmenu-fade">
        <div class="menu" style={style} v-show={show}>
          {menuList.value.map((menu, index) => {
            return (
              <div

                class="menu-item"
                key={index}
                onMouseenter={() => handleMouseenter(menu)}
                onMouseleave={() => handleMouseleave(menu)}
                onClick={() => handleClick(menu)}
              >
                {menu.name && slots[menu.name] ? (
                  slots[menu.name](menu).concat(renderChildren(menu))
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


