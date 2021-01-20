import { defineComponent, h, PropType, reactive } from "vue";
import TreeItem from "./TreeItem";
export default defineComponent({
  components: {
    TreeItem
  },
  setup() {
    const data = reactive({ desktopIcons: configs.getDesktopIcon() })
    return () => h(
      <div class="tree">
        {
          Object.keys(data.desktopIcons).map(item => {
            return <TreeItem
              key={data.desktopIcons[item].name}
              node={data.desktopIcons[item]}
            ></TreeItem>
          })
        }
      </div>
    )
  },
  props: {
    treeData: {
      type: Object as PropType<configs.fileType>,
      default: () => {
        return {};
      },
    },
  }
})