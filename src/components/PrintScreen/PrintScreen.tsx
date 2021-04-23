/*
 * @Author: mengdaoshizhongxinyang
 * @Date: 2021-04-23 14:59:18
 * @Description: 
 */
import { defineComponent,h,Teleport } from "vue";
import { PropTypes } from "@/utils/proptypes";
const props={
  src:PropTypes.string(""),
  hotKey:PropTypes.string("alt+a")
}
export default defineComponent({
  props,
  setup(props){
    return ()=>h(
      <Teleport to="body">
        {
          props.src?<div style={{position:"fixed",zIndex:100}}><img src={props.src} alt=""/></div>:null
        }
      </Teleport>
    )
  }
})
