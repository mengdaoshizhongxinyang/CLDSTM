import { defineComponent, h } from "vue";
export default defineComponent({
  setup() {
    return () => h(
      <div class="tree">
        <tree-item v-for="item in desktopIcons" key="item.name" node="item"></tree-item>
      </div>
    )
  },
  props: {
    treeData: {
      type: Object,
      default: () => {
        return {};
      },
    },
  }
})