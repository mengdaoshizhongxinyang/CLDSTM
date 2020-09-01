<template>
  <div class="item" @mousemove="handleMove" ref="body">
    <div class="item-bg" :style="{left:wzX+'px'}"></div>
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
    };
  },
  methods: {
    handleMove(e) {
      // console.log(this.$refs.body.clientX)
      console.log(e);
      console.log(e.clientX - this.x);
      this.wzX = e.clientX - this.x - 40;
    },
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
  height: 32px;
  line-height: 32px;
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
    background: rgba(55, 55, 55, 0.8);
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