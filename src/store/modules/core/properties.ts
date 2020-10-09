
import { ReturnGetters, Store, ActionContext } from '@/types/store';
const SET_POSITION = 'SET_POSITION'
/** @typedef {typeof state} PropertiesState */

const state = {
  clickPositionX: 0,
  clickPositionY: 0
}
type State = typeof state

/** @type MutationTree<PropertiesState> */
const mutations = {
  [SET_POSITION](state: State, position: { X: number, Y: number }) {
    state.clickPositionX = position.X
    state.clickPositionY = position.Y
  }
}

/** @type ActionTree<PropertiesState, RootState> */
const actions = {
  setPosition({ commit }: ActionContext<State, Getters>, position: { X: number, Y: number }) {
    commit(SET_POSITION, position);
  }
}

/** @type GetterTree<PropertiesState, RootState> */
const getters = {

}
type Getters = ReturnGetters<typeof getters>;
/** @type Module<PropertiesState, RootState> */
const vuexModule = {
  state,
  mutations,
  actions,
  getters
}

export default vuexModule