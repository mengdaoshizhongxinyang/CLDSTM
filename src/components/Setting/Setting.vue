<template>
  <setting-frame name="设置" v-on="$listeners" v-bind="$attrs">
    <template #content>
      <div class="content">
        <component :is="subComponents" class="sub-content"></component>
      </div>
    </template>
  </setting-frame>
</template>

<script>
import SettingFrame from "@/components/Frame";
import SettingMain from "./Main";
export default {
  components: {
    SettingFrame,
    SettingMain
  },
  props:{
    subComponents:{
      type:String,
      default:"SettingMain"
    }
  }
};
</script>

<style lang="less" scoped>

.content{
  height:100%;
  width: 100%;
  display: flex;
  .sub-content{
    height: 100%;
    width: 100%;
  }
}
</style>