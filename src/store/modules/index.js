import { ModuleTree } from 'vuex'
import { RootState } from '@/store'

export * from './core'
import core from './core'

export * from './view'
import view from './view'

export * from '@/store/modules/service'
import service from '@/store/modules/service'


/** @type ModuleTree<RootState> */
const modules = {
  core,
  view,
  service
}

export default modules
