<template>
  <div class="article-main">
    <article-base :content="content"></article-base>
  </div>
</template>

<script>
import ArticleBase from "@/components/Article/ArticleBase.vue";
import { mapGetters } from 'vuex';
  export default {
    created(){
      let routes=this.$route.params.pathMatch.split("/")
      let content=""
      let obj=this.fileList['static']
      routes.forEach((item,index)=>{
        obj=obj.children
        if(routes.length-1==index){
          obj=obj[item+'.md']
        }else{
          obj=obj[item]
        }
      })
      this.content=obj.content
    },
    components:{
      ArticleBase
    },
    data(){
      return {
        content:""
      }
    },
    computed:{
      ...mapGetters(['fileList'])
    },
    mounted(){
      // console.log(this.$route.params.pathMatch)
      // console.log(this.fileList)
    }
  }
</script>

<style lang="less" scoped>
.article-main{
  width: 800px;
  position: fixed;
  left:50%;
  background: #fff;
  transform: translate(-50%,0);
  box-shadow: 0 0 5px 2px rgba(0,0,0,0.12);
  top:20%;
}

</style>