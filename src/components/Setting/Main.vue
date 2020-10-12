<template>
  <div class="main">
    <div class="content" @mousemove="handleMousemove" >
      
      <div class="title">设置</div>
      <div
        :class="`setting-item ${width >= 400 ? 'widescreen' : 'narrowscreen'}`"
        ref="body"
      >
        <div class="item"></div>
        <div class="shadow-box" :style="{left:x+'px',top:y+'px'}"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    //TODO 后面要有宽窄区别😎
    width: {
      type: Number,
      default: 400,
    },
  },
  data() {
    return {
      x: 0,
      y: 0,
    };
  },
  methods: {
    handleMousemove(e) {
      this.x = e.clientX - this.$refs.body.getBoundingClientRect().x - 75;
      this.y = e.clientY - this.$refs.body.getBoundingClientRect().y - 75;
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  background: #fff;
  padding-top: 32px;
  .content {
    
    display: flex;
    text-align: center;
    justify-content: center;
    flex-flow: column;
    overflow: hidden;
    
    height: 100%;
    .title {
      font-size: 24px;
      background: #fff;
      z-index:1;
    }
    .setting-item {
      flex: 1;
      overflow: hidden;
      position: relative;
      
    }
    .widescreen {
      height: auto;
      display: flex;
      width:fit-content;
      padding: 16px;
      .item{
        width:120px;
      }
    }
    .shadow-box{
      position: absolute;
      background-image: radial-gradient(circle,rgba(180,180,180,0.85) 10%, rgba(255,255,255,0.08) 60%);
      width: 150px;
      height: 150px;
      z-index: 0;
    }
  }
}
</style>