/*
 * @Author: mengdaoshizhongxinyang
 * @Date: 2021-01-29 13:57:50
 * @Description: 
 * @GitHub: https://github.com/mengdaoshizhongxinyang
 */
import { mapState } from 'vuex';
import SettingBody from "./SettingBody";
import { IconManage } from "@/components";
import { defineComponent, reactive, computed, ref,h } from "vue"
import { useStore } from "@/store";
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
      emit('openSub', item.component)
    }
    return () => h(
      <SettingBody width={props.width} {...attrs}>
        <div class="content" onMousemove={handleMousemove}>
          <div class="title">设置</div>
          <div
            class={`setting-item ${colNum.value > 1 ? 'widescreen' : 'narrowscreen'}`}
            style={`width:${colNum.value > 1 ? colNum.value * 240 + 'px' : '100%'}`}
            ref="body"
          >
            {
              items.value.map(item => {
                return <div class="item">
                  <div class="item-ud-occlude occlude"></div>
                  <div class="item-lr-occlude occlude"></div>
                  <div class="item-content" onClick={() => handleOpen(item)}>
                    <div class="item-content-icon">
                      <icon-manage icon="item.icon"></icon-manage>
                    </div>
                    <div class="item-content-title">
                      {item.title}
                    </div>
                    <div class="item-content-desc">
                      { item.desc }
                    </div>
                  </div>
                  <div class="item-lr-occlude occlude"></div>
                  <div class="item-ud-occlude occlude"></div>
                </div>
              })
            }
            {
              new Array((colNum.value-(items.value.length%colNum.value))%colNum.value).map(item=>{
                return <div class="filling"></div>
              })
            }
            <div
              class="shadow-box"
              style={{ left: data.x + 'px', top: data.y + 'px' }}
            ></div>
          </div>
        </div>
      </SettingBody>
    )
  },
  props: {
    width: {
      type: Number,
      default: 500,
    },
  },
  emits: {
    openSub: (item:unknown) => { return true }
  }
})