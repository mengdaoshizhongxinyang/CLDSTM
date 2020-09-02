<!--
 * @Author: mengdaoshizhongxinyang
 * @Date: 2020-09-01 16:36:38
 * @Description: 
 * @GitHub: https://github.com/mengdaoshizhongxinyang
-->

<template>
  <div class="item" @mousemove="handleMove" ref="body" @mouseenter="showBg" @mouseleave="hideBg" @click="handleClick">
    <div class="item-bg" :style="{left:wzX+'px'}" v-show="show"></div>
    <div class="item-bar">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      x: 0,
      wzX: 0,
      show:false
    };
  },
  methods: {
    handleMove(e) {
      this.wzX = e.clientX - this.x - 40;
    },
    showBg(){
      this.show=true
    },
    hideBg(){
      this.show=false
    },
    handleClick(){
      this.$emit('onClick')
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.x = this.$refs.body.getBoundingClientRect().x;
    });
  },
};
</script>

<style lang="less" scoped>
.item {
  height: 24px;
  line-height: 20px;
  user-select: none;
  position: relative;
  color: #fff;
  cursor: pointer;
  overflow: hidden;
  &-bar {
    border: 1px solid #fff0;
    position: absolute;
    width: calc(100% - 2px);
    height: calc(100% - 2px);
    left: 1px;
    top: 1px;
    &:hover{
      background: rgba(55, 55, 55, 0.8);
    }
  }
  &-bg {
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    height: calc(100% + 4px);
    width: 50%;
    background-image: linear-gradient(
      to right,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0.4),
      rgba(255, 255, 255, 0)
    );
  }
}
</style>