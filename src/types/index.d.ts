/*
 * @Author: mengdaoshizhongxinyang
 * @Date: 2020-12-28 11:33:23
 * @Description: 
 * @GitHub: https://github.com/mengdaoshizhongxinyang
 */
import { Store } from '@/store'
import { App, AppRun } from "./gather";
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store
  }
}
interface fileType {
  [key: string]: {
    type?: string
    name?: string
    icon?: string
    position?: string
    children?: fileType
    [key: string]: any
  }
}
export {
  App,
  AppRun,
  fileType
}