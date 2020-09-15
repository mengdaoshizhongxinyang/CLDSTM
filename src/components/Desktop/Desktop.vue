<template>
  <div class="desktop" @contextmenu="e=>rightClick(e)">
    <div class="desktp-rightmenu">
      <right-click-menu
        :offset="contextMenuOffset"
        :show.sync="headerMenu"
        :menus="menus"
        @menuItemClick="handleMenuItemClick"
      >
        <template #refresh="menu">
          <a-icon type="left"></a-icon>
          {{menu.label}}
        </template>
        <template #create="menu">
          <a-icon type="left"></a-icon>
          {{menu.label}}
        </template>
      </right-click-menu>
    </div>
  </div>
</template>

<script>
import RightClickMenu from "../RightClickMenu";
import { mapGetters, mapState, mapActions } from "vuex";
export default {
  components: {
    RightClickMenu,
  },
  data() {
    return {
      headerMenu: false,
      contextMenuOffset: {
        left: 0,
        top: 0,
        width: 0,
        height: 0,
      },
      list: {},
      menus: [
        { label: "刷新", run: "refresh",name:"refresh" },
        {
          label: "创建",
          run: "create",
          name:"create",
          children: [{ label: "文件夹", run: "createFolder" }],
        },
      ],
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
      if (menu.run) {
        this[menu.run]();
      }
    },
    createFolder() {
      this.$store.dispatch("createFile",{type:folder,name:"新建文件夹"});
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