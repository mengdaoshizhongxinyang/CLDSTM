<template>
  <frame-window
    v-on="$listeners"
    v-bind="$attrs"
    :allowEnlarge="false"
    :allowMinimize="false"
    :resizable="false"
    :initialW="360"
    :initialH="600"
    :initialX="position.x"
    :initialY="position.y"
  >
    <div class="main">
      <div class="tab">
        <div
          :class="`tab-item ${index == active ? 'tab-active' : ''}`"
          v-for="(tab, index) in tabs"
          :key="tab"
          @click="handleChangeActive(index)"
        >
          {{ tab }}
        </div>
      </div>
      <div class="content"></div>
      <div class="properties-button-group">
        <button>确定</button>
        <button>取消</button>
        <button>应用</button>
      </div>
    </div>
  </frame-window>
</template>

<script>
import FrameWindow from "@/components/Frame";
import { mapState } from "vuex";
export default {
  created() {
    this.name = this.attributes.name;
  },
  components: {
    FrameWindow,
  },
  computed: {
    ...mapState({
      /** @returns {Object} */
      position(state) {
        return {
          x: state.core.properties.clickPositionX,
          y: state.core.properties.clickPositionY,
        };
      },
    }),
  },
  props: {
    attributes: {
      type: Object,
      default: () => {
        return { name: "" };
      },
    },
  },
  data() {
    return {
      name: "",
      tabs: ["常规", "详细"],
      active: 0,
    };
  },
  methods: {
    handleChangeActive(index) {
      this.active = index;
    },
  },
};
</script>

<style lang="less" scoped>
::v-deep(.header) {
  background: #fff;
}
.main {
  background: #e1e1e1;
  height: 100%;
  padding: 8px;

  .tab {
    display: flex;
    // border-bottom: 1px solid rgba(0,0,0,0.2);
    cursor: default;
    height: 2em;
    align-items: flex-end;
    .tab-item {
      min-width: 3.5em;
      border: 1px solid rgba(0, 0, 0, 0.2);
      border-bottom: 0px solid rgb(255, 255, 255);
      color: #000;
      padding: 0 4px;
      margin-right: -1px;
      &:hover {
        background: rgba(131, 195, 255, 0.2);
      }
      height: 1.7em;
    }
    .tab-active {
      background: #fff;
      padding-bottom: 12px;
      border-bottom: 1px solid rgb(255, 255, 255);
      height: 2em;
      &:hover {
        background: #fff;
      }
    }
  }
  .content {
    height: 470px;
    background: #fff;
    margin-top: -1px;
    margin-bottom: 16px;
    border: 1px solid rgba(0, 0, 0, 0.2);
  }
  .properties-button-group {
    display: flex;
    justify-content: flex-end;
    button {
      margin-left: 8px;
      width: 5.5em;
      padding: 6px 0;
      line-height: 1em;
      border-radius: 0px;
      border: 1px solid rgba(0, 0, 0, 0.6);
      &:focus {
        border: 2px solid rgba(4, 0, 255, 0.849);
        border-radius: 0;
        padding: 5px 0;
        outline: none;
      }
    }
  }
}
</style>