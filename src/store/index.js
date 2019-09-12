import { StoreOptions, MutationTree, ActionTree, GetterTree } from 'vuex'

import router, { SET_ROUTER_MAP } from '@/store/modules/router'
import baseRouterMap from '@/config/router.base.config'

export const VUE_USE_PLUGIN = 'VUE_USE_PLUGIN'

/** @typedef {typeof state} AppState */
const state = {
}

/** @type MutationTree<AppState> */
const mutations = {
  [VUE_USE_PLUGIN](_, { vueInstance, plugin, args = [] }) {
    vueInstance.use(plugin, ...args)
  }
}

/** @type ActionTree<AppState> */
const actions = {
  async usePlugin({ commit }, { vueInstance }) {
    let pluginList = await Promise.all([
      import('ant-design-vue'),
      import('@/helper/axios'),
      import('vue-ls').then(mod => ({
        ...mod, args: [{
          namespace: 'sc__',
          name: 'ls',
          storage: 'local'
        }]
      }))
    ])
    pluginList.forEach(({ default: plugin, args }) => {
      commit(VUE_USE_PLUGIN, { vueInstance, plugin, args })
    })
  },
  async initializerState({ commit }) {
    commit(SET_ROUTER_MAP, { routerMap: baseRouterMap })
  }
}

/** @type GetterTree<AppState> */
const getters = {
}

/** @type StoreOptions<AppState> */
const storeOptions = {
  modules: {
    router
  },
  state: state,
  mutations,
  actions,
  getters
}
export default storeOptions
