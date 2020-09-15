<template>
  <div class="desktop" @contextmenu="e=>rightClick(e)">
    <div class="desktp-rightmenu">
      <right-click-menu :offset="contextMenuOffset" :show.sync="headerMenu" :menus="menus" @menuItemClick="handleMenuItemClick">
        <!-- <div class="menu-item" @click="handleRefresh">刷新</div>
        <a-divider />
        <template v-for="items in Object.keys(list)">
          <div
            class="menu-item"
            v-for="item in list[items]"
            :key="item.action"
            @click="handleItemClick(item.action)"
          >{{item.name}}</div>
          <a-divider :key="`${items}-key`"/>
        </template>
        <div class="menu-item" @click="handleCreate">
          新建
        </div>
        <a-divider />
        <div class="menu-item">显示设置</div>
        <div class="menu-item">个性化</div> -->
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
        width:0,
        height:0,
      },
      list: {},
      menus:[
        {label:"刷新",run:"refresh"},
        {label:"创建",run:"create",children:[
          {label:"文件夹",run:"createFolder"}
        ]},
      ]
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
    handleRefresh(){
      this.headerMenu=false
    },
    handleCreate(){
      this.headerMenu=false
      this.$store.dispatch('createIcon','./')
    },
    handleMenuItemClick(menu){
      if(menu.run){
        this[menu.run]()
      }
    }
  },
  mounted() {
    this.list = configs.getActionsItem();
  }
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