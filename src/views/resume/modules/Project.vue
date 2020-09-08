<template>
  <div class="project-main">
    <div v-for="item in flowData" :key="item.id" class="project-card-list" :style="`width:${item.width}%`">
      <div class="project-card">
        <img
          src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
          style="object-fit:contain;width:100%"
        />
        <div class="project-card-body">
          <div class="project-card-body-title">
            Europe Street beat 
          </div>
          <div class="project-card-body-content">
            www.instagrsd asdasdasdam.com dasasfasdasd adasdasda
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    created(){
      for(let i=0;i<3;i++){
        this.flowData.push({
          data:[],
          height:0,
          id:i,
          width:90/3
        })
      }
    },
    data(){
      return{
        flowData:[]
      }
    }
  }
</script>

<style lang="less" scoped>
.project-main{
  display: flex;
  justify-content: space-around;
  .project-card-list{
    .project-card{
      border: 1px solid #f0f0f0;
      &-body{
        padding: 16px;
        &-title{
          font-size: 16px;
          color:rgba(0,0,0,0.85);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        &-content{
          overflow : hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          word-break: break-all;
        }
      }
    }
  }
}
</style>