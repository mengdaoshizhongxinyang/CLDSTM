<template>
  <Frame @resize="handleResize" :scrollY="false">
    <div ref="container" class="monaco-editor" :style="`height:${height}px;width:${width}px`"></div>
  </Frame>
</template>

<script>
import * as monaco from "monaco-editor";
import { Frame } from "@/components/Frame";
export default {
  name: "Monaco",
  components:{
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
      height:168,
      width:246
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
    handleResize(w,h){
      this.height = h-32;
      this.width=w
    }
  }
};
</script>