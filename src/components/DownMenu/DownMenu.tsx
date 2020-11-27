import { computed, defineComponent, h, nextTick, onMounted, reactive, ref,Transition } from "vue";
import moment from "moment";
import { WindowsOutlined } from '@ant-design/icons-vue';
import { useStore } from "vuex";
import Icon from "@/components/IconManage";
import DownMenuRightMenu from "./DownMenuRightMenu";
import { Store } from "@/types/store";
import style from "./DownMenu.module.less";
export default defineComponent({
  components: {
    DownMenuRightMenu,
    Icon,
    WindowsOutlined,
    Transition
  },
  setup() {
    const data = reactive({
      date: "",
      time: "",
      titleTime: "",
      titleTimeStatus: false,
      openMenuStatus: false,
      showIndex: -1
    })
    const context = ref<HTMLElement>();
    const store: Store = useStore();
    const desktopApps = computed(() => {
      return store.getters.desktopApps
    })
    const clock = () => {
      data.date = moment().format("YYYY/MM/DD/周dd");
      data.time = moment().format("HH:mm");
      data.titleTime = moment().format("YYYY年MM月DD日,dddd");
      setTimeout(clock, 1000);
    }
    const handleTitleTimeStatus = (statu: boolean) => {
      data.titleTimeStatus = statu;
    }
    const openMenu = () => {
      data.openMenuStatus = true
    }
    const closeMenu = () => {
      data.openMenuStatus = false
    }
    const handleItemClick = (e: MouseEvent, app: any, index: number) => {
      e.stopPropagation();
      e.stopImmediatePropagation();
      console.log(e)
      if (e.button === 0) {
        resetMini(app, index)
      } else if (e.button === 2) {
        openContext(index)
      }
    }
    const resetMini = (app: any, index: number) => {
      store.dispatch('minimizeApps', index)
    }
    const openContext = (index: number) => {
      data.showIndex = index
      nextTick(() => {
        context.value!.focus()
      })
    }
    const closeContext = (index: number) => {
      data.showIndex = -1
    }
    const closeApp = (index: number) => {
      store.dispatch('closeApps', index)
      data.showIndex = -1
    }
    const enter = (el: HTMLBaseElement) => {
      el.style.height = "auto";
      let endWidth = window.getComputedStyle(el).height;
      el.style.height = "0px";
      el.offsetHeight;
      el.style.height = endWidth;
    }
    const afterEnter = (el: HTMLBaseElement) => {
      el.style.height = "";
    }
    const leave = (el: HTMLBaseElement) => {
      el.style.height = window.getComputedStyle(el).height;
      el.offsetHeight;
      el.style.height = "0px";
    }
    const afterLeave = (el: HTMLBaseElement) => {
      el.style.height = "";
    }
    onMounted(() => {
      clock();
    })
    return () => h(
      <div>
        <div class={style["main"]}>
          <div class={style["appmenu"]} tabindex={-1} onFocus={openMenu} onBlur={closeMenu}>
            <div class={style["appmenu-open"]} v-show={data.openMenuStatus}></div>
            <windows-outlined style={{color:"#fff",fontSize:"24px"}} />
          </div>
          <div class={style["task-menu"]}>
            {
              desktopApps.value.apps.map((item, index) => {
                return h(
                  <div class={style["task-menu-item"]} key={index} >
                    <div class={style["task-menu-item-container"]} onMouseup={e => handleItemClick(e, item, index)}>
                      <div class={style["task-menu-item-container-content"]}>
                        <span class={style["task-menu-item-container-content-icon"]}><icon icon={item.icon}></icon></span>
                        {item.name}
                      </div>
                    </div>
                    <transition onEnter={enter} onAfterEnter={afterEnter} onLeave={leave} onAfterLeave={afterLeave}>
                      {
                        index == data.showIndex ? <div class={[style["menu-dark"],style["task-menu-context"]]} tabindex={-1} ref={context} onBlur={() => closeContext(index)}>
                          <down-menu-right-menu onClick={()=>closeApp(index)} v-slots={{
                            default:()=>"关闭"
                          }}></down-menu-right-menu>
                        </div> : null
                      }
                    </transition>
                  </div>
                )
              })
            }
          </div>
          <div
            class={style["status"]}
            onMouseenter={() => handleTitleTimeStatus(true)}
            onMouseleave={() => handleTitleTimeStatus(false)}
          >
            {data.time} {data.date}
            {
              data.titleTimeStatus?<div class={style["title"]}>{data.titleTime}</div>:null
            }
          </div>
        </div>
      </div>
    )
  },
  props: {

  }
})