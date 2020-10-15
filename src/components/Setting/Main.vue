<template>
  <setting-body>
    <div class="content" @mousemove="handleMousemove">
      <div class="title">设置</div>
      <div
        :class="`setting-item ${colNum > 1 ? 'widescreen' : 'narrowscreen'}`"
        :style="`width:${colNum > 1 ? colNum * 240 + 'px' : '100%'}`"
        ref="body"
      >
        <div class="item" v-for="(item, index) in items" :key="index" @click="handleOpen(item)">
          <div class="item-ud-occlude occlude"></div>
          <div class="item-lr-occlude occlude"></div>
          <div class="item-content">
            <div class="item-content-icon">
              <a-icon :type="item.icon"></a-icon>
            </div>
            <div class="item-content-title">
              {{ item.title }}
            </div>
            <div class="item-content-desc">
              {{ item.desc }}
            </div>
          </div>
          <div class="item-lr-occlude occlude"></div>
          <div class="item-ud-occlude occlude"></div>
        </div>
        <div v-for="i in colNum-(items.length%colNum)" :key="i+items.length" class="filling">

        </div>
        <div
          class="shadow-box"
          :style="{ left: x + 'px', top: y + 'px' }"
        ></div>
      </div>
    </div>
  </setting-body>
</template>

<script>
import SettingBody from "./SettingBody";
export default {
  components: {
    SettingBody,
  },
  computed: {
    colNum() {
      return this.width >= 500 ? Math.floor((this.width - 24) / 240) : 1;
    },
  },
  props: {
    width: {
      type: Number,
      default: 500,
    },
  },
  data() {
    return {
      x: 0,
      y: 0,
      items: [
        { icon: "highlight", title: "个性化", desc: "颜色，背景",component:'PersonaliseSetting' },
        { icon: "global", title: "语言设置", desc: "语言",component:'LanguageSetting' },
        { icon: "exclamation-circle", title: "待定", desc: "待定" },
        { icon: "exclamation-circle", title: "待定", desc: "待定" },
        { icon: "exclamation-circle", title: "待定", desc: "待定" },
        { icon: "exclamation-circle", title: "待定", desc: "待定" },
        { icon: "exclamation-circle", title: "待定", desc: "待定" }
      ],
    };
  },
  methods: {
    handleMousemove(e) {
      this.x = e.clientX - this.$refs.body.getBoundingClientRect().x - 75;
      this.y = e.clientY - this.$refs.body.getBoundingClientRect().y - 75;
    },
    handleOpen(item){
      this.$emit('openSub',item.component)
    }
  },
};
</script>

<style lang="less" scoped>
.content {
  display: flex;
  flex-flow: column;
  overflow: hidden;
  position: relative;
  align-items: center;
  .title {
    font-size: 24px;
    background: #fff;
    z-index: 1;
    text-align: center;
    width: 100%;
  }
  .setting-item {
    position: relative;
    overflow: hidden;
    .item {
      
      &-content {
        grid-template-columns: 40px calc(100% - 40px);
        grid-template-rows: 21px 21px;
        grid-auto-flow: row dense;
        display: grid;
        &-icon {
          color:rgb(0,120,215);
          grid-row-start: 1;
          grid-row-end: 3;
          font-size:28px;
          line-height: 40px;
        }
        &-title{
          color:rgba(0,0,0,0.85);
        }
      }
    }
  }
  .widescreen {
    align-content: flex-start;
    display: flex;
    width: fit-content;
    flex-wrap: wrap;
    max-width: 1200px;
    .item {
      width: 240px;
      display: flex;
      flex-wrap: wrap;
      z-index: 1;
      .occlude {
        background: #fff;
      }
      &-ud-occlude {
        width: 100%;
        height: 12px;
      }
      &-lr-occlude {
        width: 12px;
      }
      &-content {
        flex: 1;
        height: 64px;
        padding: 8px;
        background: #fff;
        margin: 1px;
        &:hover {
          box-shadow: 0px 0px 0px 1px rgba(100, 100, 100, 0.22);
        }
      }
    }
    .filling{
      background: #fff;
      width: 240px;
      height:90px;
      z-index: 1;
    }
  }
  .narrowscreen {
    padding: 24px 0;
    z-index: 1;
    background: #fff;
    .item {
      width: 100%;
      z-index: 1;
      .occlude {
        display: none;
      }
      &-content {
        height: 56px;
        padding: 7px;
        &:hover {
          background: rgba(100, 100, 100, 0.22);
        }
      }
    }
    .shadow-box {
      display: none;
    }
    .filling{
      display: none;
    }
  }
  .shadow-box {
    position: absolute;
    background-image: radial-gradient(
      circle,
      rgba(180, 180, 180, 0.85) 10%,
      rgba(255, 255, 255, 0.08) 60%
    );
    width: 150px;
    height: 150px;
    z-index: 0;
  }
}
</style>