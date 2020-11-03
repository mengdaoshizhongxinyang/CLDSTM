
import { ReturnGetters, Store, ActionContext } from '@/types/store';
const SET_LANGUAGE = 'SET_LANGUAGE'
/** @typedef {typeof state} LanguageState */

const state = {
  languageOptions: {
    cn: {
      name: "中文",
      abbreviation: "cn",
      desktop: {
        contextMenu: {
          refresh: "刷新",
          create: "新建",
          createFolder: "文件夹",
          personalise: "个性化"
        }
      }
    },
    en: {
      name: "English",
      abbreviation: "en",
      desktop: {
        contextMenu: {
          refresh: "Refresh",
          create: "New",
          createFolder: "Folder",
          personalise: "Personalize"
        }
      }
    },
  },
  languageSelected: {
    name: "中文",
    abbreviation: "cn",
    desktop: {
      contextMenu: {
        refresh: "刷新",
        create: "新建",
        createFolder: "文件夹",
        personalise: "个性化"
      }
    }
  }
}
type State = typeof state

/** @type MutationTree<LanguageState> */
const mutations = {
  [SET_LANGUAGE](state: State, setting: any) {
    state.languageSelected = setting
  }
}

/** @type ActionTree<LanguageState, RootState> */
const actions = {
  setLanguage({ commit }: ActionContext<State, Getters>, selectedOption: any) {
    commit('SET_LANGUAGE', selectedOption)
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