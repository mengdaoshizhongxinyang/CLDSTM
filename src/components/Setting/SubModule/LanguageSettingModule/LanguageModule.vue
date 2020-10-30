<template>
  <div class="language-main">
    <a-select>
      <a-select-option value="1">
        中文
      </a-select-option>
    </a-select>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        
      }
    }
  }
</script>

<style lang="less" scoped>
@name:~"language";
.@{name}-main{
  height:100%;
  background: #fff;
  padding-top: 88px;
}
</style>