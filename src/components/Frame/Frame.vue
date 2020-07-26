<template>
  <VueDraggableResizable
    class="filter-main"
    drag-handle=".header"
    :min-width="minWidth"
    :min-height="minHeight"
    :w="w"
    :h="h"
    :x="x"
    :y="y"
    @resizestop="(x,y,w,h)=>handleResizestop(x,y,w,h)"
    @dragstop="(x,y)=>handleDragstop(x,y)"
    v-on="$listeners"
  >
    <div class="header" @dblclick="fullScrean">
      <div class="header-content">{{title}}</div>
      <div class="header-back" @mouseup="e=>rightClick(e,'headerMenu')">
        <VueContextMenu :offset="contextMenuOffset" :show.sync="headerMenu" class="rightmenu">
          <div class="menu-item">最小化</div>
          <div class="menu-item">最大化</div>
          <a-divider />
          <div class="menu-item" @click="close">关闭</div>
        </VueContextMenu>
      </div>
      <slot name="header"></slot>
      <div class="header-button-group">
        <div class="header-button">
          <a-icon type="minus"></a-icon>
        </div>
        <div class="header-button" v-if="isFull" @click="fullScrean">
          <a-icon type="block"></a-icon>
        </div>
        <div class="header-button" v-else @click="fullScrean">
          <a-icon type="border"></a-icon>
        </div>
        <div class="header-button-close" @click="close">
          <a-icon type="close"></a-icon>
        </div>
      </div>
    </div>
    <div
      class="content"
      :style="`overflow-x:${scrollX?'auto':'hidden'};overflow-y:${scrollY?'auto':'hidden'}`"
    >
      <slot></slot>
    </div>
  </VueDraggableResizable>
</template>

<script>
import VueDraggableResizable from "@/components/BaseDraggable";
import VueContextMenu from "@/components/RightClickMenu";
export default {
  components: {
    VueDraggableResizable,
    VueContextMenu
  },
  props: {
    title: String,
    scrollX: {
      type: Boolean,
      default: true
    },
    scrollY: {
      type: Boolean,
      default: true
    },
    minWidth:{
      type:Number,
      default:146
    },
    minHeight:{
      type:Number,
      default:32
    },
    initialW:{
      type:Number,
      default:246
    },
    initialH:{
      type:Number,
      default:200
    }
  },
  data() {
    return {
      headerMenu: false,
      contextMenuOffset: {
        left: 0,
        top: 0
      },
      isFull: false,
      old_w: 0,
      old_h: 0,
      old_x: 0,
      old_y: 0,
      w: 246,
      h: 200,
      x: 0,
      y: 0
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
    handleResizestop(x, y, w, h) {
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.$emit("resize", w, h);
    },
    handleDragstop(x, y) {
      this.x = x;
      this.y = y;
    },
    close(){
      this.$emit('close')
    }
  },
  created(){
    const { initialW,initialH}=this
    Object.assign(this,{
      w:initialW,
      h:initialH
    })
  }
};
</script>

<style lang="less" scoped>
.filter-main {
  box-shadow: 0 0 2px 0 #000000aa;
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
      line-height: 1em;
      top: 0;
    }
    .header-button-group {
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
        background: #00000000;
        &:hover {
          background: #00000011;
        }
      }
      .header-button-close {
        padding: 4px 12px;
        height: 32px;
        width: 42px;
        color: #000000;
        background: #00000000;
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
.rightmenu {
  color: #000000;
  padding: 2px;
  .menu-item {
    height: 22px;
    line-height: 22px;
    padding: 0 7px;
    user-select: none;
    &:hover {
      color: #fff;
      background: #1890ff;
    }
  }
}
/deep/.ant-divider-horizontal {
  margin: 4px 0 2px 0;
}
</style>
