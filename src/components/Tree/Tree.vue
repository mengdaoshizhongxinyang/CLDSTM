<template>
  <div class="tree">
    <tree-item v-for="item in desktopIcons" :key="item.name" :node="item"></tree-item>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
import TreeItem from "./TreeItem.vue";
export default {
  props: {
    treeData: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  components: {
    TreeItem,
  },
  created() {
    this.desktopIcons = configs.getDesktopIcon();
  },
  data() {
    return {
      desktopIcons: {},
    };
  },
};
</script>

<style lang="less" scoped>
.tree {
}
</style>