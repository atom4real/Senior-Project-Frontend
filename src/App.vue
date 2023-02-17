<template>
  <NavBar />
  <router-view />
  <hr>
  <Footer />
</template>

<script>
import axios from 'axios'
import AuthService from '@/services/AuthService.js'
import Home from '@/views/Home.vue'
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'App',
  components: {NavBar, Footer},
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