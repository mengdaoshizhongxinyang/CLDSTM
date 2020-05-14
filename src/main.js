import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue'
import './mock'
import 'ant-design-vue/dist/antd.css'
import Directives from '@/utils/directives.js';
import store from "./store";
Vue.use(Directives)
Vue.config.productionTip = false
Vue.use(Antd)
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
