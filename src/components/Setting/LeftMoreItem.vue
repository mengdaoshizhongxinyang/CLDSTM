<template>
  <div
    class="item"
    @mousemove="handleMove"
    ref="body"
    @mouseenter="showBg"
    @mouseleave="hideBg"
    @click="handleClick"
  >
    <div class="item-bg" :style="{ left: wzX + 'px' }" v-show="show"></div>
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
      show: false,
    };
  },
  methods: {
    handleMove(e) {
      this.wzX = e.clientX - this.$refs.body.getBoundingClientRect().x - 40;
    },
    showBg() {
      this.show = true;
    },
    hideBg() {
      this.show = false;
    },
    handleClick() {
      this.$emit("onClick");
    }
  },
};
</script>

<style lang="less" scoped>
.item {
  height: 40px;
  line-height: 24px;
  user-select: none;
  position: relative;
  color: #000;
  cursor: pointer;
  overflow: hidden;
  
  &-bar {
    padding: 8px 0;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0px;
    top: 0px;
    &:hover {
      background: rgba(170, 170, 170, 0.65);
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