<template>
  <div class="setting-main">
    <slot name="wideMore"></slot>
    <div class="setting-body">
      <slot name="narrowMore"></slot>
      <div ref="body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
};
</script>

<style lang="less" scoped>
.setting-main {
  display: flex;
  height: 100%;
  .setting-body {
    background: #fff;
    border-top: 32px solid #fff;
    position: relative;
    overflow-x: hidden;
    overflow-y:overlay;
    height: 100%;
    flex: 1;
    &::-webkit-scrollbar{
      width:6px;
    }
    &::-webkit-scrollbar-button{
      height:7px;
    }
    &::-webkit-scrollbar-thumb{
      width:6px;
      border-radius: 4px 10px 4px 2px;
      background-image: linear-gradient(to right, rgba(0,0,0,0.55) 50%,#fff 50%);
    }
  }
}
</style>