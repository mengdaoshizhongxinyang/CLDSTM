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
    content:PropTypes.string()
  },
  setup(props,{attrs}){
    const store=useStore()
    const data=reactive({
      content:props.content
    })
    function handleClose(){
      store.dispatch('saveApps',{name:'SimpleNote'})
    }
    return ()=>h(
      <AppFrame allowEnlarge={false} {...attrs} onClose={handleClose}>
        <textarea v-model={[data.content,'value']} class={style['textarea']}></textarea>
      </AppFrame>
    )
  }
})