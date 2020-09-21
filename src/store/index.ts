import {ActionContext} from "@/types/store";
import Vuex from "vuex";
import Vue from "vue";
import modules,{SET_FILELIST} from '@/store/modules/index'
Vue.use(Vuex);

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
const storeOptions = new Vuex.Store<State>({
  modules,
  mutations,
  actions,
  getters:modulesGetters
});

export default storeOptions
interface State {
  view:typeof modules.view.modules
}
// 将 getter 函数转换成 {getterName: getterFuncsReturnType} 的对象类型
export type ReturnGetters<T extends { [key: string]: (...args: any) => any }> = {
  [P in keyof T]: ReturnType<T[P]>;
}
type GettersFuncs = (
  typeof modules.view.modules.desktop.getters
  & typeof modules.view.modules.folder.getters
)
type Getters = ReturnGetters<GettersFuncs>

type CommitFuncs = (
  typeof modules.view.modules.desktop.mutations
  & typeof modules.view.modules.folder.mutations
)
type DispatchFuncs = (
  typeof modules.view.modules.desktop.actions
  & typeof modules.view.modules.folder.actions
  & typeof actions
)

interface Dispatch {
  <T extends keyof DispatchFuncs>(type: T, payload?: Parameters<DispatchFuncs[T]>[1]): Promise<any>;
}

interface Commit {
  <T extends keyof CommitFuncs>(type: T, payload?: Parameters<CommitFuncs[T]>[1]): void;
}
export const { state } = storeOptions;
export const { getters }: { getters: Getters } = storeOptions;
export const { commit }: { commit: Commit } = storeOptions;
export const { dispatch }: { dispatch: Dispatch } = storeOptions;

export interface Store {
  state: State;
  getters: Getters;
  commit: Commit;
  dispatch: Dispatch;
}