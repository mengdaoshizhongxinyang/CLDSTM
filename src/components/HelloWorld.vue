<template>
  <div>
    <a-button>{{msg}}</a-button>
  </div>
</template>

<script>
import {Button} from "ant-design-vue"
  export default {
    components:{
      AButton:Button
    },
    data(){
      return{
        msg:"hello world"
      }
    }
  }
</script>

<style lang="less" scoped>

</style>