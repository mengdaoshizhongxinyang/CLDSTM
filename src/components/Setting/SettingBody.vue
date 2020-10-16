<template>
  <div class="setting-main">
    <div class="wide-more" v-if="leftList.length > 0">
      <left-moreItem>
        <div class="left-more-list-content">
          <a-icon type="home"></a-icon>主页
        </div>
      </left-moreItem>
      <div class="more-title">{{title}}</div>
      <left-moreItem v-for="item in leftList" :key="item.component">
        <div class="left-more-list-content">
          <a-icon :type="item.icon"></a-icon>{{item.name}}
        </div>
      </left-moreItem>
    </div>
    <div class="setting-body">
      <slot name="narrowMore"></slot>
      <div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import LeftMoreItem from "./LeftMoreItem";
export default {
  components: {
    LeftMoreItem,
  },
  props: {
    title: {
      type: String,
      default: "",
    },
    leftList: {
      type: Array,
      default: () => {
        return [];
      },
    },
    width:{
      type:Number,
      default:540
    }
  },
  data() {
    return {
      subTitle: "",
    };
  },
};
</script>

<style lang="less" scoped>
@import url("../Style/default");
@supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
  .wide-more,
  .narrow-more {
    backdrop-filter: @menu-dark-background-filter;
  }
}
.setting-main {
  display: flex;
  height: 100%;
  width: 100%;
  .wide-more {
    width: 240px;
    padding: 54px 0;
    background-color: rgba(220, 220, 220, 0.65);
    .more-title {
      font-weight: 900;
      color:#000;
      padding:0 12px 12px;
    }
    .left-more-list-content {
      padding: 0 12px;
      /deep/.anticon {
        font-size: 14px;
        margin-right: 12px;
      }
    }

    .left-more-list-content-actived {
      padding-left: 6px;
      border-left: 6px solid #1890ff;
    }
  }
  .setting-body {
    background: #fff;
    position: relative;
    overflow-x: hidden;
    overflow-y: overlay;
    height: 100%;
    flex: 1;
    &::-webkit-scrollbar {
      width: 6px;
    }
    &::-webkit-scrollbar-button {
      height: 7px;
    }
    &::-webkit-scrollbar-thumb {
      width: 6px;
      border-radius: 4px 10px 4px 2px;
      background-image: linear-gradient(
        to right,
        rgba(0, 0, 0, 0.55) 50%,
        #fff 50%
      );
    }
  }
}
</style>