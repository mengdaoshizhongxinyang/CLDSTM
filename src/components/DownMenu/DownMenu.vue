<template>
  <div>
    <div class="main">
      <div class="appmenu" tabindex="-1" @focus="openMenu" @blur="closeMenu">
        <div class="appmenu-open" v-show="openMenuStatus"></div>
        <windows-outlined  type="windows" style="color:#fff;fontSize:24px;" />
      </div>
      <div class="task-menu">
        <div class="task-menu-item" v-for="(item, index) in desktopApps.apps" :key="index" >
          <div class="task-menu-item-container" @mouseup="e=>handleItemClick(e,item,index)">
            <div class="task-menu-item-container-content">
              <span class="task-menu-item-container-content-icon"><icon :icon="item.icon"></icon></span>
              {{item.name}}
            </div>
          </div>
          <transition @enter="enter" @afterEnter="afterEnter" @leave="leave" @afterLeave="afterLeave">
            <div class="menu-dark task-menu-context " tabindex="-1" ref="context" v-if="index==showIndex" @blur="closeContext(index)">
              <down-menu-right-menu @onClick="closeApp(index)">关闭</down-menu-right-menu>
            </div>
          </transition>
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

<script lang="ts">
import moment from "moment";
import { WindowsOutlined } from '@ant-design/icons-vue';
import { useStore } from "vuex";
import  Icon from "@/components/IconManage";
import DownMenuRightMenu from "./DownMenuRightMenu.vue";
import {Store} from "@/types/store";
export default {
  components:{
    DownMenuRightMenu,
    Icon,
    WindowsOutlined
  },
  data() {
    return {
      date: "",
      time: "",
      titleTime: "",
      titleTimeStatus: false,
      openMenuStatus:false,
      showIndex:-1
    };
  },
  setup(){
    const store:Store=useStore();
    const desktopApps=()=>{
      return store.getters.desktopApps
    }
    return {desktopApps}
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
    handleItemClick(e,app,index){
      if(e.button==0){
        this.resetMini(app,index)
      }else if(e.button==2){
        this.openContext(index)
      }
    },
    resetMini(app,index){
      this.$store.dispatch('minimizeApps',index)
    },
    openContext(index){
      this.showIndex=index
      this.$nextTick(()=>{
        this.$refs.context[0].focus()
      })
    },
    closeContext(index){
      this.showIndex=-1
    },
    closeApp(index){
      this.$store.dispatch('closeApps',index)
      this.showIndex=-1
    },
    enter(el) {
      el.style.height = "auto";
      let endWidth = window.getComputedStyle(el).height;
      el.style.height = "0px";
      el.offsetHeight;
      el.style.height = endWidth;
    },
    afterEnter(el) {
      el.style.height = null;
    },
    leave(el) {
      el.style.height = window.getComputedStyle(el).height;
      el.offsetHeight;
      el.style.height = "0px";
    },
    afterLeave(el) {
      el.style.height = null;
    },
  },
  mounted() {
    this.clock();
  }
};
</script>

<style lang="less" scoped>
@import "../Style/index";
@import "../Style/menu";
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
    background: @menu-dark-background-color;
  }
  @supports (-webkit-backdrop-filter:none) or (backdrop-filter:none) {
    &-open {
      backdrop-filter: @menu-dark-background-filter;
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
  position:relative;
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
    &:focus{
      background: rgba(255, 255,255, 0.16);
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
  &-context{
    padding:8px 2px;
    width:130%;
    left:-15%;
    position: absolute;
    bottom:100%;
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