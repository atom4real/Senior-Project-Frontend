import { createApp } from 'vue'
import './style.css'
import router from './router'
import store from './store'
import App from './App.vue'
import axios from 'axios'
import VeeValidate from 'vee-validate';

axios.defaults.baseURL = "http://175.41.168.88:8000"
// axios.defaults.baseURL = import.meta.env.VITE_API_URL

// const app = createApp(App)
// app.use(router).use(axios).mount('#app') // .provide('store', store)
createApp(App).use(router, axios, VeeValidate).use(store).mount('#app')

