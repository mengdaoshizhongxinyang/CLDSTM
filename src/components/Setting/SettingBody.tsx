/*
 * @Author: mengdaoshizhongxinyang
 * @Date: 2021-02-24 10:00:24
 * @Description: 
 */
import { defineComponent, h, nextTick, onMounted, reactive,ref, watch } from "vue";
import { PropTypes } from "@/utils/proptypes";
import style from "./SettingBody.module.less";
export default defineComponent({
  props: {
    title: PropTypes.string(),
    width: PropTypes.number(540),
    littleTitle: PropTypes.string(),
    height: PropTypes.number(),
    widen: PropTypes.bool(false)
  },
  emits:{
    widenChange:(val:boolean)=>{return false}
  },
  setup(props,{emit,slots}) {
    const data = reactive({
      subTitle: "",
      scrollTop: 40,
      scrollHeight: 0,
      clickXY: { x: 0, y: 0, top: 0 }
    })
    const contentRef=ref<HTMLDivElement>()
    const titleRef=ref<HTMLDivElement>()
    onMounted(() => {
      nextTick(()=>{
        setScrollHeight()
        watch(()=>props.height,()=>{
          setScrollHeight()
        })
        watch(()=>props.width,(val,oldVal)=>{
          setScrollHeight()
          if (oldVal >= 500 && val < 500) {
            emit("widenChange", false);
          } else if (oldVal < 500 && val >= 500) {
            emit("widenChange", true);
          }
        })
      })
    })
    
    function handleScroll(e:Event) {
      const content=contentRef.value!
      const title=titleRef.value!
      data.scrollTop =
        ((e.target as HTMLDivElement).scrollTop / (content.childNodes[0] as HTMLDivElement).clientHeight) *
        (content.clientHeight -
         title.clientHeight -
          12) +
        title.clientHeight +
        6;
    }
    function setScrollHeight() {
      const content=contentRef.value!
      const title=titleRef.value!
      if (
        content.childNodes[0] &&
        content.clientHeight <
        (content.childNodes[0] as HTMLDivElement).clientHeight
      ) {
        data.scrollHeight = Math.floor(
          (content.clientHeight *
            (content.clientHeight -
              title.clientHeight -
              12)) /
              (content.childNodes[0] as HTMLDivElement).clientHeight
        );
      } else {
        data.scrollHeight = 0;
      }
    }
    function handleScrollMouseDown(e:MouseEvent) {
      data.clickXY = { x: e.x, y: e.y, top: data.scrollTop };
      document.addEventListener("mousemove", handleScrollMouseMove);
      document.addEventListener("mouseup", handleScrollMouseUp);
    }
    function handleScrollMouseMove(e:MouseEvent) {
      const title=titleRef.value!
      const content=contentRef.value!
      const { y, top } = data.clickXY;
      data.scrollTop = data.clickXY.top - (y - e.y);
      if (data.scrollTop < 6 + title.clientHeight) {
        data.scrollTop = 6 + title.clientHeight;
      }
      if (
        data.scrollTop >
        content.clientHeight - 6 - data.scrollHeight
      ) {
        data.scrollTop =
          content.clientHeight - 6 - data.scrollHeight;
      }
      content.scrollTop =
        ((data.scrollTop - 6 - title.clientHeight) /
          (content.clientHeight -
            title.clientHeight -
            12)) *
        (content.childNodes[0] as HTMLDivElement).clientHeight;
    }
    function handleScrollMouseUp(e:MouseEvent) {
      document.removeEventListener("mousemove", handleScrollMouseMove);
      document.removeEventListener("mouseup", handleScrollMouseUp);
    }
    
    return ()=>h(
      <div class={style["setting-main"]}>
        <div class={style["setting-body"]}>
          <div class={style["setting-content"]} ref={contentRef} onScroll={handleScroll}>
            {
              slots['default']?slots['default']():<div style="background: #fff; height: 32px"></div>
            }
          </div>
          <div class={style[`${props.widen?'widen-default-title':'default-title'}`]} ref={titleRef}>
            {
              slots['title']?slots['title']():<div style="background: #fff; height: 32px"></div>
            }
          </div>
          <div
            class={style["scroll-bar-thumb"]}
            style={{ height: data.scrollHeight + 'px', top: data.scrollTop + 'px' }}
            onMousedown={handleScrollMouseDown}
            tabindex = {-1}
          ></div>
        </div>
      </div>
    )
  }
})