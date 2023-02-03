import { createRouter, createWebHistory } from 'vue-router'
import Store from '@/store'
import Home from '@/views/Home.vue'
import About from '@/components/About.vue'
import Contents from '@/components/Contents.vue'
import Login from '@/views/LoginPage.vue'
import Register from '@/views/RegisterPage.vue'
import ContentPage from '@/views/ContentPage.vue'
import ContentDetailPage from '@/views/ContentDetailPage.vue'
import CreateContents from '@/views/CreateContents.vue'
import ProfilePage from '@/views/ProfilePage.vue'
import GPSTrackingPage from '@/views/GPSTrackingPage.vue'
import AuthService from '@/services/AuthService.js';
import axios from 'axios'

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
    {
        path: '/content-list',
        name: 'ContentPage',
        component: ContentPage,
    },
    {
        path: '/content-list/:id',
        name: 'ContentDetailPage',
        component: ContentDetailPage,
        props: true,
    },
    {
        path: '/create-content',
        name: 'CreateContents',
        component: CreateContents
    },
    {
        path: '/profile',
        name: 'ProfilePage',
        component: ProfilePage
    },
    {
        path: '/gpstracking',
        name: 'GPSTrackingPage',
        component: GPSTrackingPage
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router