/*
 * _______________#########_______________________ 
 * ______________############_____________________ 
 * ______________#############____________________ 
 * _____________##__###########___________________ 
 * ____________###__######_#####__________________ 
 * ____________###_#######___####_________________ 
 * ___________###__##########_####________________ 
 * __________####__###########_####_______________ 
 * ________#####___###########__#####_____________ 
 * _______######___###_########___#####___________ 
 * _______#####___###___########___######_________ 
 * ______######___###__###########___######_______ 
 * _____######___####_##############__######______ 
 * ____#######__#####################_#######_____ 
 * ____#######__##############################____ 
 * ___#######__######_#################_#######___ 
 * ___#######__######_######_#########___######___ 
 * ___#######____##__######___######_____######___ 
 * ___#######________######____#####_____#####____ 
 * ____######________#####_____#####_____####_____ 
 * _____#####________####______#####_____###______ 
 * ______#####______;###________###______#________ 
 * ________##_______####________####______________ 
 * @Author: mengdaoshizhongxinyang
 * @Date: 2020-05-14 09:38:18
 * @Description: 
 * @GitHub: https://github.com/mengdaoshizhongxinyang
 */
import { useStore } from '@/store'
import {  RouteRecordRaw } from 'vue-router'

export let asyncRouterMap : Array<RouteRecordRaw>=[
    {
        path: '/',
        name: 'index',
        component:()=>import ('@/views/index'),
        meta:{title:'首页'},
        // beforeEnter:(to,from,next)=>{
        //     const store=useStore()
        //     if(store.getters['getHandlePassword']==configs.password()){
        //         next()
        //     }else{
        //         next({name:'Login'})
        //     }
        // }
    },
    { 
        path: '/login',
        name: 'Login',
        component:()=>import ('@/views/login/login'),
        meta:{title:'login'}
    },
    { 
        path: '/test',
        name: 'Test',
        component:()=>import ('@/views/login/t.vue'),
        meta:{title:'login'}
    },
    { 
        path: '/doubleColorBall',
        name: 'DoubleColorBall',
        component:()=>import ('@/views/letmerich/doubleColorBall'),
        meta:{title:'login'}
    },
    {
        path: '/resume/:key',
        name: 'Resume',
        component:()=>import ('@/views/resume/Resume.vue'),
        meta:{title:'简历'}
    },{ 
        path: '/resume',
        name: 'Resume',
        component:()=>import ('@/views/resume/Resume.vue'),
        meta:{title:'简历'}
    },{
        path: '/article/*',
        name: 'Article',
        component:()=>import ('@/views/article/Article.vue'),
        meta:{title:'简历'}
    },{
        path: '/test/demo1',
        name: 'lengjing',
        component:()=>import ('@/views/threedemo/threedemo1.vue'),
        meta:{title:'three'}
    },{
        path: '/test/demo2',
        name: 'lengjing',
        component:()=>import ('@/views/threedemo/threedemo2.vue'),
        meta:{title:'three'}
    },{
        path: '/test/demo3',
        name: 'lengjing',
        component:()=>import ('@/views/threedemo/threedemo3.vue'),
        meta:{title:'three'}
    }
]