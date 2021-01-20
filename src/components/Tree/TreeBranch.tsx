import { defineAsyncComponent, defineComponent, h, PropType, reactive, Transition,RendererElement } from "vue";
import style from "./tree.module.less"
const TreeItem=defineAsyncComponent<any>(()=>import("./TreeItem"))
export default defineComponent({
  setup(props) {
    const data = reactive({ showChildren: false })
    const handleShowChildren = () => {
      data.showChildren = !data.showChildren;
    }
    const enter = (e: Element) => {
      let el=e as HTMLDivElement
      el.style.height = "auto";
      // noinspection JSSuspiciousNameCombination
      let endWidth = window.getComputedStyle(el).height;
      el.style.height = "0px";
      el.offsetHeight; // force repaint
      // noinspection JSSuspiciousNameCombination
      el.style.height = endWidth;
    }
    const afterEnter = (e: Element) => {

      let el=e as HTMLDivElement
      el.style.height=""
    }
    const leave = (e: Element) => {
      let el=e as HTMLDivElement
      el.style.height = window.getComputedStyle(el).height;
      el.offsetHeight; // force repaint
      el.style.height = "0px";
    }
    const afterLeave = (e: Element) => {
      let el=e as HTMLDivElement
      el.style.height = "";
    }
    return () => h(
      <div class={style["folder-tree-node"]}>
        <div
          class={style["folder-tree-node-title"]}
          onClick={handleShowChildren}
          style={{ paddingLeft: `${4 * props.level}px` }}
        >{props.node.name}</div>
        <Transition
          onEnter={enter}
          onAfterEnter={afterEnter}
          onLeave={leave}
          onAfterLeave={afterLeave}
          enterActiveClass={style['fade-enter-active']}
          enterFromClass={style['fade-enter']}
          leaveActiveClass={style['fade-leave-active']}
          leaveToClass={style['fade-leave-to']}
        >
          <div class={style["folder-tree-node-content"]} v-show={data.showChildren}>
            {
              Object.keys(props.node.children).map(item => {
                return <TreeItem
                  key={props.node.children[item].name}
                  node={props.node.children[item]}
                  level={props.level + 1}
                ></TreeItem>
              })
            }
          </div>
        </Transition>
      </div>
    )
  },
  components: {
    Transition,
    TreeItem:TreeItem,
  },
  props: {
    level: {
      type: Number,
      default: 0
    },
    node: {
      type: Object as PropType<configs.fileType>,
      default: {}
    }
  }
})