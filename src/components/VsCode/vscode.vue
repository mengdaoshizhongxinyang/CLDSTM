<template>
  <Frame @resize="handleResize" :scrollY="false" v-bind="$attrs">
    <div class="vsbody">
      <div class="composite-bar">
        <div class="action-bar">
          <div
            :class="`action-bar-item ${active=='files'?'action-bar-item-active':''}`"
            @click="selectLeftBar('files')"
          >
            <a-icon type="snippets"></a-icon>
          </div>
        </div>
      </div>
      <div class="split-view-view">
        <div class="view-handle"></div>
      </div>
      <div ref="container" class="monaco-editor" :style="`height:${height}px;width:${width}px`"></div>
    </div>
  </Frame>
</template>

<script>
import * as monaco from "monaco-editor";
import Frame from "@/components/Frame";

export default {
  name: "Monaco",
  components: {
    Frame
  },
  props: {
    monacoOptions: {
      type: Object,
      default: () => {
        return {
          value: "", // 编辑器的值
          theme: "vs", // 编辑器主题：vs, hc-black, or vs-dark，更多选择详见官网
          roundedSelection: false, // 右侧不显示编辑器预览框
          language: "javascript",
          autoIndent: true, // 自动缩进
          automaticLayout: true
        };
      }
    }
  },
  mounted() {
    this.init();
  },
  data() {
    return {
      monacoEditor: null,
      height: 168,
      width: 246,
      active: ""
    };
  },
  methods: {
    init() {
      // 初始化container的内容，销毁之前生成的编辑器
      this.$refs.container.innerHTML = "";

      this.editorOptions = this.monacoOptions;
      // 生成编辑器对象
      this.monacoEditor = monaco.editor.create(
        this.$refs.container,
        this.editorOptions
      );
      // 编辑器内容发生改变时触发
      this.monacoEditor.onDidChangeModelContent(() => {
        this.$emit("change", this.monacoEditor.getValue());
        this.$emit("input", this.monacoEditor.getValue());
      });
    },
    // 供父组件调用手动获取值
    getVal() {
      return this.monacoEditor.getValue();
    },
    handleResize(w, h) {
      this.height = h - 32;
      this.width = w;
    },
    selectLeftBar(selecedBarName) {
      this.active = selecedBarName;
    }
  }
};
</script>

<style lang="less" scoped>
.vsbody {
  display: flex;
  width: 100%;
  height: 100%;
  .composite-bar {
    width: 48px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: rgba(51, 51, 51, 0.85);
    color: rgba(255, 255, 255, 0.4);
    .action-bar {
      font-size: 24px;
      .action-bar-item {
        width: 48px;
        height: 48px;
        margin-bottom: 4px;
        text-align: center;
        line-height: 48px;
        cursor: pointer;
      }
      .action-bar-item-active {
        border-left: 1px solid #fff;
        color: #fff;
      }
    }
  }
  .split-view-view {
    background-color: rgb(37, 37, 38);
    outline-color: rgba(83, 89, 93, 0.5);
    position: relative;
    min-width: 170px;
    .view-handle {
      cursor: e-resize;
      position: absolute;
      top: 0;
      width: 4px;
      height: 100%;
    }
  }
}
</style>
