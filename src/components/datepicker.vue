<template>
<div>
  <a-range-picker
    :ranges="{
      '今天': [moment(), moment()], 
      '近3天': [moment().subtract(3, 'days'), moment()],
      '本周':[moment().startOf('week'),moment()],
      '近7天': [moment().subtract(7, 'days'), moment()],
      '本月':[moment().startOf('month'),moment()]
    }"
    format="YYYY-MM-DD"
    v-model="range"
  />
      <a-button type="primary" icon="search" style="margin-left:16px" @click="handleClick()" :loading="loading">搜索</a-button>
  </div>
</template>

<script>
import moment from "moment";
export default {
  props:{
    loading:{
      type:Boolean,
      default:false
    }
  },
  data(){
    return {
      range:[]
    }
  },
  methods: {
    handleClick(){
      if(this.range[0]){
        this.$emit('search',{begin:this.range[0].format('YYYY-MM-DD HH:mm:ss'),end:this.range[1].format('YYYY-MM-DD HH:mm:ss')})
      }else{
        this.$emit('search',{begin:moment().subtract(1,'years').format('YYYY-MM-DD HH:mm:ss'),end:moment().format('YYYY-MM-DD HH:mm:ss')})
      }
    },
    moment
  }
}
</script>

<style lang="less" scoped>
/deep/.ant-calendar-picker-input {
  line-height: 24px;
  width: 240px; 
}
</style>
