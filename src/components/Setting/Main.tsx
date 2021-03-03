/*
 * @Author: mengdaoshizhongxinyang
 * @Date: 2021-01-29 13:57:50
 * @Description: 
 * @GitHub: https://github.com/mengdaoshizhongxinyang
 */
import SettingBody from "./SettingBody";
import { IconManage } from "@/components";
import { defineComponent, reactive, computed, ref,h } from "vue"
import { useStore } from "@/store";
import { PropTypes } from "@/utils/proptypes";
import style from "./Main.module.less";

export default defineComponent({
  components: {
    SettingBody,
    IconManage
  },
  setup(props, { emit, attrs }) {
    const data = reactive({
      x: 0,
      y: 0
    })
    const store = useStore()
    const colNum = computed(() => {
      return props.width >= 500 ? (Math.floor((props.width - 24) / 240) >= 5 ? 5 : Math.floor((props.width - 24) / 240)) : 1
    })
    const items = computed(() => store.state.core.setting.settings.Main)

    const body = ref<HTMLDivElement>()

    const handleMousemove = (e: MouseEvent) => {
      if (body.value) {
        data.x = e.clientX - body.value.getBoundingClientRect().x - 75;
        data.y = e.clientY - body.value.getBoundingClientRect().y - 75;
      }
    }
    const handleOpen = (item:(typeof items.value)[number]) => {
      emit('openSub', item.component!)
    }
    return () => h(
      <SettingBody width={props.width} {...attrs}>
        <div class={style["content"]} onMousemove={handleMousemove}>
          <div class={style["title"]}>设置</div>
          <div
            class={`${style['setting-item']} ${style[colNum.value > 1 ? 'widescreen' : 'narrowscreen']}`}
            style={`width:${colNum.value > 1 ? colNum.value * 240 + 'px' : '100%'}`}
            ref={body}
          >
            {
              items.value.map(item => {
                return <div class={style["item"]}>
                  <div class={`${style["item-ud-occlude"]} ${style['occlude']}`}></div>
                  <div class={`${style["item-lr-occlude"]} ${style['occlude']}`}></div>
                  <div class={style["item-content"]} onClick={() => handleOpen(item)}>
                    <div class={style["item-content-icon"]}>
                      <IconManage icon={item.icon}></IconManage>
                    </div>
                    <div class={style["item-content-title"]}>
                      {item.title}
                    </div>
                    <div class={style["item-content-desc"]}>
                      { item.desc }
                    </div>
                  </div>
                  <div class={`${style["item-lr-occlude"]} ${style['occlude']}`}></div>
                  <div class={`${style["item-ud-occlude"]} ${style['occlude']}`}></div>
                </div>
              })
            }
            {
              new Array((colNum.value-(items.value.length%colNum.value))%colNum.value).map(item=>{
                return <div class={style["filling"]}></div>
              })
            }
            <div
              class={style["shadow-box"]}
              style={{ left: data.x + 'px', top: data.y + 'px' }}
            ></div>
          </div>
        </div>
      </SettingBody>
    )
  },
  props: {
    width: PropTypes.number(500),
    onOpenSub:PropTypes.func< (name:string)=>void >((name:string)=>{})
  }
})