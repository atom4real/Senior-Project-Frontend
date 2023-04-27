<template>
  <NavBarVue />
  <router-view />
  <hr>
  <FooterVue />
</template>

<script>
import axios from 'axios'
import AuthService from '@/services/AuthService.js'
import Home from '@/views/Home.vue'
import NavBarVue from '@/components/NavBarVue.vue'
import FooterVue from '@/components/Footer.vue'

export default {
  name: 'App',
  components: {NavBarVue, FooterVue},
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