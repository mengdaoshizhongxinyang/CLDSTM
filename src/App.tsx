import { defineComponent, h, reactive } from "vue";
import zhCN from "ant-design-vue/es/locale/zh_CN";

import "./App.less";
export default defineComponent({
  setup(){
    return ()=>h(
      <a-config-provider locale={zhCN}>
        <div id="nav"onContextmenu={(e)=>{e.preventDefault()}}>
          <div id="cont">
            <router-view></router-view>
          </div>
        </div>
      </a-config-provider>
    )
  }
})