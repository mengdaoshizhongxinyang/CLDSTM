/*
 * @Author: mengdaoshizhongxinyang
 * @Date: 2021-04-01 14:42:41
 * @Description: 
 */
import { defineComponent, h, reactive } from "vue";
import style from "./login.module.less";
import { BaseDraggable } from "@/components";
export default defineComponent({
  setup() {
    const data = reactive({
      value: "",
      caretPosition: 0
    })
    
    function handleInput(e: KeyboardEvent) {
      if (e.key.length == 1) {

      } else {

      }
    }
    return () => h(
      <div class={style['login']} tabindex={-1} onKeydown={handleInput}>
        <BaseDraggable class={style['login-screen']} w={400} h={250}>
          <div class={style['login-password-input']}>
            <div class={[style['login-password-input-caret'], style['login-password-input-text']]}></div>
          </div>
        </BaseDraggable>

      </div>
    )
  }
})