import { ReturnGetters, Store, ActionContext } from '@/types/store';
import { ws } from "@/utils/localstorage/index";

export const FOLDER_STATUS_INIT = 'FOLDER_STATUS_INIT'
export const FOLDER_STATUS_UPDATE = 'FOLDER_STATUS_UPDATE'
/** @typedef {typeof state} FolderState */
const state = {
  folderStatus:{}
}
type State=typeof state
/** @type MutationTree<FolderState> */
const mutations = {
  [FOLDER_STATUS_INIT](state :State,status:any){
    state.folderStatus=status
  },
  [FOLDER_STATUS_UPDATE](state :State,status:any){
    if(status.y && status.y>document.body.scrollHeight){
      status.y=0
    }
    if(status.x && status.x>document.body.scrollWidth){
      status.x=0
    }
    Object.assign(state.folderStatus,status)
    ws().set('folderStatus',state.folderStatus)
  }
}


const actions = {
  initFolderStatus({commit}: ActionContext<State, Getters>){
    let lsStatus=ws().get('folderStatus')
    let status=Object.assign({x:0,y:0,w:200,h:200},lsStatus)
    commit(FOLDER_STATUS_INIT,status)
  },
  updateFolderStatus({commit}:ActionContext<State, Getters>,data :any){
    commit(FOLDER_STATUS_UPDATE,data)
  }
}


const getters = {
  getFolderStatus(state: State){
    return state.folderStatus
  }
}
type Getters = ReturnGetters<typeof getters>;

const vuexModule = {
  state,
  mutations,
  actions,
  getters
}

export default vuexModule