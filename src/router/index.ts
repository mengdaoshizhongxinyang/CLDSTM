// import Router from 'vue-router'
import { asyncRouterMap } from '@/config/router.config'
import { createRouter, createWebHistory } from 'vue-router'
export default createRouter({
  // mode: 'hash',
  history: createWebHistory(process.env.BASE_URL),
  // scrollBehavior: () => ({ y: 0 }),
  routes:asyncRouterMap
})
