/*
 * @Author: mengdaoshizhongxinyang
 * @Date: 2021-01-22 09:51:48
 * @Description: 
 * @GitHub: https://github.com/mengdaoshizhongxinyang
 */
import { computed, defineComponent, h,PropType } from "vue";
import { useStore } from "@/store";
import { AppFrame } from "@/components";
import style from "./PropertiesWindow.module.less";
export default defineComponent({
  components: {
    AppFrame
  },
  props: {
    attributes: {
      type: Object as PropType<{name:string,[key : string]:unknown}>,
      default:{ name: "" }
    },
  },
  setup(props, { attrs }) {
    const store = useStore()
    const data = ({
      name: "",
      tabs: ["常规", "详细"],
      active: 0,
    })
    data.name=props.attributes.name
    const position = computed(() => {
      return {
        x: store.state.core.properties.clickPositionX,
        y: store.state.core.properties.clickPositionY
      }
    })
    const handleChangeActive = (index: number) => {
      data.active = index;
    }
    return () => h(
      <AppFrame
        {...attrs}
        allowEnlarge={false}
        allowMinimize={false}
        resizable={false}
        initialW={360}
        initialH={600}
        initialX={position.value.x}
        initialY={position.value.y}
      >
        <div class={style["main"]}>
          <div class={style["tab"]}>
            {
              data.tabs.forEach((tab, index) => {
                return <div
                  class={index == data.active ? style['tab-active'] : ''}
                  onClick={() => handleChangeActive(index)}
                >
                  {tab}
                </div>
              })
            }
          </div>
          <div class={style["content"]}></div>
          <div class={style["properties-button-group"]}>
            <button>确定</button>
            <button>取消</button>
            <button>应用</button>
          </div>
        </div>
      </AppFrame>
    )
  }
})