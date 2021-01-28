import { computed, defineComponent, PropType, reactive, h, onMounted } from "vue";
import Tree from "../Tree";
import { DesktopIcon, AppFrame, IconManage } from "@/components";
import { useStore } from "@/store";
import DesktopIconBase from "@/components/DesktopIcon/DesktopIconBase.vue";
import { FileType, FilesType, IconList } from "@/types";
import style from "./folder.module.less";
export default defineComponent({
  props: {
    children: {
      type: Object as PropType<FilesType>,
      default: {},
    },
    position: {
      type: String,
      default: "",
    },
    icon: {
      type: String as PropType<IconList>,
      default: "FileUnknown",
    }
  },
  components: {
    DesktopIconBase,
    DesktopIcon,
    Tree,
    AppFrame,
    IconManage
  },
  setup(props, { attrs }) {
    const store = useStore()
    const folderStatus = computed(() => {
      return store.state.view.folder.folderStatus
    })
    const data = reactive({
      folderList: {} as FilesType,
      backStack: [] as {}[],
      nextStack: [] as {}[],
      path: props.position,
      search: "",
      cacheSearch: "",
      iconStyle: "filled",
    })

    const handleOpenApps = (icon: FileType) => {
      let { folderList, backStack, path, cacheSearch } = data;
      data.search = icon.search ? icon.search : "";
      if (icon.type == "folder") {
        let search = cacheSearch;
        backStack.push({ folderList, path, search });
        folderList = icon.children!;
        path = icon.position!;
        Object.assign(data, {
          folderList,
          path,
          nextStack: [],
          cacheSearch: data.search,
        });
      } else {
        store.commit('SET_RUNING_APPS', icon);
      }
    }
    const handleBack = () => {
      let { folderList, backStack, nextStack, path, search } = data;
      let backFolder = backStack.pop();
      nextStack.push({ folderList, path, search });
      Object.assign(data, {
        backStack,
        nextStack,
        ...backFolder,
      });
    }
    const handleNext = () => {
      let { folderList, backStack, nextStack, path, search } = data;
      let backFolder = nextStack.pop();
      backStack.push({ folderList, path, search });
      Object.assign(data, {
        backStack,
        nextStack,
        ...backFolder,
      });
    }
    const handleSearch = (e: string) => {
      if (e == "") {
        return;
      }
      let tempList = Object.values(data.folderList).map((item) => {
        return item;
      });
      let folderList: FilesType = {};
      while (tempList.length > 0) {
        let start = tempList.shift()!;
        if (start.type == "folder") {
          tempList = tempList.concat(
            Object.values(start.children!).map((item) => {
              return item;
            })
          );
        }
        if (start.name && ~start.name.indexOf(e)) {
          folderList[start.name] = start;
        }
      }
      handleOpenApps({
        children: folderList,
        position: `${e}的搜索结果`,
        search: e,
        type: "folder",
      });
    }
    const handleResize = (w: number, h: number, x: number, y: number) => {
      store.dispatch('updateFolderStatus', { w, h, x: x + 20, y: y + 20 })
    }
    const handleDragstop = (x: number, y: number) => {
      store.dispatch('updateFolderStatus', { x: x + 20, y: y + 20 })
    }
    const handleResizing = (l: number, t: number, w: number, h: number) => {

    }
    onMounted(() => {
      const { w, h, x, y } = folderStatus.value
      data.folderList = props.children;
      store.dispatch('updateFolderStatus', { w, h, x: x! + 20, y: y! + 20 })
    })
    return () => h(
      <AppFrame
        {...attrs}
        onResize={handleResize}
        onDragstop={handleDragstop}
        initialH={folderStatus.value.h}
        initialW={folderStatus.value.w}
        initialX={folderStatus.value.x}
        initialY={folderStatus.value.y}
        onResizing={handleResizing}
        minWidth={400}
      >
        <div class={style["floder"]}>
          <div class={style["floder-menu"]}></div>
          <div class={style["floder-address"]}>
            <a-button
              size="small"
              class={style["floder-address-button"]}
              disabled={data.backStack.length == 0}
              onClick={handleBack}
            >
              <IconManage icon="ArrowLeftOutlined"></IconManage>
            </a-button>
            <a-button
              size="small"
              class={style["floder-address-button"]}
              disabled={data.nextStack.length == 0}
              onClick={handleNext}
            >
              <IconManage icon="ArrowRightOutlined"></IconManage>
            </a-button>
            <a-button size="small" class={style["floder-address-button"]} disabled>
              <IconManage icon="DownOutlined"></IconManage>
            </a-button>
            <a-button size="small" class={style["floder-address-button"]} disabled>
              <IconManage icon="ArrowUpOutlined"></IconManage>
            </a-button>
            <a-input size="small" class={style["floder-address-input"]} v-model={[data.path, 'value']} v-slots={{ prefix: () => <IconManage icon={props.icon} /> }}>
            </a-input>
            <a-button
              size="small"
              class={[style["floder-address-button"], style["floder-address-input-suffix"]]}
            >
              <IconManage icon="RedoOutlined"></IconManage>
            </a-button>
            <a-input-search
              size="small"
              style="width:112px"
              onSearch={handleSearch}
              v-model={[data.search, 'value']}
            ></a-input-search>
          </div >
          <div class={style["floder-content"]}>
            <div class={style["floder-content-tree"]}>
              <tree></tree>
            </div>
            <div class={style["floder-content-list"]}>
              {
                Object.keys(data.folderList).map(item => {
                  return <desktop-icon-base
                    class={style["icon"]}
                    tabindex={-1}
                    onOpenApps={() => handleOpenApps(data.folderList[item])}
                    style={{ color: "#000" }}
                    iconStyle={data.iconStyle}
                    iconInfo={data.folderList[item]}
                  ></desktop-icon-base>
                })
              }
            </div>
          </div>
        </div>
      </AppFrame>
    )
  }
})