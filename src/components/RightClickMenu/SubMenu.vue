<template>
  <transition name="contextmenu-fade">
    <div class="menu" :style="style">
      <div
        class="menu-item"
        v-for="(menu,index) in menus"
        :key="index"
        @mouseenter="handleMouseenter"
      >
        {{menu.label}}
        <sub-menu v-if="menu.children && menu.children.length"></sub-menu>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "subMenu",
  props: {
    menus: {
      type: Array,
      default: () => {
        return [];
      },
    },
    basePosition: {
      type: Object,
      default: function () {
        return {
          left: 0,
          top: 0,
          width:0,
          height:0
        };
      },
    },
    show:{
      type:Boolean,
      default:false
    }
  },
  data(){
    return{
      style:{}
    }
  },
  watch: {
    show(show) {
      if (show) {
        this.$nextTick(this.setPosition)
        document.body.addEventListener("mousedown", this.clickDocumentHandler);
      }else{
        document.body.removeEventListener("mousedown", this.clickDocumentHandler);
      }
    }
  },
  methods: {
    handleMouseenter(e) {
      console.log(e.target.getBoundingClientRect());
    },
    setPosition() {
      let docHeight = document.documentElement.clientHeight;
      let docWidth = document.documentElement.clientWidth;
      let menuHeight = this.$el.getBoundingClientRect().height;
      let menuWidth = this.$el.getBoundingClientRect().width;
      // 增加点击处与菜单间间隔
      const gap = 10;
      
      let topover = this.basePosition.top + menuHeight >= docHeight ? menuHeight : 0;
      let leftover = this.basePosition.left + menuWidth >= docWidth ? menuWidth : 0;
      console.log(menuWidth)
      this.style = {
        left: `${this.basePosition.left - leftover}px`,
        top: `${this.basePosition.top - topover}px`,
      };
    },
  },
  mounted(){
    this.$nextTick(()=>{
      this.setPosition()
    })
  }
};
</script>

<style lang="less" scoped>
@import "../Style/menu.less";
.contextmenu-fade-enter-active,
.contextmenu-fade-leave-active {
  transition: opacity 0.1s;
}
.contextmenu-fade-enter,
.contextmenu-fade-leave-to {
  opacity: 0;
}
</style>