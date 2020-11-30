import { defineComponent } from "vue";
import TreeBranch from "./TreeBranch";
import TreeNode from "./TreeNode";
export default defineComponent({
  components:{
    TreeBranch,
    TreeNode
  },
  props:{
    node:{
      type:Object,
      default:()=>{
        return {}
      }
    },
    level:{
      type:Number,
      default:0
    }
  }
})