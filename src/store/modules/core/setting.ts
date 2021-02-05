
import { ReturnGetters, Store, ActionContext } from '@/types/store';
const SET_SETTINGS = 'SET_SETTINGS'

const state = {
  settings:{
    LanguageSetting:[
      { name: "语言", icon: "font-colors", component: "LanguageModule" }
    ],
    Main:[
      { icon: "highlight", title: "个性化", desc: "颜色，背景",component:'PersonaliseSetting' },
      { icon: "global", title: "语言设置", desc: "语言",component:'LanguageSetting' },
      { icon: "exclamation-circle", title: "待定", desc: "待定" },
      { icon: "exclamation-circle", title: "待定", desc: "待定" },
      { icon: "exclamation-circle", title: "待定", desc: "待定" },
      { icon: "exclamation-circle", title: "待定", desc: "待定" },
      { icon: "exclamation-circle", title: "待定", desc: "待定" }
    ]
    
  }
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