import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './mock'
import 'ant-design-vue/dist/antd.css' 
import Directives from '@/utils/directives.js';
import Storage from 'vue-ls';
 
let options = {
  namespace: 'vuejs__', // key prefix
  name: 'ls', // name variable Vue.[ls] or this.[$ls],
  storage: 'local', // storage name session, local, memory
};
Vue.use(Storage, options);
import Vuex, { Store } from 'vuex'
Vue.use(Vuex)
import store from "./store";
let storeOption=new Store(store)
Vue.use(Directives)
Vue.config.productionTip = false
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
  Icon,
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
  carousel,
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
Vue.use(carousel)
Vue.use(message)
Vue.use(Input)
Vue.use(InputNumber)
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
Vue.use(Icon)
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
Vue.use(notification)

new Vue({
  router,
  store:storeOption,
  render: h => h(App),
  created(){
    this.$store.dispatch('initAll')
  }
}).$mount('#app')
