
export * from './core'
import core from './core'

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
  }
  dispatch:(
    viewModule['dispatch']
  )
  commit:(
    viewModule['commit']
  )
  getters:(
    viewModule['getters']
  )
}
export default modules
