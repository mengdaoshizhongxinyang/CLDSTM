import { defineComponent, h, reactive } from "vue";
import zhCN from "ant-design-vue/es/locale/zh_CN";
import domtoimage from 'dom-to-image';
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
        {/* <div style={{position:"fixed",left:"0",top:"0"}}>
          <img src={data.src} />
        </div> */}
      </a-config-provider>
    )
  }
})