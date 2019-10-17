<template>
  <div class="main">
    <div class="left" :style="leftStyle">
      <slot name="left"></slot>
    </div>
    <slot></slot>
    <div class="right" :style="rightStyle">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    leftWidth: {
      type: String,
      defaultL: "50%"
    },
    rightWidth: {
      type: String,
      defaultL: "50%"
    },
    leftStyle: {
      type: String,
      default: ""
    },
    rightStyle: {
      type: String,
      default: ""
    }
  }
};
</script>

<style lang="less" scoped>
.main {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 2%;
  height: 100%;
}
</style>