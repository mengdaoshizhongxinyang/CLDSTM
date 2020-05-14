<template>
  <div>
    <div class="main">
      <div class="appmenu">
        <a-icon type="windows" style="color:#fff;fontSize:24px;"></a-icon>
      </div>
      <div class="icon"></div>
      <div
        class="status"
        @mouseenter="handleTitleTimeStatus(true)"
        @mouseleave="handleTitleTimeStatus(false)"
      >
        {{time}}
        {{date}}
        <div class="title" v-if="titleTimeStatus">{{titleTime}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      date: "",
      time: "",
      titleTime: "",
      titleTimeStatus: false
    };
  },
  methods: {
    clock() {
      this.date = moment().format("YYYY/MM/DD/周dd");
      this.time = moment().format("HH:mm");
      this.titleTime = moment().format("YYYY年MM月DD日,dddd");
      setTimeout(this.clock, 1000);
    },
    handleTitleTimeStatus(statu) {
      this.titleTimeStatus = statu;
    }
  },
  mounted() {
    this.clock();
  }
};
</script>

<style lang="less" scoped>
.main {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 44px;
  display: flex;
  background: #000000aa;
}
.appmenu {
  width: 48px;
  cursor: pointer;
  padding: 10px 12px;
  &:hover {
    background: #ffffff2a;
  }
}
.icon {
  flex: 1;
}
.status {
  width: 110px;
  text-align: center;
  cursor: pointer;
  color: #fff;
  position: relative;
  &:hover {
    background: #ffffff2a;
  }
  .title {
    position: absolute;
    padding: 3px;
    font-size: 13px;
    line-height: 13px;
    width: 148px;
    right: 0;
    color: #000;
    height: 20px;
    top: -22px;
    background: #fff;
  }
}
</style>