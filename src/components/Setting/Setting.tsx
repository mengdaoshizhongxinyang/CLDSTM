/*
 * @Author: mengdaoshizhongxinyang
 * @Date: 2021-01-29 15:26:58
 * @Description: 
 * @GitHub: https://github.com/mengdaoshizhongxinyang
 */
import { Frame as SettingFrame, IconManage } from "@/components";
import { Transition, defineComponent, reactive, computed, h, watch } from "vue";
import Main from "./Main";
import SubModule, { SubModuleNames, SubModuleSubKeys, SubModuleKeys } from "./SubModule";
const allModule = {
  ...SubModule,
  Main
}
import style from "./Setting.module.less";

type ModuleName = keyof SubModuleNames
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
      subComponent: undefined as SubModuleKeys | undefined,
      operated: [] as (ModuleName | SubModuleSubKeys)[],
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

    function handleOpenSub(name: ModuleName, subName?: SubModuleKeys) {
      if (name == data.component) {
        if (subName) {
          data.subComponent = subName
        } else {
          if (data.widen && name != 'Main') {
            data.subComponent = settings.value[name][0].component
          }
        }
      } else {
        data.operated.push(`${data.component}${data.subComponent ? `-${data.subComponent}` : ''}` as SubModuleSubKeys);
        data.component = name;
        if (data.widen && name != 'Main' && !subName) {
          data.subComponent = settings.value[name][0].component
        }
      }
    }
    function handleBack() {
      const [component, subComponent] = data.operated.pop()!.split('-') as [ModuleName, SubModuleKeys]
      if (data.widen && subComponent !== undefined && component != 'Main') {
        handleBack()
      }
      data.component = component;
      data.subComponent = subComponent
    }
    const slots = {
      'header-name-more': () => <div class={style['left-title']}>
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
      content: () => <div class={style['content']}>
        <Transition enterActiveClass={style['push-enter-active']} leaveActiveClass={style['push-leave-active']}>
          {
            h(allModule[data.component], {
              class: style["sub-content"],
              width: data.w,
              height: data.h,
              widen: data.widen,
              subComponent: data.subComponent,
              onOpenSub: handleOpenSub
            })
          }
        </Transition>
      </div>
    }
    watch(() => data.w, (val, oldVal) => {
      if (oldVal >= 500 && val < 500) {
        data.widen = false;
      } else if (oldVal < 500 && val >= 500) {
        data.widen = true;
        if (data.subComponent === undefined) {
          data.subComponent = settings.value[data.component][0].component!
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