
import { ReturnGetters, Store, ActionContext } from '@/types/store';
const SET_SETTINGS = 'SET_SETTINGS'
/** @typedef {typeof state} SettingState */

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
    ],
    none:[]
  }
}
type State = typeof state

/** @type MutationTree<SettingState> */
const mutations = {
  
}

/** @type ActionTree<SettingState, RootState> */
const actions = {

}

/** @type GetterTree<SettingState, RootState> */
const getters = {

}
type Getters = ReturnGetters<typeof getters>;
/** @type Module<SettingState, RootState> */
const vuexModule = {
  state,
  mutations,
  actions,
  getters
}

export default vuexModule