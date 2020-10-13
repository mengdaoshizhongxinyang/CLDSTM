<template>
  <setting-frame name="设置" v-on="$listeners" v-bind="$attrs" @resizing="handleResize">
    <template #content>
      <div class="content">
        <component :is="subComponents" class="sub-content" :width="w"></component>
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
  },
  data(){
    return{
      w:500
    }
  },
  methods:{
    handleResize(x,y,w,h){
      this.w=w
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