
import { ReturnGetters, Store, ActionContext } from '@/types/store';
const SET_SETTINGS = 'SET_SETTINGS'
import { SubModuleName } from "@/components/Setting/SubModule";
import { IconList } from '@/types';
export type Setting={name?:string,icon:IconList,desc?:string,component?:SubModuleName,title?:string}
export type Settings={[key in SubModuleName]:Setting[]}
const state = {
  settings:{
    LanguageSetting:[
      { name: "语言", icon: "FontColorsOutlined", component: "LanguageModule" }
    ],
    Main:[
      { icon: "HighlightOutlined", title: "个性化", desc: "颜色，背景",component:'PersonaliseSetting' },
      { icon: "GlobalOutlined", title: "语言设置", desc: "语言",component:'LanguageSetting' },
      { icon: "exclamation-circle", title: "待定", desc: "待定" },
      { icon: "exclamation-circle", title: "待定", desc: "待定" },
      { icon: "exclamation-circle", title: "待定", desc: "待定" },
      { icon: "exclamation-circle", title: "待定", desc: "待定" },
      { icon: "exclamation-circle", title: "待定", desc: "待定" }
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