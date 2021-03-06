import properties from "./properties";
// export * from './properties';
import setting from "./setting";
// export * from './setting';
import language from "./language";
// export * from './language';

import user from "./user";
const view = {
  modules: {
    properties,
    language,
    setting,
    user
  }
}
export interface coreModule{
  state:{
    properties:typeof properties.state
    language:typeof language.state
    setting:typeof setting.state
    user:typeof user.state
  },
  commit:(
    typeof properties.mutations
    & typeof language.mutations
    & typeof setting.mutations
    & typeof user.mutations
  ),
  dispatch:(
    typeof properties.actions
    & typeof language.actions
    & typeof setting.actions
    & typeof user.actions
  ),
  getters:(
    typeof properties.getters
    & typeof language.getters
    & typeof setting.getters
    & typeof user.getters
  )
}
export default view
