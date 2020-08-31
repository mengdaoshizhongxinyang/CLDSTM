import { Module } from 'vuex'
import { RootState } from '@/store'

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

export default view
