<!--
 * _______________#########_______________________ 
 * ______________############_____________________ 
 * ______________#############____________________ 
 * _____________##__###########___________________ 
 * ____________###__######_#####__________________ 
 * ____________###_#######___####_________________ 
 * ___________###__##########_####________________ 
 * __________####__###########_####_______________ 
 * ________#####___###########__#####_____________ 
 * _______######___###_########___#####___________ 
 * _______#####___###___########___######_________ 
 * ______######___###__###########___######_______ 
 * _____######___####_##############__######______ 
 * ____#######__#####################_#######_____ 
 * ____#######__##############################____ 
 * ___#######__######_#################_#######___ 
 * ___#######__######_######_#########___######___ 
 * ___#######____##__######___######_____######___ 
 * ___#######________######____#####_____#####____ 
 * ____######________#####_____#####_____####_____ 
 * _____#####________####______#####_____###______ 
 * ______#####______;###________###______#________ 
 * ________##_______####________####______________ 
 * @Author: mengdaoshizhongxinyang
 * @Date: 2020-09-02 10:12:15
 * @Description: 
 * @GitHub: https://github.com/mengdaoshizhongxinyang
-->

<template>
  <div :class="`${'window'}-resume-body ${theme}`">
    <div class="info">
      <div class="info-content module">
        <img src="/img/gugugu.png" alt class="info-content-avatar" />
        <div class="info-content-cn">
          残笑
        </div>
        <div class="info-content-list">
          <a-icon type="mail"></a-icon>{{email}}
        </div>
        <div class="info-content-list">
          <a-icon type="home"></a-icon>
          浙江杭州
        </div>
        <div class="info-content-list">
          <a-icon type="idcard"></a-icon>
          前端程序员
        </div>
        <div class="info-content-list">
          <a-icon type="github"></a-icon>
          <a href="https://github.com/mengdaoshizhongxinyang" target="_blank">
            萌道是种信仰
          </a>
        </div>
        <a-divider></a-divider>
        <div class="info-content-list">
          <a-tag v-for="tag in tags" :key="tag" :color="tagColor">{{tag}}</a-tag>
        </div>
        <a-divider></a-divider>
      </div>
    </div>
    <div class="more module">
      <a-tabs v-model="tabKey">
        <a-tab-pane key="1" tab="文章">
          <article-list></article-list>
        </a-tab-pane>
        <a-tab-pane key="2" tab="项目">
          <project></project>
        </a-tab-pane>      
      </a-tabs>
    </div>
  </div>
</template>

<script>
import ArticleList from "./modules/ArticleList.vue";
import Project from "./modules/Project.vue";
export default {
  components:{
    ArticleList,
    Project
  },
  created() {
    let isMobile = navigator.userAgent.match(
      /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
    );
    this.isMobile = isMobile ? true : false;
    let bg = document.getElementById("background");
    if (bg) {
      this.theme = "dark";
    } else {
      this.theme = "light";
      
    }
  },
  data() {
    return {
      tags:[
        "vue",
        
        "laravel做过后端",
        "antdv",
        "acm2银1铜"
      ],
      theme: "light",
      isMobile: false,
      tabKey:"1"
    };
  },
  computed:{
    email(){
      let email="programmercyk@gmail.com"
      //BAFEC9CF6472749431B7F1986EC7A728
      return email
    },
    tagColor(){
      let colorArr=[
        "pink",
        "magenta",
        "red",
        "volcano",
        "orange",
        "gold",
        "green",
        "cyan",
        "lime",
        "blue",
        "geekblue",
        "purple"
      ]
      let rd=Math.floor(Math.random()*colorArr.length)
      return colorArr[rd]
    }
  },
  mounted() {
    this.$route.params.key;
    this.$nextTick(()=>{
      if(this.theme=='light'){
        this.$message.success("该页面有黑暗模式😁");
      }
    })
  },
};
</script>

<style lang="less" scoped>
.window-resume-body {
  width: 1000px;
  position: fixed;
  left: 50%;
  min-height: 80%;
  transform: translate(-50%, 0);
  flex-wrap: wrap;
  padding: 40px;
  display: flex;
  justify-content: space-around;
}
  .info {
    min-width: 240px;
    max-width: 300px;
    flex: 1;
    &-content{
      padding: 24px;
      flex-wrap: wrap;
      display: flex;
      justify-content: center;
      height: auto;
      &-avatar {
        width: 100px;
        height: 100px;
        border-radius: 50%;
      }
      &-cn{
        font-size: 30px;
        font-weight: 900;
        color: transparent;
        text-align: center;
        width:100%;
        margin: 6px 0;
        line-height: 1.2em;
        background-clip: text;
        background-image: linear-gradient(rgb(169, 201, 255) 0%, rgb(255, 187, 236) 100%);
        user-select:none;
      }
      &-list{
        width:100%;
        a{
          color: rgba(0,0,0,0.65);
        }
      }
    }
  }
  .more {
    min-width: 400px;
    margin-left: 40px;
    flex: 3;
    padding:40px;
  }
  .module {
    box-shadow: 0px 0px 5px 5px rgba(55, 55, 55, 0.2);
  }
  .dark{
    color:#fff;
    .info-content-list{
      a{
          color: #fff;
        }
    }
    ::v-deep(.ant-list-item-meta-title) > a{
      color:#fff;
    }
    ::v-deep(.ant-list-item-meta-description){
      color:#afafaf;
    }
    ::v-deep(.ant-list-items){
      color:#afafaf;
    }
    ::v-deep(.ant-tabs){
      color:#fff;
    }
    .module{
      border:1px solid #fff;
    }
  }
</style>