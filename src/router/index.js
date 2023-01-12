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
        props: true,
        children: [
            {
                path: '/content-list/:id',
                name: 'ContentDetailPage',
                component: ContentDetailPage,
                beforeEnter: (to) => {
                    console.log(to.params.id)
                    axios.get('/content/' + to.params.id)
                    .then((response) => {
                        Store.this.state.content = response.data
                      })
                },
                props: true,
            }
        ]
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
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router