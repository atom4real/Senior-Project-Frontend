import { createStore } from 'vuex'
export default createStore({
    state: {
        token: '',
        role: '',
        name: '',
        email: '',
        content: [],
        isAuthenticated: false
    },
    mutations: {
        initializeStore(state) {
            if (localStorage.getItem('token')) {
                state.token = localStorage.getItem('token')
                state.name = localStorage.getItem('name')
                state.role = localStorage.getItem('role')
                state.email = localStorage.getItem('email')
                state.isAuthenticated = true
            }
            else {
                state.token = ''
                state.isAuthenticated = false
            }
        },
        setToken(state, token) {
            state.token = token
            state.isAuthenticated = true
        },
        setRole(state, role) {
            state.role = role
            state.isAuthenticated = true
        },
        setName(state, name) {
            state.name = name
            state.isAuthenticated = true
        },
        setEmail(state, email) {
            state.email = email
            state.isAuthenticated = true
        },
        setContent(state, content) {
            state.content = content
            state.isAuthenticated = true
        },
        removeToken(state) {
            state.token = ''
            state.isAuthenticated = false
        }
    },
    getters: {
        getRole(state) {
            return state.role
        },
    },
    actions: {
    },
    modules: {
    }
})