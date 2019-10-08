export const asyncRouterMap=[
    {
        path: '/index',
        name: 'index',
        component:()=>import ('@/views/index.vue'),
        meta:{title:'首页'}
    },
    {
        path: '/',
        name: 'code',
        component:()=>import ('@/views/code.vue'),
        meta:{title:'首页'}
    }
]