/*
 * @Author: mengdaoshizhongxinyang
 * @Date: 2021-02-26 14:55:55
 * @Description: 
 */
import { PropTypes } from "@/utils/proptypes";
import { useStore } from "@/store";
import { defineComponent, computed, h } from "vue";
import { IconManage } from "@/components";
import { SubModuleName } from "./index";
import { Setting } from "@/store/modules/core/setting";
import style from "./MenuList.module.less";
export default defineComponent({
  components: {
    IconManage
  },
  props: {
    from: PropTypes.string('Main'),
    widen: PropTypes.bool(false)
  },
  setup(props, { emit }) {
    const store = useStore()
    const list = computed(() => {

      let from = props.from.charAt(0).toUpperCase() + props.from.slice(1);
      from += from.indexOf('Setting') > -1 ? '' : 'Setting'
      return store.state.core.setting.settings[from as SubModuleName]
    })
    function handleClick(item:Setting) {
      emit("openSub", item.component!);
    }
    return () => h(
      <div class={[style['menu-main'], props.widen ? style['widen-menu'] : style['narrow-menu']]}>
        <div class={style["menu-title"]}>
          <div class={style["home-item"]}></div>
          <div class={'title'}></div>
        </div>
        <div class={style["menu-list"]}>
          {
            list.value.map(item => {
              return <div
                class={style["menu-list-item"]}
                onClick={()=>handleClick(item)}
              >
                <div class={style["menu-list-item-label"]}></div>
                <div class={style["menu-list-item-content"]}>
                  <IconManage icon={item.icon}></IconManage>
                  {item.name}
                </div>
              </div>
            })
          }
        </div>
      </div>
    )
  },
  emits: {
    openSub: (item:SubModuleName) => {
      return true
    }
  }
})