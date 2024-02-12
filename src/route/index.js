import {createRouter ,createWebHashHistory} from 'vue-router'

import loginVue from 'page/login/login.vue'
import indexVue from 'page/index/index.vue'

import adminVue from 'page/account/admin.vue'
import userVue from 'page/account/user.vue'

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
                path: 'account/admin',
                component: adminVue
            },
            {
                path: 'account/user',
                component: userVue
            }
        ]
    }
]

const router = createRouter({
    history : createWebHashHistory(),
    routes : routes
})

export default router