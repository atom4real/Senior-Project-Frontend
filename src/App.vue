<template>
  <NavBar />
  <router-view />
</template>

<script>
import axios from 'axios'
import AuthService from '@/services/AuthService.js'
import Home from '@/views/Home.vue'
import NavBar from '@/components/NavBar.vue'

export default {
  name: 'App',
  components: {NavBar},
  beforeCreate() {
    this.$store.commit('initializeStore')
    const token = this.$store.state.token
    if(token) {
      axios.defaults.headers.common['Authorization'] = "JWT " + token
    } else {
      axios.defaults.headers.common['Authorization'] = ''
    }
  },
  methods: {
    logout() {
      AuthService.logout()
      this.$router.go()
    },
  }
}
</script>