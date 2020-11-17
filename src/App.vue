<template>
  <a-config-provider :locale="locale">
    <div id="nav" @contextmenu.prevent>
      <router-view></router-view>
    </div>
  </a-config-provider>
</template>

<script lang="ts">
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import { defineComponent } from 'vue';
export default defineComponent({
  name: "app",
  data() {
    return {
      locale: zhCN,
    };
  },
  methods: {
    handleKeyDown(e:KeyboardEvent) {
      e.preventDefault();
    },
  },
  mounted() {
    // document.onkeydown=this.handleKeyDown
  },
});
</script>

<style>
#nav {
  width: 100%;
  height: 100%;
  position: fixed;
  user-select: none;
}
body {
  overflow: hidden;
}
</style>
