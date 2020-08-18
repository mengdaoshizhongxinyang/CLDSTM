<template>
  <tree-branch v-if="node.bind.children && Object.keys(node.bind.children).length" :node="node" :level="level+1"></tree-branch>
  <tree-node v-else :node="node" :level="level+1"></tree-node>
</template>

<script>
import TreeBranch from "./TreeBranch";
import TreeNode from "./TreeNode";
  export default {
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
  }
</script>

<style lang="less" scoped>

</style>