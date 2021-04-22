/*
 * @Author: mengdaoshizhongxinyang
 * @Date: 2021-03-12 09:47:54
 * @Description: 
 */
import { defineComponent,h, reactive,onBeforeUnmount } from "vue";
import { PropTypes } from "@/utils/proptypes";
import { AppFrame } from "@/components";
import style from "./SimpleNote.module.less";
import { useStore } from "@/store";
import keyboardMessage from "@/utils/keyboard";
export default defineComponent({
  props:{
    content:PropTypes.string(),
    appsId:PropTypes.number()
  },
  setup(props,{attrs}){
    function shotHotKey(){
      const keyboardMessageManage=keyboardMessage()
      let message=keyboardMessageManage.getMessage()
      if(message){
        const {event}=message
        
        if(event.key=='a' && event.altKey==true){
          console.log('A')
          message.isHandle=true
          event.preventDefault()
        }
      }
      setTimeout(shotHotKey, 10);
    }
    shotHotKey()
    onBeforeUnmount(()=>{
      clearTimeout()
    })
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