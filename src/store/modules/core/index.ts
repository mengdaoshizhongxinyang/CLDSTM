import properties from "./properties";
export * from './properties'
const view = {
  modules: {
    properties
  }
}
export interface coreModule{
  state:{
    properties:typeof properties.state
  },
  commit:(
    typeof properties.mutations
  ),
  dispatch:(
    typeof properties.actions
  ),
  getters:(
    typeof properties.getters
  )
}
export default view
