import { defineComponent, nextTick, onMounted, reactive, ref,h } from "vue";
import style from "./DownMenuRightMenu.module.less"
export default defineComponent({
  setup(p, { emit,slots }) {
    const data = reactive({
      x: 0,
      wzX: 0,
      show: false
    })
    let root = ref<HTMLDivElement>()
    const handleMove = (e: MouseEvent) => {
      data.wzX = e.clientX - data.x - 40;
    }
    const showBg = () => {
      data.show = true
    }
    const hideBg = () => {
      data.show = false
    }
    onMounted(() => {
      nextTick(() => {
        data.x = root.value!.getBoundingClientRect().x;
      });
    })
    return () => h(
      <div class={style["item"]} onMousemove={handleMove} ref={root} onMouseenter={showBg} onMouseleave={hideBg} >
        <div class={style["item-bg"]} style={{left:data.wzX+'px'}} v-show={data.show}></div>
        <div class={style["item-bar"]}>
          {(slots['default']!())}
        </div>
      </div>
    )
  }
})