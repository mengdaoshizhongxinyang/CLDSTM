import { MutationTree, ActionTree, GetterTree, Module } from 'vuex'
import { RootState } from '@/store'

export const SET_RUNING_APPS = 'SET_RUNING_APPS'
export const CLOSE_RUNING_APPS = 'CLOSE_RUNING_APPS'
export const ACTIVE_RUNING_APPS = 'ACTIVE_RUNING_APPS'
export const SET_FILELIST = 'SET_FILELIST'
export const CREATE_FILE = 'CREATE_FILE'
export const MERGE_APPS = 'MERGE_APPS'
export const MINIMIZE_APPS = 'MINIMIZE_APPS'
export const SET_FILETYPES = 'SET_FILETYPES'
/** @typedef {typeof state} DesktopState */
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
    fileList:{},
    fileTypes:{}
}

/** @type MutationTree<DesktopState> */
const mutations = {
    [SET_FILELIST](state,item){
        state.fileList=item
    },
    [SET_RUNING_APPS](state, item) {
        state.desktopApps.apps.push({
            apps: state.apps[item.type],
            ...item,
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
    [CREATE_FILE](state,{type,path,name,icon,other}){
        let i=1;
        let tempName=name
        let nameArray=Object.keys(state.fileList)
        while(nameArray.indexOf(tempName)>-1){
            tempName+=(++i).toString()
        }
        let fileTree=state.fileList
        let pathArray=path.split('/')
        pathArray.forEach(item=>{
            if(item){
                fileTree=fileTree[item]
            }
        })
        console.log(1)
        fileTree[name]={type,name,path,icon,...other}
        state.fileList=Object.assign({},state.fileList)
        state.fileList=JSON.parse(JSON.stringify(state.fileList))
    },
    [MERGE_APPS](state,apps={}){
        state.apps=Object.assign(state.apps,apps)
    },
    [SET_FILETYPES](state,types={}){
        state.fileTypes=types
    }
}

/** @type ActionTree<DesktopState, RootState> */
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
    createFile({commit},{path,type,name}){
        commit(CREATE_FILE,{path,type,name,icon:'folder',other:{children:{}}})
    },
    
    ...configs.actions
}

/** @type GetterTree<DesktopState, RootState> */
const getters = {
    desktopApps(state) {
        return state.desktopApps
    },
    fileList(state){
        return state.fileList
    },
    getAppInfo(state){
        return (id)=>{
            return state.desktopApps.apps[id] || {name:""}
        }
    }
}

/** @type Module<DesktopState, RootState> */
const vuexModule = {
    state,
    mutations,
    actions,
    getters
}

export default vuexModule