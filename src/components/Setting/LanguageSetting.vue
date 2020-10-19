<template>
  <setting-body :leftList="leftList" title="个性化">
    <div class="main"></div>
  </setting-body>
</template>

<script>
import SettingBody from "./SettingBody";
  export default {
    components:{
      SettingBody,
    },
    data(){
      return{
        leftList:[
          {name:'语言',icon:'font-colors',component:'language'}
        ]
      }
    }
  }
</script>

<style lang="less" scoped>
.main{
  padding-top:32px;
}
</style>