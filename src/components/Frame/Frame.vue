<template>
  <vue-draggable-resizable
    class="filter-main"
    drag-handle=".header"
    :min-width="minWidth"
    :min-height="minHeight"
    :w="w"
    :h="h"
    :x="x"
    :y="y"
    :z="z"
    :draggable="draggable"
    @resizestop="(x, y, w, h) => handleResizestop(x, y, w, h)"
    @dragstop="(x, y) => handleDragstop(x, y)"
    v-on="$listeners"
    @activated="active"
    :resizable="resizable"
  >
    <div class="header" @dblclick="fullScrean">
      <div class="header-content">{{ getAppInfo(appsId).name || "" }}</div>
      <div class="header-back" @mouseup="(e) => rightClick(e, 'headerMenu')">
        <VueContextMenu
          :offset="contextMenuOffset"
          :show.sync="headerMenu"
          class="menu"
        >
          <div class="menu-item" @click="minimize" v-if="allowMinimize">
            最小化
          </div>
          <div class="menu-item" @click="fullScrean" v-if="allowEnlarge">
            最大化
          </div>
          <a-divider />
          <div class="menu-item" @click="close">关闭</div>
        </VueContextMenu>
      </div>
      <slot name="header"></slot>
      <div class="header-button-group">
        <div class="header-button" @click="minimize" v-if="allowMinimize">
          <a-icon type="minus"></a-icon>
        </div>
        <template v-if="allowEnlarge">
          <div class="header-button" v-if="isFull" @click="fullScrean">
            <a-icon type="block"></a-icon>
          </div>
          <div class="header-button" v-else @click="fullScrean">
            <a-icon type="border"></a-icon>
          </div>
        </template>

        <div class="header-button-close" @click="close">
          <a-icon type="close"></a-icon>
        </div>
      </div>
    </div>
    <div
      class="content"
      :style="`overflow-x:${scrollX ? 'auto' : 'hidden'};overflow-y:${
        scrollY ? 'auto' : 'hidden'
      }`"
    >
      <slot></slot>
    </div>
  </vue-draggable-resizable>
</template>

<script>
import VueDraggableResizable from "@/components/BaseDraggable";
import VueContextMenu from "@/components/RightClickMenu";
import { mapGetters, mapState, mapActions } from "vuex";
export default {
  components: {
    VueDraggableResizable,
    VueContextMenu,
  },
  computed: {
    ...mapGetters(["getAppInfo"]),
  },
  props: {
    scrollX: {
      type: Boolean,
      default: true,
    },
    scrollY: {
      type: Boolean,
      default: true,
    },
    minWidth: {
      type: Number,
      default: 146,
    },
    minHeight: {
      type: Number,
      default: 32,
    },
    initialW: {
      type: Number,
      default: 246,
    },
    initialH: {
      type: Number,
      default: 200,
    },
    initialX: {
      type: Number,
      default: 0,
    },
    initialY: {
      type: Number,
      default: 0,
    },
    z: {
      type: Number,
      default: 0,
    },
    appsId: {
      type: Number,
      default: 0,
    },
    allowEnlarge: {
      type: Boolean,
      default: true,
    },
    allowMinimize: {
      type: Boolean,
      default: true,
    },
    draggable:{
      type:Boolean,
      default:true
    },
    resizable:{
      type:Boolean,
      default:true
    }
  },
  data() {
    return {
      headerMenu: false,
      contextMenuOffset: {
        left: 0,
        top: 0,
      },
      isFull: false,
      old_w: 0,
      old_h: 0,
      old_x: 0,
      old_y: 0,
      w: 246,
      h: 200,
      x: 0,
      y: 0,
      title: "",
    };
  },
  methods: {
    rightClick(e, button) {
      if (e.button === 2) {
        this.contextMenuOffset.left = e.x;
        this.contextMenuOffset.top = e.y;
        this[button] = true;
      }
    },
    fullScrean() {
      if (!this.allowEnlarge) {
        return;
      }
      if (this.isFull === false) {
        let width = document.body.clientWidth;
        let height = document.body.clientHeight - 56;
        this.old_w = this.w;
        this.old_h = this.h;
        this.old_x = this.x;
        this.old_y = this.y;
        this.x = 0;
        this.y = 0;
        this.w = width;
        this.h = height;
        this.isFull = true;
      } else {
        this.x = this.old_x;
        this.y = this.old_y;
        this.w = this.old_w;
        this.h = this.old_h;
        this.isFull = false;
      }
      this.$emit("resize", this.w, this.h);
    },
    minimize() {
      if (this.allowMinimize) {
        this.$store.dispatch("minimizeApps", this.appsId);
        this.$emit("minimize");
      }
    },
    handleResizestop(x, y, w, h) {
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.$emit("resize", w, h, x, y);
    },
    handleDragstop(x, y) {
      this.x = x;
      this.y = y;
      this.$emit("dragstop", x, y);
    },
    close() {
      this.$store.dispatch("closeApps", this.appsId);
      this.$emit("close");
    },
    active() {
      this.$store.dispatch("activeApps", this.appsId);
    },
  },
  created() {
    const { initialW, initialH, initialX, initialY } = this;
    Object.assign(this, {
      w: initialW,
      h: initialH,
      x: initialX,
      y: initialY,
    });
  },
};
</script>

<style lang="less" scoped>
@import "../Style/menu";
.filter-main {
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.68);
  background: #fff;
  display: flex;
  flex-flow: column;
  .header {
    height: 32px;
    width: 100%;
    position: relative;
    color: #e6e6e6;
    background: #e1e1e1;
    .header-back {
      height: 32px;
      width: 100%;
    }
    .header-content {
      position: absolute;
      height: 100%;
      padding: 9px;
      color: #000;
      line-height: 1em;
      top: 0;
    }
    .header-button-group {
      background: #e1e1e1;
      display: flex;
      position: absolute;
      right: 0px;
      top: 0px;
      font-size: 16px;
      color: #666666;
      .header-button {
        padding: 4px 12px;
        height: 32px;
        width: 42px;
        color: #000000;
        background: rgba(0, 0, 0, 0);
        &:hover {
          background: rgba(0, 0, 0, 0.08);
        }
      }
      .header-button-close {
        padding: 4px 12px;
        height: 32px;
        width: 42px;
        color: #000000;
        background: rgba(0, 0, 0, 0);
        &:hover {
          background: red;
          color: #fff;
        }
      }
    }
  }
  .content {
    overflow: auto;
    position: relative;
    height: calc(100% - 32px);
  }
}
</style>
