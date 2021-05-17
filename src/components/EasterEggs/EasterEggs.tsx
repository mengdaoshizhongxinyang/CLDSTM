/*
 * @Author: mengdaoshizhongxinyang
 * @Date: 2021-05-08 17:28:00
 * @Description: 
 */
import { defineComponent } from "vue";
import Fireworks from "./Fireworks";

import style from "./Eggs.module.less";
export default defineComponent({
  setup(){
    return ()=><>
      <Fireworks></Fireworks>
    </>
  }
})
