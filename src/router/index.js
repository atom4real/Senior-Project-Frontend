import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/components/About.vue'
import Contents from '@/components/Contents.vue'
import Login from '@/views/LoginPage.vue'
import Register from '@/views/RegisterPage.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        props: true,
        children: [
            {
                path: 'about',
                name: 'About',
                component: About,
                props: true
            },
            {
                path: 'contents',
                name: 'Contents',
                component: Contents,
                props: true
            }
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router