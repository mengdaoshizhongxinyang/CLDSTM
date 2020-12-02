import { defineComponent,h,reactive,Transition } from "vue";
import style from "./tree.module.less"
interface node{
  name:string,
  children:{[key : string]:node}
}
interface thisProps{
  level:number,
  node:node
}
export default defineComponent<thisProps>({
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
              Object.keys(props.node.children).map(item=>{
                let t=props.node.children[item]

                return (<tree-item
                  key={props.node.children[item].name}
                  node={item}
                  level={props.level+1}
                ></tree-item>)
              })
            }
          </div>
        </transition>
      </div>
    )
  },
  components: {
    Transition,
    TreeItem: () => import("./TreeItem"),
  }
})