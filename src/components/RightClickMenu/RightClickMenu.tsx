
//{/* <script lang="ts"> */}

import SubContext from "./SubContext";
import { defineComponent, watch, computed, ref, nextTick, reactive, PropType, h } from "vue";
import "./contextMenu.less"
import { typeMenu } from "./type";
export default defineComponent({
  props: {
    offset: {
      type: Object as PropType<{ left: number, top: number }>,
      default: {
        left: 0,
        top: 0,
      }
    },
    show: {
      type: Boolean,
      default: false
    },
    menus: {
      type: Array as PropType<typeMenu[]>,
      default: []
    }
  },
  setup(props, { emit, slots }) {
    const data = reactive({ style: {} })
    const clickDocumentHandler = () => {
      if (props.show) {
        emit("update:show", false);
      } else {
        emit("update:show", true);
      }
    }
    const handleClick = (e:MouseEvent,menu: typeMenu) => {
      emit("update:show", false);
      emit("menuItemClick", menu);
    }
    watch(() => props.show, (show: Boolean) => {
      if (show) {
        // this.$nextTick(this.setPosition)
        document.body.addEventListener("mousedown", clickDocumentHandler);
      } else {
        document.body.removeEventListener(
          "mousedown",
          clickDocumentHandler
        );
      }
    })
    return () => h(
      <div
        class="context-menu"
        v-show={props.show}
        style={`left:${props.offset.left}px;top:${props.offset.top}px`}
        onMousemove={(event) => { event.stopPropagation() }}
      >
        <SubContext menus={props.menus} show={props.show} onMenuItemClick={handleClick} v-slots={{ ...slots }}>
        </SubContext>
      </div>
    )
  },
  components: {
    SubContext,
  }

});
//</script>