<template>
  <VueDraggableResizable class="filter-main">
    <div class="header">
      <slot name="header">
        <div class="header-back"></div>
        <div class="header-content">{{title}}</div>
      </slot>
    </div>
    <div class="content">
      <slot></slot>
    </div>
  </VueDraggableResizable>
</template>

<script>
import VueDraggableResizable from "@/components/vue-draggable-resizable.vue";
export default {
  components: {
    VueDraggableResizable
  },
  props: {
    title: String
  }
};
</script>

<style lang="less" scoped>
.filter-main {
  box-shadow: 0 0 2px 0 #000000aa;
  background: #fff;
  display: flex;
  flex-flow: column; 
  .header {
    height: 32px;
    width: 100%;
    position: relative;
    box-shadow: 0px 1px 0px 1px rgba(0, 0, 0, 0.2);
    .header-back {
      height: 32px;
      width: 100%;
    }
    .header-content {
      position: absolute;
      height: 100%;
      padding: 9px;
      line-height: 1em;
      top:0;
    }
    .header-button{
      position: absolute;
      right: 0;
      top:0;
    }
  }
  .content {
    position: relative;
    height: calc(100% - 32px);
  }
}
</style>