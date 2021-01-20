/*
 * @Author: mengdaoshizhongxinyang
 * @Date: 2021-01-20 10:30:12
 * @Description: 
 * @GitHub: https://github.com/mengdaoshizhongxinyang
 */
import { defineComponent, PropType, reactive,ref } from "vue";
import { AppFrame } from "@/components";
import {editor} from "monaco-editor"
import * as monaco from "monaco-editor"
export default defineComponent({
  name: "Monaco",
  components: {
    AppFrame
  },
  props: {
    monacoOptions: {
      type: Object as PropType<editor.IStandaloneEditorConstructionOptions>,
      default: {
        value: "", // 编辑器的值
        theme: "vs", // 编辑器主题：vs, hc-black, or vs-dark，更多选择详见官网
        roundedSelection: false, // 右侧不显示编辑器预览框
        language: "javascript",
        autoIndent: true, // 自动缩进
        automaticLayout: true
      }
    }
  },
  setup(props){
    const data=reactive({
      monacoEditor: {} as editor.IStandaloneCodeEditor,
      height: 168,
      width: 246,
      active: "",
      editorOptions:{} as editor.IStandaloneEditorConstructionOptions
    })
    const root=ref<HTMLDivElement>();
    const init=()=>{
      // 初始化container的内容，销毁之前生成的编辑器
      root.value!.innerHTML = "";

      data.editorOptions = props.monacoOptions;
      // 生成编辑器对象
      data.monacoEditor = monaco.editor.create(
        this.$refs.container,
        this.editorOptions
      );
      // 编辑器内容发生改变时触发
      this.monacoEditor.onDidChangeModelContent(() => {
        this.$emit("change", this.monacoEditor.getValue());
        this.$emit("input", this.monacoEditor.getValue());
      });
    }
  }
})