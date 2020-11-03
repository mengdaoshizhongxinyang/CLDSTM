<template>
  <div class="menu-main">
    <div class="menu-list">
      <div
        v-for="item in list"
        :key="item.LanguageModule"
        class="menu-list-item"
        @click="handleClick(item)"
      >
        <div class="menu-list-item-label"></div>
        <div class="menu-list-item-content">
          <a-icon :type="item.icon"></a-icon>
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  methods:{
    handleClick(item){
      this.$emit('openSub',item.component)
    }
  }
};
</script>

<style lang="less" scoped>
@name:~"menu";
.@{name}-main{
  height: 100%;
  overflow-x: hidden;
  overflow-y: overlay;
  color:#000;
  &::-webkit-scrollbar{
    width: 6px;
  }
  .@{name}-list{
    font-size: 16px;
    &-item{
      padding:1em 0;
      line-height: 18px;
      display: flex;
      &-label{
        background: rgb(0,120,215);
        position: relative;
        height: 100%;
        overflow: hidden;
        width:4px;
        &-active{
          border-left: 4px solid rgb(0,120,215);
        }
      }
      &-content{
        flex: 1;
        padding:0 0.5em;
        // border-left: 4px solid rgba(0, 0, 0, 0);
        
      }
      &:hover{
        background: rgba(200,200,200,.55);
      }
    }
  }
}
</style>