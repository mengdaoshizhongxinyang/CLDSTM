import properties from "./properties";
export * from './properties'
import language from "./language";
export * from './language'
const view = {
  modules: {
    properties,
    language
  }
}
export interface coreModule{
  state:{
    properties:typeof properties.state
    language:typeof properties.state
  },
  commit:(
    typeof properties.mutations
    & typeof language.mutations
  ),
  dispatch:(
    typeof properties.actions
    & typeof language.actions
  ),
  getters:(
    typeof properties.getters
    & typeof language.getters
  )
}
export default view
