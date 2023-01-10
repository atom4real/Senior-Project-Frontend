import { createApp } from 'vue'
import './style.css'
import router from './router'
import store from './store'
import App from './App.vue'
import axios from 'axios'
import VeeValidate from 'vee-validate';

axios.defaults.baseURL = "http://127.0.0.1:8000","http://localhost:8000"

// const app = createApp(App)
// app.use(router).use(axios).mount('#app') // .provide('store', store)
createApp(App).use(router, axios, VeeValidate).use(store).mount('#app')

