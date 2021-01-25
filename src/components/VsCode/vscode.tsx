/*
 * @Author: mengdaoshizhongxinyang
 * @Date: 2021-01-20 10:30:12
 * @Description: 
 * @GitHub: https://github.com/mengdaoshizhongxinyang
 */
import { defineComponent, PropType, reactive,ref,h } from "vue";
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
  emits:{
    change:(val:string)=>{},
    input:(val:string)=>{},
  },
  setup(props,{attrs,emit}){
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
        root.value!,
        data.editorOptions
      );
      // 编辑器内容发生改变时触发
      data.monacoEditor.onDidChangeModelContent(() => {
        emit("change", data.monacoEditor.getValue());
        emit("input", data.monacoEditor.getValue());
      });
    }
    const getVal=()=>{
      return data.monacoEditor.getValue();
    }
    const handleResize=(w:number, h:number) =>{
      data.height = h - 32;
      data.width = w;
    }
    const selectLeftBar=(selecedBarName:string)=> {
      data.active = selecedBarName;
    }
    return ()=>h(
      <AppFrame onResize={handleResize} scrollY={false} {...attrs} ref={root}>
        <div class="vsbody">
          <div class="composite-bar">
            <div class="action-bar">
              <div
                class="`action-bar-item ${active=='files'?'action-bar-item-active':''}`"
                onClick={(e)=>selectLeftBar('files')}
              >
                <a-icon type="snippets"></a-icon>
              </div>
            </div>
          </div>
          <div class="split-view-view">
            <div class="view-handle"></div>
          </div>
          <div ref="container" class="monaco-editor" style={`height:${data.height}px;width:${data.width}px`}></div>
        </div>
      </AppFrame>
    )
  }
})