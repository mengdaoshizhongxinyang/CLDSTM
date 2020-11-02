<template>
  <div class="desktop" @contextmenu="(e) => rightClick(e)">
    <div class="desktp-rightmenu">
      <right-click-menu
        :offset="contextMenuOffset"
        :show.sync="headerMenu"
        :menus="menus"
        @menuItemClick="handleMenuItemClick"
      >
      </right-click-menu>
    </div>
  </div>
</template>

<script>
import RightClickMenu from "../RightClickMenu";
import { mapGetters, mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState({
      menus(state) {
        let menuList = [
          { label: "刷新", name: "refresh" },
          {
            label: "创建",
            name: "create",
            children: [{ label: "文件夹", run: "createFolder" }],
          },
          { label: "个性化", name: "personalise", run: "personaliseFrame" },
        ];
        let language =
          state.core.language.language[state.core.language.languageSelected][
            "desktop"
          ]["contextMenu"];
        return menuList.map((item) => {
          return Object.assign(item,{
            label: language[item.name] || item.label
          });
        });
      },
    }),
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
    rightClick(e) {
      this.contextMenuOffset.left = e.x;
      this.contextMenuOffset.top = e.y;
      this.headerMenu = true;
    },
    handleItemClick(actions) {
      this.headerMenu = false;
      this.$store.dispatch(actions);
    },
    handleMenuItemClick(menu) {
      if (this[menu.run]) {
        this[menu.run]();
      }
    },
    createFolder() {
      this.$store.dispatch("createFile", {
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
      this.$tstore.dispatch("openApps", PersonaliseSetting);
    },
  },
  mounted() {
    this.list = configs.getActionsItem();
  },
};
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