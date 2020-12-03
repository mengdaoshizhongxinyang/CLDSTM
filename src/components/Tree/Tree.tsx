import { defineComponent, h, PropType, reactive } from "vue";
import TreeItem from "./TreeItem";
import { node } from "./type";
export default defineComponent({
  components:{
    TreeItem
  },
  setup() {
    const data = reactive({ desktopIcons: {} })
    data.desktopIcons = configs.getDesktopIcon()
    console.log(data)
    return () => h(
      <div class="tree">
        {
          Object.keys(data.desktopIcons).map(item => {
            return (
              <tree-item 
                key={(data.desktopIcons[item as keyof typeof data.desktopIcons] as node).name} 
                node={(data.desktopIcons[item as keyof typeof data.desktopIcons] as node).children}
              ></tree-item>
            )
          })
        }
      </div>
    )
  },
  props: {
    treeData: {
      type: Object as PropType<node>,
      default: () => {
        return {};
      },
    },
  }
})