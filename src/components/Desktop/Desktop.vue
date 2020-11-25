<template>
  <div class="desktop" @contextmenu="(e) => rightClick(e)">
    <div class="desktop-rightmenu">
      <right-click-menu
        :offset="contextMenuOffset"
        v-model:show="headerMenu"
        :menus="menus()"
        @menuItemClick="handleMenuItemClick"
      >
      </right-click-menu>
    </div>
  </div>
</template>

<script lang="ts">
import {RightClickMenu} from "@/components";
import { useStore } from "vuex";
import { Store } from "@/types/store";
import { Events } from "vue";
import { defineComponent } from "vue";
type typeMenu = {
  label: string;
  name: string;
  children?: Array<typeMenu>;
  run?: string;
};
export default defineComponent({
  computed:{
    // menus(){
    //   this
    // }
  },
  setup() {
    const store:Store = useStore();
    
    const menus = () => {
      let language =
        store.state.core.language.languageSelected.desktop.contextMenu;
      type languageContextMenu = typeof language;

      let menuList: Array<typeMenu> = [
        { label: "刷新", name: "refresh" },
        {
          label: "创建",
          name: "create",
          children: [
            { label: "文件夹", run: "createFolder", name: "createFolder" },
          ],
        },
        { label: "个性化", name: "personalise", run: "personaliseFrame" },
      ];

      let queueMenus = menuList.concat([]);
      while (queueMenus.length != 0) {
        let menu: typeMenu = queueMenus.pop() as typeMenu;
        menu.label =
          language[menu.name as keyof languageContextMenu] || menu.label;
        if (menu.children && menu.children.length > 0) {
          queueMenus = queueMenus.concat(menu.children);
        }
      }
      return menuList;
    };
    const createFile = (info: any) => {
      store.dispatch("createFile", info);
    };
    const runEvent = {
      createFolder: () => {
        createFile({
          type: "folder",
          name: "新建文件夹",
          path: "/",
        });
      },
      personaliseFrame() {
        let PersonaliseSetting = {
          apps: "Setting",
          icon: "setting",
          name: "设置",
        };
        store.dispatch("openApps", PersonaliseSetting);
      },
    };
    const handleMenuItemClick = (menu: typeMenu) => {
      if (runEvent[menu.run as keyof typeof runEvent]) {
        runEvent[menu.run as keyof typeof runEvent]();
      }
    };
    return { menus, createFile, ...runEvent,handleMenuItemClick };
  },
  components: {
    RightClickMenu,
  },
  data() {
    return {
      headerMenu: false,
      contextMenuOffset: {
        left: 0,
        top: 0,
      },
      list: {},
    };
  },
  methods: {
    rightClick(e: MouseEvent) {
      this.contextMenuOffset.left = e.x;
      this.contextMenuOffset.top = e.y;
      this.headerMenu = true;
    },
    personaliseFrame() {
      let PersonaliseSetting = {
        apps: "Setting",
        icon: "setting",
        name: "设置",
      };
      this.$tstore.dispatch("openApps", PersonaliseSetting);
    },
  },
  mounted() {
    this.list = configs.getActionsItem();
  },
});
</script>

<style lang="less" scoped>
@import "../Style/menu";
.desktop {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  &-rightmenu {
    position: relative;
  }
}
</style>