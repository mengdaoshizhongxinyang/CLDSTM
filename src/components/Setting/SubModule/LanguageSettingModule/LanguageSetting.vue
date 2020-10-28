<template>
  <setting-body title="个性化" @widen="handleOpen">
    <div class="main"></div>
  </setting-body>
</template>

<script>
import SettingBody from "../../SettingBody";
export default {
  components: {
    SettingBody,
  },
  data() {
    return {
      list: [{ name: "语言", icon: "font-colors", component: "LanguageModule" }],
    };
  },
  methods:{
    handleOpen(e){
      if(e===true){
        this.$emit('openSub',this.list[0])
      }
    }
  }
};
</script>

<style lang="less" scoped>
.main {
  padding-top: 32px;
}
</style>