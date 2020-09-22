import { Store } from "../../index";

export * from './desktop'
import desktop from './desktop'
export * from './folder'
import folder from "./folder";
/** @type Module<RootState> */
const view = {
  modules: {
    folder,
    desktop
  }
}
export interface viewModule {
  state: {
    desktop:typeof desktop.state
    folder:typeof folder.state
  }
  getters:(
    typeof desktop.getters
    & typeof folder.getters
  )
  commit:(
    typeof desktop.mutations
    & typeof folder.mutations
  )
  dispatch:(
    typeof desktop.actions
    & typeof folder.actions
  )
}
export default view
