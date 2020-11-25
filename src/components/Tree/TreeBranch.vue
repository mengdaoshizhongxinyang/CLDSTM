<template>
  <div class="folder-tree-node">
    <div
      class="folder-tree-node-title"
      @click="handleShowChildren"
      :style="`padding-left:${4*level}px`"
    >{{node.name}}</div>
    <transition @enter="enter" @afterEnter="afterEnter" @leave="leave" @afterLeave="afterLeave">
      <div class="folder-tree-node-content" v-show="showChildren">
        <tree-item
          v-for="item in node.children"
          :key="item.name"
          :node="item"
          :level="level+1"
        ></tree-item>
      </div>
    </transition>
  </div>
</template>

<script>
import { Transition } from "vue";
export default {
  props: {
    level: {
      type: Number,
      default: 1,
    },
    node: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  components: {
    Transition,
    TreeItem: () => import("./TreeItem.vue"),
  },
  data() {
    return {
      showChildren: false,
    };
  },
  methods: {
    handleShowChildren() {
      console.log(this.node)
      this.showChildren = !this.showChildren;
    },
    enter(el) {
      el.style.height = "auto";
      // noinspection JSSuspiciousNameCombination
      let endWidth = window.getComputedStyle(el).height;
      el.style.height = "0px";
      el.offsetHeight; // force repaint
      // noinspection JSSuspiciousNameCombination
      el.style.height = endWidth;
    },
    afterEnter(el) {
      el.style.height = null;
    },
    leave(el) {
      el.style.height = window.getComputedStyle(el).height;
      el.offsetHeight; // force repaint
      el.style.height = "0px";
    },
    afterLeave(el) {
      el.style.height = null;
    },
  },
};
</script>

<style lang="less" scoped>
.folder-tree-node {
  &-title {
    padding: 4px;
    display: flex;
    cursor: pointer;
    line-height: 1em;
    user-select: none;
  }
  &-content {
    transition: height 0.1s ease-in-out;
    overflow: hidden;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: height 0.2s;
}
.fade-enter,
.fade-leave-to {
  height: 0;
}
</style>