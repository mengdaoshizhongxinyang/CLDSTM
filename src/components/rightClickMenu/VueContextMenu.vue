<template>
  <div
    class="context-menu"
    v-show="show"
    :style="style"
    @mousedown.stop
    @contextmenu.prevent
  >
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "context-menu",
  data() {
    return {
      style: {}
    };
  },
  props: {
    offset: {
      type: Object,
      default: function() {
        return {
          left: 0,
          top: 0
        };
      }
    },
    show: Boolean
  },
  watch: {
    show(show) {
      if (show) {
        this.$nextTick(this.setPosition)
        document.body.addEventListener("mousedown", this.clickDocumentHandler);
      }else{
        document.body.removeEventListener("mousedown", this.clickDocumentHandler);
      }
    }
  },
  methods: {
    clickDocumentHandler() {
      if (this.show) {
        this.$emit("update:show", false);
      }else{
        this.$emit("update:show", true);
      }
    },
    setPosition() {
      let docHeight = document.documentElement.clientHeight;
      let docWidth = document.documentElement.clientWidth;
      let menuHeight = this.$el.getBoundingClientRect().height;
      let menuWidth = this.$el.getBoundingClientRect().width;
      console.log(menuHeight)
      // 增加点击处与菜单间间隔，较为美观
      const gap = 10;
      let topover =
        this.offset.top + menuHeight >= docHeight
          ? menuHeight
          : 0;
      let leftover =
        this.offset.left + menuWidth  >= docWidth ? menuWidth :0;
      this.style = {
        left: `${this.offset.left - leftover}px`,
        top: `${this.offset.top - topover}px`
      };
    }
  }
};
</script>
<style lang="less" scoped>
.context-menu {
  z-index: 99999;
  display: block;
  background: #fff;
  border: 1px solid #a5a5a5;
  box-shadow: 2px 2px 2px 0 rgba(0, 0, 0, 0.2);
  padding: 4px 2px;
  line-height: 1em;
  position: absolute;
}
</style>