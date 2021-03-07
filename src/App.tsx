import { defineComponent, h } from "vue";
import zhCN from "ant-design-vue/es/locale/zh_CN";
import "./App.less";
export default defineComponent({
  setup(){
    const handleKeyDown=(e: KeyboardEvent)=>{
      e.preventDefault();
    }
    // document.onkeydown=handleKeyDown
    return ()=>h(
      <a-config-provider locale={zhCN}>
        <div id="nav"onContextmenu={(e)=>{e.preventDefault()}}>
          <router-view></router-view>
        </div>
      </a-config-provider>
    )
  }
})