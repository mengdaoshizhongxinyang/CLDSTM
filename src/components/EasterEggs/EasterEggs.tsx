/*
 * @Author: mengdaoshizhongxinyang
 * @Date: 2021-05-08 17:28:00
 * @Description: 
 */
import { defineComponent,defineProps,PropType } from "vue";
import Fireworks from "./Fireworks";
const list={
  Fireworks
}
import style from "./Eggs.module.less";
export default defineComponent({
  props:{
    name:{
      type:String as PropType<keyof typeof list>,
      default:""
    }
  },
  setup(props){
    
    return ()=><div class={style['main']}>{props.name}</div>
  }
})
