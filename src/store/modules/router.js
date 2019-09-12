import { StoreOptions, MutationTree, ActionTree, GetterTree } from 'vuex'

export const SET_ROUTER_MAP = 'SET_ROUTER_MAP'

/** @typedef {typeof state} RouterState */
const state = {
  routerMap: []
}

/** @type MutationTree<RouterState> */
const mutations = {
  [SET_ROUTER_MAP](state, { routerMap }) {
    state.routerMap = routerMap
  }
}

/** @type ActionTree<RouterState> */
const actions = {}

/** @type GetterTree<RouterState> */
const getters = {
  routerMap(state) {
    return state.routerMap
  }
}

/** @type StoreOptions<RouterState> */
const storeOptions = {
  state: state,
  mutations,
  actions,
  getters
}
export default storeOptions
