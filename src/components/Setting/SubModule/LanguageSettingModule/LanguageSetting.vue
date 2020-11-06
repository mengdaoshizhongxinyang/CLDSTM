<template>
  <setting-body  @widen="handleOpen">
    <template #title>
      <div class="title">
        <div class="title-name">语言设置</div>
      </div>
    </template>
    <div class="main">
      <menu-list v-on="$listeners" from="Language"></menu-list>
    </div>
  </setting-body>
</template>

<script>
import SettingBody from "../../SettingBody";
import MenuList from "../MenuList";
export default {
  components: {
    SettingBody,
    MenuList
  },
  data() {
    return {
      list: [],
    }
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
  padding-top: 88px;
  height: 100%;
  background: #fff;
}
.title{
  padding-top:32px;
  background: #fff;
  .title-name{
    padding:16px;
    font-size: 16px;
    font-weight: 900;
    color:#000;
  }
}
</style>