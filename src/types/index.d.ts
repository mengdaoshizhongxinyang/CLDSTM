/*
 * @Author: mengdaoshizhongxinyang
 * @Date: 2020-12-28 11:33:23
 * @Description: 
 * @GitHub: https://github.com/mengdaoshizhongxinyang
 */
import { Store } from '@/store'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store
  }
}