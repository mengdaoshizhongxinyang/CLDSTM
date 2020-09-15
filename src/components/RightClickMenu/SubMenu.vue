<template>
  <transition name="contextmenu-fade">
    <div class="menu" :style="style" v-show="show">
      <div
        class="menu-item"
        v-for="(menu,index) in menuList"
        :key="index"
        @mouseenter="handleMouseenter(menu)"
        @mouseleave="handleMouseleave(menu)"
        @click="handleClick(menu)"
      >
        {{menu.label}}
        <template v-if="menu.children && menu.children.length">
          <sub-menu :menus="menu.children" :show.sync="menu.show" @menuItemClick="handleClick"></sub-menu>
        </template>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "subMenu",
  created(){
    this.menuList=[].concat(this.menus.map(item=>{
      return {
        ...item,
        hidden:false
      }
    }))
  },
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
      style:{},
      subStyle:{
        x:0,
        y:0
      },
      direction:"right",
      menuList:[]
    }
  },
  watch: {
    show(show) {
      if (show) {
        this.$nextTick(this.setPosition)
        document.body.addEventListener("mousedown", this.clickDocumentHandler);
        this.direction="right"
      }else{
        document.body.removeEventListener("mousedown", this.clickDocumentHandler);
        this.menuList.forEach(item=>{
          item.show=false
        })
      }
    }
  },
  methods: {
    handleMouseenter(menu) {
      menu.show=true
      this.$forceUpdate()
    },
    handleMouseleave(menu){
      menu.show=false
      this.$forceUpdate()
    },
    clickDocumentHandler() {
      if (this.show) {
        this.$emit("update:show", false);
      }else{
        this.$emit("update:show", true);
      }
    },
    setPosition() {
      const {x,y,width,height}=this.$el.parentElement.getBoundingClientRect()
      let topover,leftover
      let docHeight = document.documentElement.clientHeight;
      let docWidth = document.documentElement.clientWidth;
      let menuHeight = this.$el.getBoundingClientRect().height;
      let menuWidth = this.$el.getBoundingClientRect().width;
      topover = (y+height + menuHeight) <= docHeight ? y : y+height-menuHeight;
      if(this.$parent.direction=="left"){
        leftover=x-menuWidth
      }else{
        leftover = x+width + menuWidth <= docWidth ? x+width : x-menuWidth;
        if((x+width + menuWidth) > docWidth){
          this.direction="left"
        }
      }
      this.style = {
        left: `${leftover}px`,
        top: `${topover}px`,
      };
      this.$emit('setPosition',this.style)
    },
    handleClick(menu){
      if(!menu.children){
        if(menu.function){
          menu.function()
        }
        this.$emit('menuItemClick',menu)
      }
    }
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