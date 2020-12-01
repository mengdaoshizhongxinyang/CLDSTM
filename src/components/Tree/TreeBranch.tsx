import { defineComponent,h,reactive,Transition } from "vue";
import style from "./tree.module.less"
interface thisProps{
  level?:number,
  node?:{name:string}
}
export default defineComponent({
  setup(props){
    const data=reactive({showChildren: false})
    const handleShowChildren=()=>{
      data.showChildren = !data.showChildren;
    }
    const enter=(el:HTMLBaseElement)=>{
      el.style.height = "auto";
      // noinspection JSSuspiciousNameCombination
      let endWidth = window.getComputedStyle(el).height;
      el.style.height = "0px";
      el.offsetHeight; // force repaint
      // noinspection JSSuspiciousNameCombination
      el.style.height = endWidth;
    }
    const afterEnter=(el:HTMLBaseElement)=>{
      el.style.height = "";
    }
    const leave=(el:HTMLBaseElement)=>{
      el.style.height = window.getComputedStyle(el).height;
      el.offsetHeight; // force repaint
      el.style.height = "0px";
    }
    const afterLeave=(el:HTMLBaseElement)=>{
      el.style.height = "";
    }
    return ()=>h(
      <div class={style["folder-tree-node"]}>
        <div
          class={style["folder-tree-node-title"]}
          onClick={handleShowChildren}
          style={{paddingLeft:`${4*props.level}px`}}
        >{props.node.name}</div>
        <transition onEnter={enter} onAfterEnter={afterEnter} onLeave={leave} onAfterLeave={afterLeave} name="fade">
          <div class={style["folder-tree-node-content"]} v-show={data.showChildren}>
            {
              props.node.children.map(item=>{
                return (
                  <tree-item
                    key={item.name}
                    node={item}
                    level={props.level+1}
                  ></tree-item>
                )
              })
            }
            
          </div>
        </transition>
      </div>
    )
  },
  props: {
    level: {
      type: Number,
      default: 1,
    },
    node: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  components: {
    Transition,
    TreeItem: () => import("./TreeItem"),
  }
})