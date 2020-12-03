import { defineComponent, h } from "vue";
import TreeBranch from "./TreeBranch";
import TreeNode from "./TreeNode";
export default defineComponent({
  components: {
    TreeBranch,
    TreeNode
  },
  setup(props) {
    return () => h(
      <>
        {props.level}
        {
          (props.node && props.node.children && Object.keys(props.node.children).length) ?
            <tree-branch node={props.node} level={props.level+1}></tree-branch> : null
        }

      </>
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
      default: 0
    }
  }
})