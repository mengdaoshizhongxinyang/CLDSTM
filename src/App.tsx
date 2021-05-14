import { defineComponent, h, reactive } from "vue";
import zhCN from "ant-design-vue/es/locale/zh_CN";
import EasterEggs from "@/components/EasterEggs";
import { ConfigProvider } from "ant-design-vue";
import "./App.less";
export default defineComponent({
  setup(){
    return ()=>h(
      <ConfigProvider locale={zhCN}>
        <div id="nav"onContextmenu={(e)=>{e.preventDefault()}}>
          <EasterEggs></EasterEggs>
          <div id="cont">
            <router-view></router-view>
          </div>
        </div>
      </ConfigProvider>
    )
  }
})