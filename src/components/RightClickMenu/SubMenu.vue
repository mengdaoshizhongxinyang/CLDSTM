<template>
  <transition name="contextmenu-fade">
    <div></div>
  </transition>
</template>

<script>
  export default {
    
  }
</script>

<style lang="less" scoped>
.contextmenu-fade-enter-active,
.contextmenu-fade-leave-active {
  transition: opacity 0.1s;
}
.contextmenu-fade-enter,
.contextmenu-fade-leave-to {
  opacity: 0;
}
</style>