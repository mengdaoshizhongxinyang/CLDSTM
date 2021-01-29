/*
 * @Author: mengdaoshizhongxinyang
 * @Date: 2021-01-29 15:26:58
 * @Description: 
 * @GitHub: https://github.com/mengdaoshizhongxinyang
 */
import { Frame as SettingFrame,IconManage } from "@/components";
import { Transition,defineComponent,reactive,computed } from "vue";
import Main from "./Main";
import {
  LanguageSetting,
  LanguageModule,
} from "./SubModule/LanguageSettingModule";
// import { PersonaliseSetting } from "./SubModule/PersonaliseSettingModule";
import { useStore } from "@/store"
export default defineComponent({
  components: {
    IconManage,
    Transition,
    PersonaliseSetting,
    LanguageSetting,
    SettingFrame,
    Main,
    LanguageModule,
  },
  props: {
    subComponents: {
      type: String,
      default: "Main",
    },
  },
  setup(props){
    const data = reactive({
      w: 500,
      h: 500,
      component: props.subComponents,
      operated: [] as string[],
      actions: "push",
      widen: true,
    })
    const store=useStore()
    const settings=computed(()=>{
      return store.state.core.setting.settings;
    })
    const handleResize=(x:number, y:number, w:number, h:number)=>{
      data.w = w;
      data.h = h;
    }
    const handleOpenSub=(name:string)=>{
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
  }
})