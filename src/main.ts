import {createApp} from 'vue'
import App from './App'
// import Icon from '@ant-design/icons-vue';
import router from './router'

import 'ant-design-vue/dist/antd.css' 
import Directives from '@/utils/Directives';
import Storage from '@/utils/localstorage';
import { Store } from "@/types/store";
let options = {
  namespace: 'vuejs__', // key prefix
  name: 'ls', // name variable Vue.[ls] or this.[$ls],
  storage: 'local', // storage name session, local, memory
};
import "@/utils/keyboard"
const Vue=createApp(App)
Vue.use(Storage,options)
Vue.use(router);

import store from './store/index';
Vue.use(store)
Vue.use(Directives)
// Vue.config.globalProperties.$aemit = (that: any, mutationName: string, ...params: any) => {
//   if (!mutationName) throw new Error('$aemit need mutationName param');
//   return new Promise((resolve, reject) => {
//     that.$emit(mutationName, ...params, {
//       success: resolve,
//       fail: reject,
//     });
//   });
// };
Vue.mount('#app')

