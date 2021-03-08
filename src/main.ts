import {createApp} from 'vue'
import App from './App'
// import Icon from '@ant-design/icons-vue';
import router from './router'
import './mock'
import 'ant-design-vue/dist/antd.css' 
import Directives from '@/utils/Directives';
import Storage from '@/utils/localstorage';
import { Store } from "@/types/store";
let options = {
  namespace: 'vuejs__', // key prefix
  name: 'ls', // name variable Vue.[ls] or this.[$ls],
  storage: 'local', // storage name session, local, memory
};
const Vue=createApp(App).use(Storage,options).use(router);

// Vue.use
import store from './store/index';
Vue.use(store)
Vue.use(Directives)
// Vue.config.productionTip = false
import {
  LocaleProvider,
  Layout,
  Input,
  InputNumber,
  Button,
  Switch,
  Radio,
  Checkbox,
  Select,
  Card,
  Form,
  Row,
  Col,
  Modal,
  Table,
  Tabs,
  // Icon,
  Badge,
  Popover,
  Dropdown,
  List,
  Avatar,
  Breadcrumb,
  Steps,
  Spin,
  Menu,
  Drawer,
  Tooltip,
  Alert,
  Tag,
  Divider,
  DatePicker,
  TimePicker,
  Upload,
  Progress,
  Skeleton,
  Popconfirm,
  Carousel,
  message,
  notification,
  TreeSelect,
  ConfigProvider
} from 'ant-design-vue'
// import VueCropper from 'vue-cropper'

Vue.use(LocaleProvider)
Vue.use(ConfigProvider)
Vue.use(TreeSelect)
Vue.use(Layout)
Vue.use(Carousel)

Vue.use(Input)
// Vue.use(InputNumber)
Vue.use(Button)
Vue.use(Switch)
Vue.use(Radio)
Vue.use(Checkbox)
Vue.use(Select)
Vue.use(Card)
Vue.use(Form)
Vue.use(Row)
Vue.use(Col)
Vue.use(Modal)
Vue.use(Table)
Vue.use(Tabs)
// Vue.use(Icon)
Vue.use(Badge)
Vue.use(Popover)
Vue.use(Dropdown)
Vue.use(List)
Vue.use(Avatar)
Vue.use(Breadcrumb)
Vue.use(Steps)
Vue.use(Spin)
Vue.use(Menu)
Vue.use(Drawer)
Vue.use(Tooltip)
Vue.use(Alert)
Vue.use(Tag)
Vue.use(Divider)
Vue.use(DatePicker)
Vue.use(TimePicker)
Vue.use(Upload)
Vue.use(Progress)
Vue.use(Skeleton)
Vue.use(Popconfirm)
// Vue.use(VueCropper)
// app.config.globalProperties.$message = message;
Vue.config.globalProperties.$confirm = Modal.confirm
Vue.config.globalProperties.$message = message
Vue.config.globalProperties.$notification = notification
Vue.config.globalProperties.$info = Modal.info
Vue.config.globalProperties.$success = Modal.success
Vue.config.globalProperties.$error = Modal.error
Vue.config.globalProperties.$warning = Modal.warning
// const app=new Vue({
//   router,
//   store:store,
//   render: h => h(App)
// }).$mount('#app')

// Vue.config.globalProperties.$tstore = Vue.config.globalProperties.$store
Vue.config.globalProperties.$aemit = (that: any, mutationName: string, ...params: any) => {
  if (!mutationName) throw new Error('$aemit need mutationName param');
  return new Promise((resolve, reject) => {
    that.$emit(mutationName, ...params, {
      success: resolve,
      fail: reject,
    });
  });
};
Vue.mount('#app')


// declare module 'vue/types/vue' {
//   interface Vue {
//     $aemit:<T>(that: any, mutationName: string, ...params: any) => Promise<T>;
//   }
// }
