<template>
  <frame-window>

  </frame-window>
</template>

<script>
import FrameWindow from "@/components/Frame";
  export default {
    created(){
      this.name=this.attributes.name
    },
    components:{
      FrameWindow
    },
    props:{
      attributes:{
        type:Object,
        default:()=>{
          return {name:''}
        }
      }
    },
    data(){
      return {
        name:''
      }
    }
  }
</script>

<style lang="less" scoped>

</style>