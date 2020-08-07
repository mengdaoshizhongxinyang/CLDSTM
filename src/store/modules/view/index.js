import { Module } from 'vuex'
import { RootState } from '@/store'

export * from './desktop'
import desktop from './desktop'
/** @type Module<RootState> */
const view = {
  modules: {
    desktop
  }
}

export default view
