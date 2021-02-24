/*
 * @Author: mengdaoshizhongxinyang
 * @Date: 2021-02-24 09:52:23
 * @Description: 
 */
import { defineComponent } from "vue";
import { PropTypes } from "@/utils/proptypes";
export default defineComponent({
  props:{
    widen:PropTypes.bool(true)
  },
})