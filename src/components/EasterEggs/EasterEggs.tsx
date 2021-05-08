/*
 * @Author: mengdaoshizhongxinyang
 * @Date: 2021-05-08 17:28:00
 * @Description: 
 */
import { defineComponent,defineProps } from "vue";

export default defineComponent({
  props:{
    name:{
      type:String,
      default:""
    }
  },
  setup(props){
    
    return ()=><div>{props.name}</div>
  }
})
