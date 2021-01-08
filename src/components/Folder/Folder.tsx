import { computed, defineComponent } from "vue";
import Tree from "../Tree";
import { DesktopIcon, Frame,IconManage } from "@/components";
import { useStore } from "@/store";
import DesktopIconBase from "@/components/DesktopIcon/DesktopIconBase.vue";
import { fileType } from "@/types";
interface props{

}
interface children{

}
export default defineComponent({
  props: {
    children: {
      type: Object,
      default: () => {
        return {};
      },
    },
    position: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      default: "file-unknown",
    },
  },
  setup(props){
    const store=useStore()
    const desktopApps=computed(()=>{
      return store.getters.desktopApps
    })
    const folderStatus=(()=>{
      return store.state.view.folder.folderStatus
    })
    const handleOpenApps=(icon:fileType[keyof fileType])=>{
      let { folderList, backStack, path, cacheSearch } = this;
      this.search = icon.search ? icon.search : "";
      if (icon.type == "folder") {
        let search = cacheSearch;
        backStack.push({ folderList, path, search });
        folderList = icon.children;
        path = icon.position;
        Object.assign(this, {
          folderList,
          path,
          nextStack: [],
          cacheSearch: this.search,
        });
      } else {
        this.$store.commit(SET_RUNING_APPS, icon);
      }
    }
  }
})