/*
 * @Author: mengdaoshizhongxinyang
 * @Date: 2021-04-23 14:59:18
 * @Description: 
 */
import { defineComponent,h,Teleport } from "vue";
import { PropTypes } from "@/utils/proptypes";
import style from "./PrintScreen.module.less";
const props={
  src:PropTypes.string(""),
  hotKey:PropTypes.string("alt+a")
}
export default defineComponent({
  props,
  setup(props){
    function handleMousedown(e:MouseEvent){
      
    }
    function handleMousemove(e:MouseEvent){
      
    }
    function handleMouseup(e:MouseEvent){
      
    }
    return ()=>h(
      <Teleport to="body">
        {
          props.src?<div 
            class={style['cropper-main']}
            onMousedown={handleMousedown}
            onMousemove={handleMousemove}
            onMouseup={handleMouseup}
          >
            <img src={props.src} alt=""/>
            <div class={style['cropper-mask']}></div>
          </div>:null
        }
      </Teleport>
    )
  }
})
