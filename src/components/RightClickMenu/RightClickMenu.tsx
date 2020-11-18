
//{/* <script lang="ts"> */}

import SubContext from "./SubContext";
import { defineComponent,h } from "vue";
import "./contextMenu.less"
export default defineComponent({
  name: "right-click-menu",
  components: {
    SubContext,
  },
  data() {
    return {
      style: {},
    };
  },
  setup(){

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
    handleSetPosition(style) {
      this.style = style;
    },
    handleClick(menu) {
      this.$emit("update:show", false);
      this.$emit("menuItemClick", menu);
    },
  },
  render() {
    let  {show,menus,offset,handleSetPosition,handleClick}=this
    const scopedSlots=this.$slots
    return (
      <div
        class="context-menu"
        v-show={show}
        style={`left:${offset.left}px;top:${offset.top}px`}
        onMousemove={(event : MouseEvent)=>{ event.stopPropagation()}}
      >
        <SubContext menus={menus} show={show} onSetPosition={handleSetPosition} onMenuItemClick={handleClick} scopedSlots={{...scopedSlots}}>
        </SubContext>
      </div>
    );
  },
});
//</script>