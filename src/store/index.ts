import {ActionContext} from "@/types/store";
import {createStore} from "vuex";
import modules,{SET_FILELIST,typeModules} from '@/store/modules/index'

const mutations = {
}

const actions = {
  initAll({ dispatch, commit } :ActionContext<State,Getters>){
    commit(SET_FILELIST,configs.getDesktopIcon())
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
  <T extends keyof DispatchFuncs>(type: T, payload?: Parameters<DispatchFuncs[T]>[1]): Promise<any>;
}
const vuexStore=createStore(storeOptions)
interface Commit {
  <T extends keyof CommitFuncs>(type: T, payload?: Parameters<CommitFuncs[T]>[1]): void;
}
// export const { state } = storeOptions;
// export const { getters }: { getters: Getters } = storeOptions;
// export const { commit }: { commit: Commit } = storeOptions;
// export const { dispatch }: { dispatch: Dispatch } = storeOptions;
export interface Store {
  state: State;
  getters: Getters;
  commit: Commit;
  dispatch: Dispatch;
}
export default vuexStore