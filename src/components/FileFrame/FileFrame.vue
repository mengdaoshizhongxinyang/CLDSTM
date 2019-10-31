<template>
  <VueDraggableResizable>
    <div class="header">
        <div class="header-back"></div>
        <div class="header-content"></div>
    </div>
    <div class="content"></div>
  </VueDraggableResizable>
</template>

<script>
import VueDraggableResizable from "@/components/vue-draggable-resizable.vue";
export default {
  components: {
    VueDraggableResizable
  }
};
</script>

<style lang="less" scoped>
.header{
  
}
.header-back{
    
}
.header-content{

}
.content{

}
</style>