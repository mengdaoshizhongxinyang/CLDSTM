
export * from './core'
import core,{coreModule} from './core'

export * from './view'
import view,{viewModule} from './view'

export * from './service'
import service from './service'

const modules = {
  core,
  view,
  service
}
export interface typeModules{
  state:{
    view:viewModule['state']
    core:coreModule['state']
  }
  dispatch:(
    viewModule['dispatch']
    & coreModule['dispatch']
  )
  commit:(
    viewModule['commit']
    & coreModule['commit']
  )
  getters:(
    viewModule['getters']
    & coreModule['getters']
  )
}
export default modules
