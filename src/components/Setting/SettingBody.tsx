/*
 * @Author: mengdaoshizhongxinyang
 * @Date: 2021-02-24 10:00:24
 * @Description: 
 */
import { defineComponent, h, nextTick, onMounted, reactive, ref, watch } from "vue";
import { PropTypes } from "@/utils/proptypes";
import style from "./SettingBody.module.less";
import { IconManage } from "@/components";
import { IconList } from "@/types";
import { Setting } from "@/types/setting";
export default defineComponent({
  props: {
    title: PropTypes.string(),
    width: PropTypes.number(540),
    littleTitle: PropTypes.string(),
    height: PropTypes.number(),
    widen: PropTypes.bool(false),
    menuList:PropTypes.array<Setting>(),
    showLeft:PropTypes.bool(true)
  },
  emits: {
    widenChange: (val: boolean) => { return true },
    openSub: (item:string) => {
      return true
    }
  },
  setup(props, { emit, slots }) {
    const data = reactive({
      subTitle: "",
      scrollTop: 40,
      scrollHeight: 0,
      clickXY: { x: 0, y: 0, top: 0 }
    })
    const contentRef = ref<HTMLDivElement>()
    const titleRef = ref<HTMLDivElement>()
    onMounted(() => {
      nextTick(() => {
        setScrollHeight()
        watch(() => props.height, () => {
          setScrollHeight()
        })
        watch(() => props.width, (val, oldVal) => {
          setScrollHeight()
          if (oldVal >= 500 && val < 500) {
            emit("widenChange", false);
          } else if (oldVal < 500 && val >= 500) {
            emit("widenChange", true);
          }
        })
      })
    })

    function handleScroll(e: Event) {
      const content = contentRef.value!
      const title = titleRef.value!
      data.scrollTop =
        ((e.target as HTMLDivElement).scrollTop / (content.childNodes[0] as HTMLDivElement).clientHeight) *
        (content.clientHeight -
          title.clientHeight -
          12) +
        title.clientHeight +
        6;
    }
    function setScrollHeight() {
      const content = contentRef.value!
      const title = titleRef.value!
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
    function handleScrollMouseDown(e: MouseEvent) {
      data.clickXY = { x: e.x, y: e.y, top: data.scrollTop };
      document.addEventListener("mousemove", handleScrollMouseMove);
      document.addEventListener("mouseup", handleScrollMouseUp);
    }
    function handleScrollMouseMove(e: MouseEvent) {
      const title = titleRef.value!
      const content = contentRef.value!
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
    function handleScrollMouseUp(e: MouseEvent) {
      document.removeEventListener("mousemove", handleScrollMouseMove);
      document.removeEventListener("mouseup", handleScrollMouseUp);
    }
    function handleClick(item:Setting) {
      emit("openSub", item.component!);
    }
    return () => h(
      <div class={style["setting-main"]}>
        <div class={style["setting-body"]}>
          <div class={style["setting-content"]} ref={contentRef} onScroll={handleScroll}>
            {
              (props.showLeft || props.widen) ? <div class={props.widen?style["setting-left"]:style['setting-all']}>
                <div class={[style['menu-main'], props.widen ? style['widen-menu'] : style['narrow-menu']]}>
                  <div class={style["menu-title"]}>
                    <div class={style["home-item"]}></div>
                    <div class={'title'}></div>
                  </div>
                  <div class={style["menu-list"]}>
                    {
                      props.menuList.map(item => {
                        return <div
                          class={style["menu-list-item"]}
                          onClick={() => handleClick(item)}
                        >
                          <div class={style["menu-list-item-label"]}></div>
                          <div class={style["menu-list-item-content"]}>
                            <IconManage icon={item.icon}></IconManage>
                            {item.name}
                          </div>
                        </div>
                      })
                    }
                  </div>
                </div>
              </div> : null
            }
            {
              slots['default'] ? slots['default']() : <div style="background: #fff; height: 32px"></div>
            }
          </div>
          <div class={props.widen ? style['widen-default-title'] : style['default-title']} ref={titleRef}>
            {
              slots['title'] ? slots['title']() : <div style="background: #fff; height: 32px"></div>
            }
          </div>
          <div
            class={style["scroll-bar-thumb"]}
            style={{ height: data.scrollHeight + 'px', top: data.scrollTop + 'px' }}
            onMousedown={handleScrollMouseDown}
            tabindex={-1}
          ></div>
        </div>
      </div>
    )
  }
})