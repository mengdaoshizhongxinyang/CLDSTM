import properties from "./properties";
export * from './properties';
import setting from "./setting";
export * from './setting';
import language from "./language";
export * from './language';
const view = {
  modules: {
    properties,
    language,
    setting
  }
}
export interface coreModule{
  state:{
    properties:typeof properties.state
    language:typeof language.state
    setting:typeof setting.state
  },
  commit:(
    typeof properties.mutations
    & typeof language.mutations
    & typeof setting.mutations
  ),
  dispatch:(
    typeof properties.actions
    & typeof language.actions
    & typeof setting.actions
  ),
  getters:(
    typeof properties.getters
    & typeof language.getters
    & typeof setting.getters
  )
}
export default view
