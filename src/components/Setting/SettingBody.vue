<template>
  <div class="setting-main">
    <div class="setting-body">
      <div class="setting-content" ref="content" @scroll="handleScroll">
        <slot></slot>
      </div>
      <div class="default-title" ref="title"></div>
      <div
        class="scroll-bar-thumb"
        :style="{ height: scrollHeight + 'px', top: scrollTop + 'px' }"
        @mousedown="handleScrollMouseDown"
      ></div>
    </div>
  </div>
</template>

<script>
import LeftMoreItem from "./LeftMoreItem";
export default {
  components: {
    LeftMoreItem,
  },
  props: {
    title: {
      type: String,
      default: "",
    },
    leftList: {
      type: Array,
      default: () => {
        return [];
      },
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
    };
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
        console.log(1);
        this.scrollHeight = Math.floor(
          (this.$refs.content.clientHeight *
            (this.$refs.content.clientHeight -
              this.$refs.title.clientHeight -
              12)) /
            this.$refs.content.childNodes[0].clientHeight
        );
        console.log(this.scrollHeight);
      } else {
        this.scrollHeight = 0;
      }
    },
    handleScrollMouseDown(e) {
      e.target.addEventListener("mousemove", this.handleScrollMouseMove)
      document.addEventListener("mouseup",this.handleScrollMouseUp)
    },
    handleScrollMouseMove(e) {
      this.scrollTop = this.scrollTop + e.offsetY;
    },
    handleScrollMouseUp(e) {
      e.target.removeEventListener("mousemove", this.handleScrollMouseMove)
      document.removeEventListener("mouseup",this.handleScrollMouseUp)
    },
  },
  watch: {
    height(old) {
      this.setScrollHeight();
    },
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
      padding: 16px;
      width: 100%;
      position: absolute;
      background: #fff;
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