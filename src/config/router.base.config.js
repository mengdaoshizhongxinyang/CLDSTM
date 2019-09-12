// import FooView from '@/layouts/FooView.vue'
 const baseRouterMap = [
  {
    path: '/',
    redirect: 'index'
  },
  {
    path: '/index',
    name: 'Index',
    component: () => import('@/views/index.vue'),
    meata: { title: '首页' }
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('@/views/search.vue'),
    meata: { title: '搜索' }
  },
]
export default baseRouterMap