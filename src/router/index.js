import {createRouter, createWebHistory} from "vue-router";
import Home from '../views/Home.vue'
import Data from '../views/Data'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/Data',
        name: "Data",
        component: Data
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
