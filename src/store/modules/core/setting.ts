
import { ReturnGetters, Store, ActionContext } from '@/types/store';
const SET_SETTINGS = 'SET_SETTINGS'
import { Settings } from "@/types/setting";
const state = {
  settings:{
    Language:[
      { name: "语言", icon: "FontColorsOutlined", component: "LanguageModule" }
    ],
    Main:[
      { icon: "HighlightOutlined", title: "个性化", desc: "颜色，背景",component:'Personalise' },
      { icon: "GlobalOutlined", title: "语言设置", desc: "语言",component:'Language' },
      // { icon: "exclamation-circle", title: "待定", desc: "待定" },
      // { icon: "exclamation-circle", title: "待定", desc: "待定" },
      // { icon: "exclamation-circle", title: "待定", desc: "待定" },
      // { icon: "exclamation-circle", title: "待定", desc: "待定" },
      // { icon: "exclamation-circle", title: "待定", desc: "待定" }
    ],
    Personalise:[
      {icon:"HighlightOutlined",component:"PersonaliseSetting"}
    ]
    
  } as Settings
}
type State = typeof state

const mutations = {
  
}

const actions = {

}

const getters = {

}
type Getters = ReturnGetters<typeof getters>;

const vuexModule = {
  state,
  mutations,
  actions,
  getters
}

export default vuexModule