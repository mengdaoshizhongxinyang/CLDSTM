
//{/* <script lang="ts"> */}

import SubContext from "./SubContext";
import { defineComponent,DefineComponent, watch, computed, ref, nextTick, reactive } from "vue";
import "./contextMenu.less"
interface thisProps{
  offset?:{left:Number,top:Number},
  show?:Boolean,
  menu?:typeMenu
}
interface typeMenu {
  label?: string,
  name?: string,
  children?: Array<typeMenu>,
  show?: Boolean,
  function?:Function
}
const rightClickMenu= defineComponent({
  name: "right-click-menu",
  components: {
    SubContext,
  },
  setup(p,{emit,attrs,slots}){
    let data=reactive({style:{}})
    let props=p as thisProps
    return {style:data.style}
  },
  props: {
    offset: {
      type: Object,
      default: function () {
        return {
          left: 0,
          top: 0,
        };
      },
    },
    show: Boolean,
    menus: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  // data(){
  //   return{
  //     style:{}
  //   }
  // },
  watch: {
    show(show :Boolean) {
      if (show) {
        // this.$nextTick(this.setPosition)
        document.body.addEventListener("mousedown", this.clickDocumentHandler);
      } else {
        document.body.removeEventListener(
          "mousedown",
          this.clickDocumentHandler
        );
      }
    },
  },
  methods: {
    clickDocumentHandler() {
      if (this.show) {
        this.$emit("update:show", false);
      } else {
        this.$emit("update:show", true);
      }
    },
    handleClick(menu:typeMenu) {
      this.$emit("update:show", false);
      this.$emit("menuItemClick", menu);
    },
  },
  render() {
    let  {show,menus,offset,handleClick}=this
    const scopedSlots=this.$slots
    return (
      <div
        class="context-menu"
        v-show={show}
        style={`left:${offset.left}px;top:${offset.top}px`}
        onMousemove={(event : MouseEvent)=>{ event.stopPropagation()}}
      >
        <sub-context menus={menus} show={show} onMenuItemClick={handleClick} v-slots={{...scopedSlots}}>
        </sub-context>
      </div>
    );
  },
});
//</script>
export default rightClickMenu