<template>
  <a-config-provider :locale="locale">
    <div id="app" @contextmenu.prevent>
      <router-view></router-view>
    </div>
  </a-config-provider>
</template>

<script>
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";

export default {
  name: "app",
      data() {
      return {
        locale: zhCN
      };
    },
  components: {

  },
  methods:{
    handleKeyDown(e){
      e.preventDefault();
    }
  },
  mounted(){
    // document.onkeydown=this.handleKeyDown
    

  }
};
</script>

<style>
#app {
  width: 100%;
  height: 100%;
  position: fixed;
}
body {
  overflow: hidden;
}
</style>
