// import Router from 'vue-router'
import { asyncRouterMap } from '@/config/router.config'
import { createRouter, createWebHashHistory } from 'vue-router'
export default createRouter({
  // mode: 'hash',
  history: createWebHashHistory(),
  // scrollBehavior: () => ({ y: 0 }),
  routes:asyncRouterMap
})
