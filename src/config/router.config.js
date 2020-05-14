export const asyncRouterMap=[
    {
        path: '/',
        name: 'index',
        component:()=>import ('@/views/index.vue'),
        meta:{title:'首页'}
    },
    {
        path: '/test',
        name: 'test',
        component:()=>import ('@/views/test1.vue'),
        meta:{title:'首页'}
    }
]