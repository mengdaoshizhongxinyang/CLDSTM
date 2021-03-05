/*
 * @Author: mengdaoshizhongxinyang
 * @Date: 2021-02-24 09:52:23
 * @Description: 
 */
import { defineComponent, computed, reactive, h, defineAsyncComponent } from "vue";
import { PropTypes } from "@/utils/proptypes";
import { useStore } from "@/store";
import InfoTitle from "../InfoTitle";

import SettingBody from "../../SettingBody";
import style from "./LanguageModule.module.less";

import { Select } from "ant-design-vue";
const { Option } = Select

export default defineComponent({
  components: {
    SettingBody,
    InfoTitle,
    Select,
    Option
  },
  props: {
    widen: PropTypes.bool(true)
  },
  setup(props, { attrs }) {
    const store = useStore()
    // const data = reactive({
    //   list: [{ name: "语言", icon: "font-colors", component: "LanguageModule" }],
    // })
    const languageList = computed(() => {
      return store.state.core.language.languageOptions;
    })
    const languageSelected = computed(() => {
      return store.state.core.language.languageSelected;
    })
    function handleSelect(item: any) {
      store.dispatch("setLanguage", languageList.value[item as keyof typeof languageList.value]);
    }
    const slots = {
      title: () => <div class={style["title"]}>
        <div class={style["title-name"]}>语言设置</div>
      </div>
    }
    return () => h(

      <div class={style["language-right"]} style={`margin-left:${props.widen ? 240 : 0}px`}>
        {/* <InfoTitle></InfoTitle> */}
        <div class={style["language-content"]}>
          <Select value={languageSelected.value.abbreviation} style="width: 100%" onSelect={handleSelect}>
            {
              Object.values(languageList.value).map(languageOption => {
                return <Option value={languageOption.abbreviation} key={languageOption.abbreviation}>
                  {languageOption.name}
                </Option>
              })
            }
          </Select>
        </div>
      </div>

    )
  }
})