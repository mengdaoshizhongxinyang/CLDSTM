import { MutationTree, ActionTree, GetterTree, Module } from 'vuex'
import { RootState } from '@/store'

export const SET_RUNING_APPS = 'SET_RUNING_APPS'
export const CLOSE_RUNING_APPS = 'CLOSE_RUNING_APPS'
export const ACTIVE_RUNING_APPS = 'ACTIVE_RUNING_APPS'
export const SET_FILELIST = 'SET_FILELIST'
export const CREATE_ICON = 'CREATE_ICON'
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
    },
    fileList:{}
}

/** @type MutationTree<TemplateState> */
const mutations = {
    [SET_FILELIST](state,item){
        state.fileList=item
    },
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
    [CREATE_ICON](state,list){
        console.log(list)
        let lists=list.split('/')
        console.log(lists)
        console.log(1)
    }
}

/** @type ActionTree<TemplateState, RootState> */
const actions = {
    openApps({ commit }, icon) {
        commit(SET_RUNING_APPS, icon)
    },
    closeApps({commit},index){
        commit(CLOSE_RUNING_APPS,index)
    },
    createIcon({commit},index){
        commit(CREATE_ICON,index)
    },
    ...configs.actions
}

/** @type GetterTree<TemplateState, RootState> */
const getters = {
    desktopApps(state) {
        return state.desktopApps
    },
    fileList(state){
        return state.fileList
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