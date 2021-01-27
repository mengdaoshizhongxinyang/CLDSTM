/*
 * @Author: mengdaoshizhongxinyang
 * @Date: 2021-01-20 10:30:12
 * @Description: 
 * @GitHub: https://github.com/mengdaoshizhongxinyang
 */
import { defineComponent, PropType, reactive,ref,h, onMounted } from "vue";
import { AppFrame,IconManage } from "@/components";
import {editor} from "monaco-editor"
import * as monaco from "monaco-editor"
import style from "./vscode.module.less";
const data=reactive({
  monacoEditor: {} as editor.IStandaloneCodeEditor,
  height: 168,
  width: 246,
  splitWidth:170,
  isShowSplit:1 as 1 | 0,
  active: "",
  editorOptions:{} as editor.IStandaloneEditorConstructionOptions
})
export default defineComponent({
  name: "Monaco",
  components: {
    AppFrame,
    IconManage
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
    const container=ref<HTMLDivElement>();
    const init=()=>{
      // 初始化container的内容，销毁之前生成的编辑器
      container.value!.innerHTML = "";

      data.editorOptions = props.monacoOptions;
      // 生成编辑器对象
      data.monacoEditor = monaco.editor.create(
        container.value!,
        data.editorOptions
      );
      // 编辑器内容发生改变时触发
      data.monacoEditor.onDidChangeModelContent(() => {
        emit("change", data.monacoEditor.getValue());
        emit("input", data.monacoEditor.getValue());
      });
    }
    const handleResize=(w:number, h:number) =>{
      data.height = h - 32;
      data.width = w;
    }
    const selectLeftBar=(selecedBarName:string)=> {
      data.active = selecedBarName;
    }
    onMounted(()=>{
      init()
    })
    return ()=>h(
      <AppFrame onResize={handleResize} scrollY={false} {...attrs} minWidth={246}>
        <div class={style["vsbody"]}>
          <div class={style["composite-bar"]}>
            <div class={style["action-bar"]}>
              <div
                class={[style["action-bar-item"],data.active=='files'?style['action-bar-item-active']:'']}
                onClick={()=>selectLeftBar('files')}
              >
                <IconManage icon="SnippetsOutlined"></IconManage>
              </div>
            </div>
          </div>
          <div class={style["split-view-view"]} style={`width:${data.splitWidth}px`}>
            <div class={style["view-handle"]}></div>
          </div>
          <div ref={container} class={style["monaco-editor"]} style={`height:${data.height}px;width:${data.width-data.splitWidth-48}px`}></div>
        </div>
      </AppFrame>
    )
  }
})
export const getVal=()=>{
  return data.monacoEditor.getValue();
}