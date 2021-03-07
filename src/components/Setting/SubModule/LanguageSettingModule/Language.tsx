/*
 * @Author: mengdaoshizhongxinyang
 * @Date: 2021-03-01 17:17:08
 * @Description: 
 */
import { computed, defineComponent,h } from "vue";
import { PropTypes } from "@/utils/proptypes";
import SettingBody from "../../SettingBody";
import * as module from "./module";
import { useStore } from "@/store";
export default defineComponent({
  props:{
    subComponent:PropTypes.string(),
    widen:PropTypes.bool()
  },
  components:{
    SettingBody,
    ...module
  },
  setup(props,{emit}){
    function handleOpenSub(component:string){
      emit('openSub','Language',component)
    }
    const store=useStore()
    const list=computed(()=>{
      return store.state.core.setting.settings.Language
    })
    return ()=>h(
      <SettingBody widen={props.widen} onOpenSub={handleOpenSub} menuList={list.value}>
        {
          props.subComponent?
          h(module[props.subComponent as keyof typeof module],
            {
              widen:props.widen
            }
          ):null
        }
      </SettingBody>
    )
  },
  emits:{
    openSub:(component:string,subComponent:string)=>{return true}
  }
})