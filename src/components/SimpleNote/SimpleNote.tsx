/*
 * @Author: mengdaoshizhongxinyang
 * @Date: 2021-03-12 09:47:54
 * @Description: 
 */
import { defineComponent,h, reactive } from "vue";
import { PropTypes } from "@/utils/proptypes";
import { AppFrame } from "@/components";
import style from "./SimpleNote.module.less";
import { useStore } from "@/store";
export default defineComponent({
  props:{
    content:PropTypes.string(),
    appsId:PropTypes.number()
  },
  setup(props,{attrs}){
    const store=useStore()
    const data=reactive({
      content:props.content
    })
    function handleChange(){
      store.dispatch('updateAppsContent',{id:props.appsId,contents:{content:data.content}})
    }
    return ()=>h(
      <AppFrame allowEnlarge={false} {...attrs} appsId={props.appsId}>
        <textarea v-model={[data.content]} class={style['textarea']} onChange={handleChange}></textarea>
      </AppFrame>
    )
  }
})