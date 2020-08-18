<template>
  <div class="folder-tree-node">
    <div class="folder-tree-node-title" @click="handleShowChildren" :style="`padding-left:${4*level}px`">
      {{node.name}}
    </div>
    <transition>
      <div class="folder-tree-node-content" v-show="showChildren">
        <tree-item v-for="item in node.bind.children" :key="item.name" :node="item" :level="level+1"></tree-item>
      </div>
    </transition>
  </div>
</template>

<script>

export default {
  props:{
    level:{
      type:Number,
      default:1
    },
    node:{
      type:Object,
      default:()=>{
        return {}
      }
    }
  },
  components: {
    TreeItem:()=>import ('./TreeItem.vue')
  },
  data(){
    return{
      showChildren:false
    }
  },
  methods:{
    handleShowChildren(){
      this.showChildren=!this.showChildren
    }
  }
};
</script>

<style lang="less" scoped>
.folder-tree-node{
  &-title{
    padding:4px;
    display: flex;
    cursor: pointer;
    line-height: 1em;
    user-select: none;
  }
  &-content{
    
  }
}
</style>