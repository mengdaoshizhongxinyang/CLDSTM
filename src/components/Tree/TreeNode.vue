<template>
  <div class="folder-tree-node-item" :style="`padding-left:${level*4}px`">
    {{node.name}}
  </div>
</template>

<script>
  export default {
    props:{
      node:{
        type:Object,
        default:()=>{
          return {}
        }
      },
      level:{
        type:Number,
        default:1
      }
    }
  }
</script>

<style lang="less" scoped>
.folder-tree-node-item{
  padding:4px;
  line-height: 1em;
  user-select: none;
}
</style>