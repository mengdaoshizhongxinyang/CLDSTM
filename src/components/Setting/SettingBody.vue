<template>
  <div class="setting-main">
    <div class="setting-body">
      <div class="setting-content" ref="content" @scroll="handleScroll">
        <slot></slot>
      </div>
      <div class="default-title" ref="title">
        <slot name="title">
          <div style="background:#fff;height:32px;"></div>
        </slot>
      </div>
      <div
        class="scroll-bar-thumb"
        :style="{ height: scrollHeight + 'px', top: scrollTop + 'px' }"
        @mousedown="handleScrollMouseDown"
        tabindex="-1"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    width: {
      type: Number,
      default: 540,
    },
    littleTitle: {
      type: String,
      default: "",
    },
    height: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      subTitle: "",
      scrollTop: 40,
      scrollHeight: 0,
      clickXY: { x: 0, y: 0, top: 0 },
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.setScrollHeight();
    });
  },
  methods: {
    handleScroll(e) {
      this.scrollTop =
        (e.target.scrollTop / this.$refs.content.childNodes[0].clientHeight) *
          (this.$refs.content.clientHeight -
            this.$refs.title.clientHeight -
            12) +
        this.$refs.title.clientHeight +
        6;
    },
    setScrollHeight() {
      if (
        this.$refs.content.childNodes[0] &&
        this.$refs.content.clientHeight <
          this.$refs.content.childNodes[0].clientHeight
      ) {
        this.scrollHeight = Math.floor(
          (this.$refs.content.clientHeight *
            (this.$refs.content.clientHeight -
              this.$refs.title.clientHeight -
              12)) /
            this.$refs.content.childNodes[0].clientHeight
        );
      } else {
        this.scrollHeight = 0;
      }
    },
    handleScrollMouseDown(e) {
      this.clickXY = { x: e.e, y: e.y, top: this.scrollTop };
      document.addEventListener("mousemove", this.handleScrollMouseMove);
      document.addEventListener("mouseup", this.handleScrollMouseUp);
    },
    handleScrollMouseMove(e) {
      const { y, top } = this.clickXY;
      this.scrollTop = this.clickXY.top - (y - e.y);
      if (this.scrollTop < 6 + this.$refs.title.clientHeight) {
        this.scrollTop = 6 + this.$refs.title.clientHeight;
      }
      if (
        this.scrollTop >
        this.$refs.content.clientHeight - 6 - this.scrollHeight
      ) {
        this.scrollTop =
          this.$refs.content.clientHeight - 6 - this.scrollHeight;
      }
      this.$refs.content.scrollTop =
        ((this.scrollTop - 6 - this.$refs.title.clientHeight) /
          (this.$refs.content.clientHeight -
            this.$refs.title.clientHeight -
            12)) *
        this.$refs.content.childNodes[0].clientHeight;
    },
    handleScrollMouseUp(e) {
      document.removeEventListener("mousemove", this.handleScrollMouseMove);
      document.removeEventListener("mouseup", this.handleScrollMouseUp);
    }
  },
  watch: {
    height(val, oldVal) {
      this.setScrollHeight();
      if (oldVal >= 500 && val < 500) {
        this.$emit("widen", false);
      } else if (oldVal < 500 && val >= 500) {
        this.$emit("widen", true);
      }
    },
    width(val,oldVal){
      this.setScrollHeight()
    }
  },
};
</script>

<style lang="less" scoped>
@import url("../Style/default");
@supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
  .narrow-more {
    backdrop-filter: @menu-dark-background-filter;
  }
}
.setting-main {
  display: flex;
  height: 100%;
  width: 100%;
  overflow: hidden;
  .setting-body {
    background: #fff;
    position: relative;

    flex: 1;
    .default-title {
      width: 100%;
      position: absolute;
      z-index: 1;
      top: 0;
    }

    .scroll-bar-thumb {
      position: absolute;
      right: 3px;
      background: rgba(0, 0, 0, 0.55) 50%;
      width: 3px;
      z-index: 1;
      &:hover {
        width: 9px;
        right: 0px;
      }
      &:focus {
        width: 9px;
        right: 0px;
      }
    }

    .setting-content {
      position: relative;
      height: 100%;
      overflow-x: hidden;
      &::-webkit-scrollbar {
        width: 0px;
      }
    }
  }
}
</style>