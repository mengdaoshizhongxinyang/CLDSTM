/*
 * @Author: mengdaoshizhongxinyang
 * @Date: 2021-01-29 15:26:58
 * @Description: 
 * @GitHub: https://github.com/mengdaoshizhongxinyang
 */
import { Frame as SettingFrame, IconManage } from "@/components";
import { Transition, defineComponent, reactive, computed, h,watch } from "vue";
import Main from "./Main";
import SubModule,{SubModuleNames} from "./SubModule";
const allModule = {
  ...SubModule,
  Main
}
import style from "./Setting.module.less";

type ModuleName = keyof typeof allModule
import { useStore } from "@/store"
import { PropTypes } from "@/utils/proptypes";
export default defineComponent({
  components: {
    IconManage,
    Transition,
    ...allModule,
    SettingFrame,
  },
  props: {
    subComponents: PropTypes.strings<ModuleName>('Main')
  },
  setup(props, { attrs }) {
    const data = reactive({
      w: 500,
      h: 500,
      component: props.subComponents,
      operated: [] as ModuleName[],
      widen: true,
    })
    const store = useStore()
    const settings = computed(() => {
      return store.state.core.setting.settings;
    })
    function handleResize(x: number, y: number, w: number, h: number) {
      data.w = w;
      data.h = h;
    }

    function handleOpenSub(name: ModuleName) {
      if (name) {
        if (name == data.component) {
          return;
        }
        if (data.widen && name.indexOf("Setting") > -1) {
          // handleOpenSub(settings.value[name][0].component);
          handleOpenSub(settings.value[name][0].component);
        } else {
          data.operated.push(data.component);
          data.component = name;
        }
      }
    }
    function handleBack() {
      data.component = data.operated.pop()!;
      if (data.widen && data.component.indexOf("Setting") > -1) {
        data.component = data.operated.pop()!;
      }
    }
    const slots = {
      'header-name-more': ()=><div class={style['left-title']}>
        {
          data.operated.length > 0 ?
            <div
              class={style['back-button']}
              onClick={handleBack}
            >
              <IconManage icon="ArrowLeftOutlined"></IconManage>
            </div> : null
        }
        <div>设置</div>
      </div>,
      content: ()=><div class={style['content']}>
        <Transition enterActiveClass={style['push-enter-active']} leaveActiveClass={style['push-leave-active']}>
          {
            h(allModule[data.component], {
              class: style["sub-content"],
              width: data.w,
              height: data.h,
              widen: data.widen,
              onOpenSub: handleOpenSub
            })
          }
        </Transition>
      </div>
    }
    watch(()=>data.w,(val, oldVal)=>{
      if (oldVal >= 500 && val < 500) {
        data.widen = false;
      } else if (oldVal < 500 && val >= 500) {
        data.widen = true;
        if (data.component.indexOf("Setting") > -1) {
          handleOpenSub(settings.value[data.component][0].component);
        }
      }
    })
    return () => h(
      <SettingFrame
        {...attrs}
        onResizing={handleResize}
        minWidth={300}
        minHeight={320}
        initialW={data.w}
        initialH={data.h}
        initialX={0}
        initialY={0}
        dragCancel={`.${style['back-button']}`}
        v-slots={slots}
      >
        {/* {
          slots['title'] ? slots['title']() : <div class="left-title">
            {
              data.operated.length > 0 ?
                <div
                  class={style['back-button']}
                  onClick={handleBack}
                >
                  <IconManage icon="ArrowLeftOutlined"></IconManage>
                </div> : null
            }
            <div>设置</div>
          </div>
        }
        {
          slots['content'] ? slots['content']() : 
        } */}
      </SettingFrame>
    )
  }
})