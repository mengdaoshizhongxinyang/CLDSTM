import { MutationTree, ActionTree, GetterTree, Module } from 'vuex'
import { RootState } from '@/store'

export const MUTATIONS_KEY1 = 'MUTATIONS_KEY1'

/** @typedef {typeof state} TemplateState */
const state = {
  payloadKey1: ''
}

/** @type MutationTree<TemplateState> */
const mutations = {
  [MUTATIONS_KEY1](state, { payloadKey1 }) {
    state.payloadKey1 = payloadKey1
  }
}

/** @type ActionTree<TemplateState, RootState> */
const actions = {
  async action1({ commit }, { payloadKey1 }) {
    commit(MUTATIONS_KEY1, { payloadKey1 })
  },
}

/** @type GetterTree<TemplateState, RootState> */
const getters = {
  getTemplate(state){
    return state.payloadKey1
  }
}

/** @type Module<TemplateState, RootState> */
const vuexModule = {
  state,
  mutations,
  actions,
  getters
}

export default vuexModule