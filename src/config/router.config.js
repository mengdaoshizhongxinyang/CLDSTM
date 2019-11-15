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
        component:()=>import ('@/views/test2.vue'),
        meta:{title:'首页'}
    },
    {
        path: '/test',
        name: 'test',
        component:()=>import ('@/views/test1.vue'),
        meta:{title:'首页'}
    }
]