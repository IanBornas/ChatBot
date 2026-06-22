import {createRouter, createWebHistory} from 'vue-router'

import HomeView from '../pages/HomePage.vue'
import AboutView from '../pages/AboutPage.vue'
import SearchChat from '../pages/SearchChat.vue'
import Settings from '../pages/Settings.vue'
import History from '../pages/History.vue'

const routes = [
    {
        path:'/',
        name:'home',
        component: HomeView
    },
    {
        path:'/about',
        name:'about',
        component: AboutView
    },
    {
        path:'/search-history',
        name:'search-history',
        component: SearchChat
    },
    {
        path:'/history',
        name:'history',
        component: History
    },
    {
        path:'/settings',
        name:'settings',
        component: Settings
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})


export default router
