/*
 * @Author: mengdaoshizhongxinyang
 * @Date: 2021-01-29 15:26:58
 * @Description: 
 * @GitHub: https://github.com/mengdaoshizhongxinyang
 */
import { Frame as SettingFrame, IconManage } from "@/components";
import { Transition, defineComponent, reactive, computed, h } from "vue";
import Main from "./Main";
import SubModule from "./SubModule";
const allModule = {
  ...SubModule,
  Main
}
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
  setup(props, { attrs, slots }) {
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
    function handleOpenSub(name: ModuleName | undefined) {
      if (name) {
        if (name == data.component) {
          return;
        }
        if (data.widen && name.indexOf("Setting") > -1) {
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
        drag-cancel="'.back-button'"
      >
        {
          slots['title'] ? slots['title']() : <div class="left-title">
            <div
              class="back-button"
              v-if="operated.length"
              onClick={handleBack}
            >
              <IconManage icon="ArrowLeftOutlined"></IconManage>
            </div>
            <div>设置</div>
          </div>
        }
        {
          slots['content'] ? slots['content']() : <div class="content">
            <Transition name="actions">
              <component
                is="component"
                class="sub-content"
                width="w"
                height="h"
                widen="widen"
                onOpenSub={handleOpenSub}
              ></component>
              {
                h(allModule[data.component], {
                  class: "sub-content",
                  width:data.w,
                  height:data.h,
                  widen:data.widen,
                  onOpenSub:{ handleOpenSub }
                })
              }
            </Transition>
          </div>
        }
      </SettingFrame>
    )
  }
})