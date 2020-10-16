<template>
  <setting-body :leftList="leftList" title="个性化" v-bind="$attrs">
    <template #more>
      <div class="left-main"></div>
    </template>
  </setting-body>
</template>

<script>
import SettingBody from "./SettingBody";
export default {
  components: {
    SettingBody,
  },
  data() {
    return {
      leftList: [{ name: "主题", icon: "desktop", component: "theme" }],
    };
  },
};
</script>

<style lang="less" scoped>
</style>