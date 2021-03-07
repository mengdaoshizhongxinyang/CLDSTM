import { defineComponent, h } from "vue";
import style from "./tree.module.less";
interface thisProps{
  node:{name?:string},
  level:number
}
export default defineComponent({
  setup(props:thisProps) {
    return ()=>h(
      <div class={style["folder-tree-node-item"]} style={{paddingLeft:`${props.level*4}px`}}>
        {props.node.name}
      </div>
    )
  },
  props: {
    node: {
      type: Object,
      default: () => {
        return {}
      }
    },
    level: {
      type: Number,
      default: 1
    }
  }
})