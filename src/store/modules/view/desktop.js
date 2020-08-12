import { MutationTree, ActionTree, GetterTree, Module } from 'vuex'
import { RootState } from '@/store'

export const SET_RUNING_APPS = 'SET_RUNING_APPS'
export const CLOSE_RUNING_APPS = 'CLOSE_RUNING_APPS'
export const ACTIVE_RUNING_APPS = 'ACTIVE_RUNING_APPS'
/** @typedef {typeof state} TemplateState */
const state = {
    desktopApps: {
        apps: [],
        maxZindex: 0,
        id: 0
    },
    apps: {
        'article': 'ArticleMd',
        'Money': 'Money',
        'folder': 'Folder'
    }
}

/** @type MutationTree<TemplateState> */
const mutations = {
    [SET_RUNING_APPS](state, item) {
        state.desktopApps.apps.push({
            apps: state.apps[item.type],
            binds: item.bind || {},
            id: ++state.desktopApps.id,
            zindex: ++state.desktopApps.maxZindex
        })
    },
    [CLOSE_RUNING_APPS](state, index) {
        state.desktopApps.apps.splice(index,1)
    },
    [ACTIVE_RUNING_APPS](state, index) {
        state.desktopApps.apps[index].zindex=++state.desktopApps.maxZindex
    },
}

/** @type ActionTree<TemplateState, RootState> */
const actions = {
    openApps({ commit }, icon) {
        commit(SET_RUNING_APPS, icon)
    },
    closeApps({commit},index){
        commit(CLOSE_RUNING_APPS,index)
    }
}

/** @type GetterTree<TemplateState, RootState> */
const getters = {
    desktopApps(state) {
        return state.desktopApps
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