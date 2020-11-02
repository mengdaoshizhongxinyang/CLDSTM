
import { ReturnGetters, Store, ActionContext } from '@/types/store';
const SET_LANGUAGE = 'SET_LANGUAGE'
/** @typedef {typeof state} LanguageState */

const state = {
  language:{
    cn:{
      desktop:{
        contextMenu:{
          refresh:"刷新",
          create:"新建",
          createFile:"文件夹",
          personalise: "个性化"
        }
      }
    },
    en:{
      desktop:{
        contextMenu:{
          refresh:"refresh",
          create:"create",
          createFile:"new folder",
          personalise: "personalise"
        }
      }
    }
  },
  languageOptions:[{key:"cn",value:"中文"},{key:"en",value:"English"}],
  languageSelected:"cn"
}
type State = typeof state

/** @type MutationTree<LanguageState> */
const mutations = {
  [SET_LANGUAGE](state:State,setting:string){
    state.languageSelected=setting
  }
}

/** @type ActionTree<LanguageState, RootState> */
const actions = {
  setLanguage({commit}:ActionContext<State, Getters>,selectedOption:any){
    commit('SET_LANGUAGE',selectedOption)
  }
}

/** @type GetterTree<LanguageState, RootState> */
const getters = {

}
type Getters = ReturnGetters<typeof getters>;
/** @type Module<LanguageState, RootState> */
const vuexModule = {
  state,
  mutations,
  actions,
  getters
}

export default vuexModule