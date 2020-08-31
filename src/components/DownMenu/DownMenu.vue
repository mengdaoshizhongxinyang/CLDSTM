<template>
  <div>
    <div class="main">
      <div class="appmenu" tabindex="-1" @focus="openMenu" @blur="closeMenu">
        <div class="appmenu-open" v-show="openMenuStatus"></div>
        <a-icon type="windows" style="color:#fff;fontSize:24px;"></a-icon>
      </div>
      <div class="task-menu">
        <div class="task-menu-item" v-for="(item, index) in desktopApps.apps" :key="index" @click="resetMini(item,index)">
          <div class="task-menu-item-container">
            <div class="task-menu-item-container-content">
              <span class="task-menu-item-container-content-icon"><icon :icon="item.icon"></icon></span>
              {{item.name}}
            </div>
          </div>
        </div>
      </div>
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
import { mapGetters } from "vuex";
import  Icon from "@/components/IconManage";
export default {
  components:{
    Icon
  },
  data() {
    return {
      date: "",
      time: "",
      titleTime: "",
      titleTimeStatus: false,
      openMenuStatus:false
    };
  },
  computed:{
    ...mapGetters(['desktopApps'])
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
    },
    openMenu() {
      this.openMenuStatus=true
    },
    closeMenu() {
      this.openMenuStatus=false
    },
    resetMini(app,index){
      this.$store.dispatch('minimizeApps',index)
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
  height: 40px;
  display: flex;
  background: rgba(26, 26, 26, 0.88);
  z-index:19999999;
}
.appmenu {
  width: 48px;
  cursor: pointer;
  position:relative;
  padding: 10px 12px;
  &-open{
    position: absolute;
    bottom: 100%;
    height: 200px;
    width: 200px;
    // overflow: hidden;
    backdrop-filter: blur(2px);
    background: rgba(0, 0, 0, 0.9);
  }
  @supports (-webkit-backdrop-filter:none) or (backdrop-filter:none) {
    &-open {
      backdrop-filter: blur(15px);  
    }
  }
  &:hover {
    background: rgba(255, 255,255, 0.16);
  }
  &:focus{
    background: rgba(255, 255,255, 0.16);
  }
}
.task-menu {
  flex: 1;
  display: flex;
  &-item{
    color: #fff;
    font-size: 16px;
    max-width: 160px;
    flex: 1;
    height: 100%;
    margin-right: 1px;
    position: relative;
    cursor: default;
    user-select: none;
    &:hover{
      background: rgba(255, 255, 255, 0.12);
    }
    &-container{
      left: 0px;
      position: absolute;
      width: 152px;
      left: 50%;
      transform: translate(-50%,0);
      overflow: hidden;
      height: 100%;
      &-content{
        position:absolute;
        line-height: 40px;
        left: 4px;
        display: flex;
        word-break: break-all;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
        width: 152px;
        &-icon{
          font-size: 32px;
          margin-right: 6px;
        }
      }
    }
  }
}
.status {
  width: 110px;
  text-align: center;
  cursor: pointer;
  color: #fff;
  position: relative;
  &:hover {
    background: rgba(255, 255,255, 0.16);
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