<template>
  <div
    class="context-menu"
    v-show="show"
    :style="style"
    @mousedown.stop
    @contextmenu.prevent
  >
    <slot>
      <sub-menu :menus="menus" :basePosition="offset" :show="show"></sub-menu>
    </slot>
  </div>
</template>
<script>
import SubMenu from "./SubMenu.vue";
export default {
  name: "right-click-menu",
  components:{
    SubMenu
  },
  data() {
    return {
      style: {}
    };
  },
  props: {
    offset: {
      type: Object,
      default: function() {
        return {
          left: 0,
          top: 0,
          width:0,
          height:0
        };
      }
    },
    show: Boolean,
    menus:{
        type:Array,
        default:()=>{
          return []
        }
      }
  },
  watch: {
    show(show) {
      if (show) {
        // this.$nextTick(this.setPosition)
        document.body.addEventListener("mousedown", this.clickDocumentHandler);
      }else{
        document.body.removeEventListener("mousedown", this.clickDocumentHandler);
      }
    }
  },
  methods: {
    clickDocumentHandler() {
      if (this.show) {
        this.$emit("update:show", false);
      }else{
        this.$emit("update:show", true);
      }
    },
    
  }
};
</script>
<style lang="less" scoped>
.context-menu {
  // z-index: 99999;
  // display: block;
  // background: #fff;
  // border: 1px solid #a5a5a5;
  // box-shadow: 2px 2px 2px 0 rgba(0, 0, 0, 0.2);
  // padding: 4px 2px;
  // line-height: 1em;
  position: fixed;
  // min-width: 160px;
}
</style>