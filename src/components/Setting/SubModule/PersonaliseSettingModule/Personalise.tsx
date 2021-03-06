/*
 * @Author: mengdaoshizhongxinyang
 * @Date: 2021-03-03 10:12:01
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
      emit('openSub','Personalise',component)
    }
    const store=useStore()
    const list=computed(()=>{
      return store.state.core.setting.settings.Personalise
    })
    return ()=>h(
      <SettingBody widen={props.widen} onOpenSub={handleOpenSub} menuList={list.value} showLeft={!props.subComponent}>
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