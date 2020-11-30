<template>
  <div class="desktop-icon" tabindex="-1">
    <div @dblclick="(e) => openApps(e)" @contextmenu="handleIconMenu">
      <div class="desktop-icon-icon">
        <slot>
          <div class="desktop-icon-icon-default">
            <icon-manage :icon="iconInfo.icon" :iconStyle="iconStyle"></icon-manage>
          </div>
        </slot>
      </div>
      <div class="desktop-icon-text" v-if="type == 'show'">
        {{ iconInfo.name }}
      </div>
    </div>
    <div
      class="desktop-icon-input"
      v-show="type == 'input'"
      ref="input"
      tabindex="1"
      contenteditable="true"
      @keydown="handleKeypress"
      @mousedown.stop
      @blur="changeName"
    >
      {{ tempName }}
    </div>
    <right-click-menu
      :menus="menuList"
      v-model:show="iconShow"
      :offset="iconMenuOffset"
      style="text-align: left"
      @menuItemClick="handleMenuItemClick"
    ></right-click-menu>
  </div>
</template>

<script>
import {IconManage,RightClickMenu} from "@/components";
import { defineComponent, reactive } from "vue";
import { useStore } from 'vuex';
export default defineComponent({
  setup(){
    const data=reactive({
      actived: false,
      type: "show",
      tempName: "",
      iconShow: false,
      iconMenuOffset: {
        left: 0,
        top: 0,
      },
      menuList: [
        { label: "重命名", run: "rename" },
        { label: "属性", run: "attribute" },
      ],
    })
    const store=useStore();

  },
  created() {
    this.tempName = this.iconInfo.name;
  },
  components: {
    IconManage,
    RightClickMenu
  },
  props: {
    iconStyle: {
      type: String,
      default: "outlined"
    },
    iconInfo: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      actived: false,
      type: "show",
      tempName: "",
      iconShow: false,
      iconMenuOffset: {
        left: 0,
        top: 0,
      },
      menuList: [
        { label: "重命名", run: "rename" },
        { label: "属性", run: "attribute" },
      ],
    };
  },
  methods: {
    openApps(e) {
      e.preventDefault();

      this.$emit("openApps");
    },
    handleKeypress(e) {
      if (e.key == "Enter") {
        e.preventDefault();
        // this.changeName();
        this.$refs.input.blur();
      }
    },
    handleMenuItemClick(menu) {
      if (this[menu.run]) {
        this[menu.run](menu);
      }
    },
    rename() {
      this.type = "input";
      this.$nextTick(() => {
        this.$refs.input.focus();
      });
    },
    attribute() {
      const { iconInfo } = this;
      let attribute = {
        type: "attribute",
        icon: iconInfo.icon,
        name: iconInfo.name + " 属性",
        position: iconInfo.position,
        fileName: iconInfo.name,
        apps:'Properties'
      };
      this.$store.dispatch("openApps", attribute);
    },
    changeName() {
      let newName = this.$refs.input.textContent;
      const { iconInfo } = this;
      this.$store.dispatch("renameFile", {
        name: newName,
        oldName: iconInfo.name,
        path: iconInfo.position,
      });
      this.type = "show";
    },
    handleIconMenu(e) {
      this.iconMenuOffset = {
        left: e.x,
        top: e.y,
      };
      let X=e.x,Y=e.y
      let w=document.body.offsetWidth
      let h=document.body.offsetHeight
      while(X+320>=w){
        X-=56
      }
      while(Y+480>=h){
        Y-=88
      }
      this.$store.dispatch('setPosition',{X,Y})
      this.iconShow = true;
    },
  },
});
</script>

<style lang="less" scoped>
@main:~"desktop-icon";
.@{main}{
    color: #fff;
    position: relative;
    width: 74px;
    cursor: pointer;
    // .christmas&-primary:before {
    //     content: '';
    //     display: block;
    //     position: absolute;
    //     top: -6px;
    //     left: 0;
    //     right: 0;
    //     background: url(data:image/png;base64,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) no-repeat 50% 0;
    //     background-size: 64px;
    //     opacity: 1;
    // }
    text-align: center;
    &-icon{
        width:100%;
        height:54px;
        &-default{
          line-height: 1.2em;
          font-size: 42px;
          text-align: center;
        }
    }
    &-text{
      
      text-align: center;
      line-height: 1.2em;

      overflow : hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      word-break: break-all;
      user-select: none;
    }
    &-input{
      color: #000;
      background: #fff;
      min-width: 1px;
      max-width: 100%;
      padding:0 4px;
      width:auto; 
      display:inline-block;
      &:focus{
        outline: none;
      }
    }
    &:hover{
      background: rgba(230, 242, 255,0.15);
    }
    &:focus{
      background: rgba(204, 229, 255,0.35);
    }
}

</style>