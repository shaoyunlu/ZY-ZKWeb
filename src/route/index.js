import {createRouter ,createWebHashHistory} from 'vue-router'

/**
 * zk
 */
import frameUserVue from 'page/frame/user/index.vue'

import loginVue from 'page/login/login.vue'
import indexVue from 'page/index/index.vue'

import adminVue from 'page/account/admin.vue'
import userVue from 'page/account/user.vue'

import systemVue from 'page/base/system.vue'
import carouselVue from 'page/base/carousel.vue'

import newsVue from 'page/news/index.vue'

const routes = [
    {
        path: '/login',
        component: loginVue
    },

    { 
        path : '/',
        component : indexVue,
        children : [
            {
                path : 'frame/user',
                component : frameUserVue
            },
            {
                path: 'account/admin',
                component: adminVue
            },
            {
                path: 'account/user',
                component: userVue
            },
            {
                path: 'base/system',
                component: systemVue
            },
            {
                path: 'base/carousel',
                component: carouselVue
            },
            {
                path: 'news',
                component: newsVue
            }
        ]
    }
]

const router = createRouter({
    history : createWebHashHistory(),
    routes : routes
})

export default router