import {ActionContext} from "@/types/store";
import {createStore,Store as VuexStore} from "vuex";
import modules,{SET_FILELIST,typeModules,SET_BATCH_RUNING_APPS} from '@/store/modules/index'
import { ws } from "@/utils/localstorage";

const mutations = {
}

const actions = {
  initAll({ dispatch, commit,rootGetters } :ActionContext<State,Getters>){
    commit(SET_FILELIST,configs.getDesktopIcon())
    let initTask=ws().get<AppTask[]>('apps',[])?.map(item=>{
      return {type:item.apps,name:item.name,icon:item.icon,contents:item.contents} as AppStart
    })
    commit(SET_BATCH_RUNING_APPS,initTask)
    dispatch('initFolderStatus')
    // commit(MERGE_APPS,)
  }
}

const modulesGetters = {
}
const storeOptions = {
  modules,
  mutations,
  actions,
  getters:modulesGetters
};
type State = (
  typeModules['state']
)

// 将 getter 函数转换成 {getterName: getterFuncsReturnType} 的对象类型
export type ReturnGetters<T extends { [key: string]: (...args: any) => any }> = {
  [P in keyof T]: ReturnType<T[P]>;
}
type GettersFuncs = (
  typeModules['getters']
)
type Getters = ReturnGetters<GettersFuncs>

type CommitFuncs = (
  typeModules['commit']
)
type DispatchFuncs = (
  typeModules['dispatch']
  & typeof actions
)

interface Dispatch {
  <T extends keyof DispatchFuncs>(type: T, payload?: Parameters<DispatchFuncs[T]>[1]): DispatchFuncs[T];
}
const vuexStore=createStore(storeOptions)
interface Commit {
  <T extends keyof CommitFuncs>(type: T, payload?: Parameters<CommitFuncs[T]>[1]): CommitFuncs[T];
}
// export const { state } = storeOptions;
// export const { getters }: { getters: Getters } = storeOptions;
// export const { commit }: { commit: Commit } = storeOptions;
// export const { dispatch }: { dispatch: Dispatch } = storeOptions;
export type Store=Omit<VuexStore<State>,'getters'|'commit'|'dispatch'|'state'>&{
  state: State;
  getters: Getters;
  commit: Commit;
  dispatch: Dispatch;
}
export function useStore() {
  return vuexStore as Store
}
export default vuexStore