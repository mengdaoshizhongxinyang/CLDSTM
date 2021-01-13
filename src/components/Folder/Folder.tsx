import { computed, defineComponent, PropType, reactive, h, ExtractDefaultPropTypes } from "vue";
import Tree from "../Tree";
import { DesktopIcon, AppFrame, IconManage } from "@/components";
import { useStore } from "@/store";
import DesktopIconBase from "@/components/DesktopIcon/DesktopIconBase.vue";
import { fileType, filesType } from "@/types";
import "./*.less";
export default defineComponent({
  props: {
    children: {
      type: Object as PropType<filesType>,
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
  components: {
    DesktopIconBase,
    DesktopIcon,
    Tree,
    AppFrame,
    IconManage
  },
  setup(props, { attrs }) {
    console.log(props)
    const store = useStore()
    const desktopApps = computed(() => {
      return store.getters.desktopApps
    })
    const folderStatus = computed(() => {
      return store.state.view.folder.folderStatus
    })
    const data = reactive({
      folderList: {} as filesType,
      backStack: [] as {}[],
      nextStack: [] as {}[],
      path: props.position,
      search: "",
      cacheSearch: "",
      iconStyle: "filled",
    })

    const handleOpenApps = (icon: fileType) => {
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
      let folderList: filesType = {};
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
    return () => h(
      <app-frame
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
        <div class="floder">
          <div class="floder-menu"></div>
          <div class="floder-address">
            <a-button
              size="small"
              class="floder-address-button"
              disabled="backStack.length==0"
              onClick="handleBack"
            >
              <icon-manage icon="arrowLeft"></icon-manage>
            </a-button>
            <a-button
              size="small"
              class="floder-address-button"
              disabled="nextStack==0"
              onClick="handleNext"
            >
              <icon-manage icon="arrowRight"></icon-manage>
            </a-button>
            <a-button size="small" class="floder-address-button" disabled>
              <icon-manage icon="down"></icon-manage>
            </a-button>
            <a-button size="small" class="floder-address-button" disabled>
              <icon-manage icon="arrowUp"></icon-manage>
            </a-button>
            <a-input size="small" class="floder-address-input" v-model={[data.path, 'value']} v-slots={{ prefix: () => <icon-manage icon="icon" /> }}>
            </a-input>
            <a-button
              size="small"
              class="floder-address-button floder-address-input-suffix"
            >
              <icon-manage icon="redo"></icon-manage>
            </a-button>
            <a-input-search
              size="small"
              style="width:112px"
              onSearch="handleSearch"
              v-model={[data.search, 'value']}
            ></a-input-search>
          </div >
          <div class="floder-content">
            <div class="floder-content-tree">
              <tree></tree>
            </div>
            <div class="floder-content-list">
              {/* <desktop-icon-base
            class="icon"
            tabindex="-1"
            @openApps="handleOpenApps(icon)"
            v-for="icon in folderList"
            :key="icon.name"
            style="color:#000"
            :iconStyle="iconStyle"
            :iconInfo="icon"
          ></desktop-icon-base> */}
              {
                Object.keys(data.folderList).map(item => {
                  return <desktop-icon-base
                    class="icon"
                    tabindex={-1}
                    onOpenApps={() => handleOpenApps(data.folderList[item])}
                    style={{ color: "#000" }}
                    iconStyle={data.iconStyle}
                    iconInfo={data.folderList[item]}
                  ></desktop-icon-base>
                })
              }
            </div>
          </div >
        </div >
      </app-frame >
    )
  }
})