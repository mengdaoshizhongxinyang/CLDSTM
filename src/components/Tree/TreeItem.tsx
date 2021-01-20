import { defineComponent, h,PropType } from "vue";
import TreeBranch from "./TreeBranch";
import TreeNode from "./TreeNode";
export default defineComponent({
  components: {
    TreeBranch,
    TreeNode
  },
  setup(props) {
    // console.log(props.node)
    return () => h(
      <>
        {
          // typeof props.node.children
          (props.node && props.node.children && Object.keys(props.node.children).length) ?
            <TreeBranch node={props.node} level={props.level+1}></TreeBranch> : null
            // 1 : null
        }
      </>
    )
  },
  props: {
    node: {
      type: Object as PropType<configs.fileType>,
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