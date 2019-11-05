<template>
  <VueDraggableResizable>
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
  props:{
    title:String
  }
};
</script>

<style lang="less" scoped>
.header{
  height: 32px;
  width: 100%;
  display: flex;
}
.header-back{
  height: 32px;
  width: 100%;
}
.header-content{
  position: absolute;
  width: 100%;
  height: calc(100% - 32px);
}
.content{

}
</style>