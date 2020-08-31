import { MutationTree, ActionTree, GetterTree, Module } from 'vuex'
import { RootState } from '@/store'

export const SET_RUNING_APPS = 'SET_RUNING_APPS'
export const CLOSE_RUNING_APPS = 'CLOSE_RUNING_APPS'
export const ACTIVE_RUNING_APPS = 'ACTIVE_RUNING_APPS'
export const SET_FILELIST = 'SET_FILELIST'
export const CREATE_ICON = 'CREATE_ICON'
export const MERGE_APPS = 'MERGE_APPS'
export const MINIMIZE_APPS = 'MINIMIZE_APPS'
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
        'folder': 'Folder',
        'vscode':'vscode'
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
            name:item.name,
            icon:item.icon,
            mini:false,
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
    [MINIMIZE_APPS](state,index){
        state.desktopApps.apps[index].mini=!state.desktopApps.apps[index].mini
    },
    [CREATE_ICON](state,list){
        console.log(list)
        let lists=list.split('/')
        console.log(lists)
        console.log(1)
    },
    [MERGE_APPS](state,apps={}){
        state.apps=Object.assign(state.apps,apps)
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
    minimizeApps({commit},index){
        commit(MINIMIZE_APPS,index)
    },
    updateApps({commit},data){
        commit(CLOSE_RUNING_APPS,data)
    },
    activeApps({commit},index){
        commit(ACTIVE_RUNING_APPS,index)
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
    },
    getAppInfo(state){
        return (id)=>{
            console.log(state.desktopApps.apps[id])
            return state.desktopApps.apps[id] || {name:""}
        }
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