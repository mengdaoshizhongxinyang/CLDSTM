import { MutationTree, ActionTree, GetterTree, Module } from 'vuex'
import { RootState } from '@/store'
import Vue from "vue";
export const FOLDER_STATUS_INIT = 'FOLDER_STATUS_INIT'
export const FOLDER_STATUS_UPDATE = 'FOLDER_STATUS_UPDATE'
/** @typedef {typeof state} FolderState */
const state = {
  folderStatus:{}
}

/** @type MutationTree<FolderState> */
const mutations = {
  [FOLDER_STATUS_INIT](state,status){
    state.folderStatus=status
  },
  [FOLDER_STATUS_UPDATE](state,status){
    if(status.y && status.y>document.body.scrollHeight){
      status.y=0
    }
    if(status.x && status.x>document.body.scrollWidth){
      status.x=0
    }
    Object.assign(state.folderStatus,status)
    Vue.ls.set('folderStatus',state.folderStatus)
  }
}

/** @type ActionTree<FolderState, RootState> */
const actions = {
  initFolderStatus({commit}){
    let lsStatus=Vue.ls.get('folderStatus')
    let status=Object.assign({x:0,y:0,w:200,h:200},lsStatus)
    commit(FOLDER_STATUS_INIT,status)
  },
  updateFolderStatus({commit},data){
    commit(FOLDER_STATUS_UPDATE,data)
  }
}

/** @type GetterTree<FolderState, RootState> */
const getters = {
  folderStatus(state){
    return state.folderStatus
  }
}

/** @type Module<FolderState, RootState> */
const vuexModule = {
  state,
  mutations,
  actions,
  getters
}

export default vuexModule