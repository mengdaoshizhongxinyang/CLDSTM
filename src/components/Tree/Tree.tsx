import { defineComponent, h, reactive } from "vue";
import TreeItem from "./TreeItem";
interface node {
  name?: string
}
export default defineComponent({
  components:{
    TreeItem
  },
  setup() {
    const data = reactive({ desktopIcons: {} })
    data.desktopIcons = configs.getDesktopIcon()
    return () => h(
      <div class="tree">
        {
          Object.keys(data.desktopIcons).map(item => {
            return (
              <tree-item 
                key={(data.desktopIcons[item as keyof typeof data.desktopIcons] as node).name} 
                node={data.desktopIcons[item as keyof typeof data.desktopIcons]}
              ></tree-item>
            )
          })
        }

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