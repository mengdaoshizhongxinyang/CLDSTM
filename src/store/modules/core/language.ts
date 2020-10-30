
import { ReturnGetters, Store, ActionContext } from '@/types/store';
const SET_POSITION = 'SET_POSITION'
/** @typedef {typeof state} LanguageState */

const state = {

}
type State = typeof state

/** @type MutationTree<LanguageState> */
const mutations = {

}

/** @type ActionTree<LanguageState, RootState> */
const actions = {

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