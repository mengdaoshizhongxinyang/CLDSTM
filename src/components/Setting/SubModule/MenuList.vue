<template>
  <div :class="['menu-main', widen ? 'widen-menu' : 'narrow-menu']">
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
import { mapState } from 'vuex';
export default {
  computed:{
    ...mapState({
      list(state){
        let from=this.from
        from+=from.indexOf('Setting')>-1?'':'Setting'
        return state.core.setting.settings[from]
      }
    })
  },
  props: {
    from: {
      type:String,
      default:"none"
    },
    widen: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleClick(item) {
      this.$emit("openSub", item.component);
    },
  },
};
</script>

<style lang="less" scoped>
@import url("../../Style/default");
@supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
  .widen-menu {
    background: rgba(222, 222, 222, 0.65);
    backdrop-filter: @menu-dark-background-filter;
  }
}
.narrow-menu {
  background:#fff;
}
@name:~"menu";
.@{name}-main{
  height: 100%;
  color:#000;
  padding-top:32px;
  display: flex;
  flex-flow: column;
 
  .@{name}-list{
    flex: 1;
    font-size: 16px;
    overflow-x: hidden;
    overflow-y: overlay;
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
    &::-webkit-scrollbar{
      width: 6px;
    }
  }
}
</style>