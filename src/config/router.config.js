export const asyncRouterMap=[
    {
        path: '/',
        name: 'index',
        component:()=>import ('@/views/index.vue'),
        meta:{title:'首页'}
    }
]