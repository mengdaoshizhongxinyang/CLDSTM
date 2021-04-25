import { defineComponent,h } from "vue";
import style from "./VueCropper.module.less";
import { PropTypes } from "@/utils/proptypes";
const props={
  src:PropTypes.string(""),
  croppering:PropTypes.bool(true)
}
export default defineComponent({
  props,
  setup(props){
    return ()=>h(
      <div class={style['cropper-main']}>
        <img src=""></img>
        {
          props.src?<div class={style['cropper-mask']}></div>:null
        }
        <div>

        </div>
      </div>
    )
  }
})
