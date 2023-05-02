<template>
<div class="navbar bg-base-100" data-theme="winter">
  <div class="navbar-start" data-theme="winter">
    <div class="dropdown" data-theme="winter">
      <label tabindex="0" class="btn btn-ghost btn-circle" data-theme="winter">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-theme="winter"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
      </label>
      <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52" data-theme="winter">
        <li data-theme="winter"><router-link :to="{ name: 'Home' }">Home</router-link></li>
        <li data-theme="winter"><router-link :to="{ name: 'Home' }">About us</router-link></li>
        <li data-theme="winter"><router-link :to="{ name: 'ContentPage' }">View contents</router-link></li>
        <!-- <li data-theme="winter"><router-link :to="{ name: 'Register' }">Register</router-link></li> -->
      </ul>
    </div>
  </div>
  <div class="navbar-center" data-theme="winter">
    <a class="btn btn-ghost normal-case text-xl" data-theme="winter"><router-link :to="{ name: 'Home' }"><img src="http://54.169.123.14:8000/Photos/logo.png" class="h-12" alt="logo"/></router-link></a>
  </div>
  <div class="navbar-end" data-theme="winter">
    <!-- <button class="btn btn-ghost btn-circle" data-theme="winter">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" data-theme="winter" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
    </button> -->
    <div class="dropdown dropdown-end" data-theme="winter">
      <label tabindex="0" class="btn btn-ghost btn-circle avatar" data-theme="winter">
        <div class="w-10 rounded-full">
          <img v-if="this.$store.state.role === 'admin'" :src="'http://54.169.123.14:8000/Photos/admin.png'" alt="img" />
          <img v-if="this.$store.state.role === 'customer'" :src="'http://54.169.123.14:8000/Photos/customer.png'" alt="img" />
          <img v-else src="http://54.169.123.14:8000/Photos/anonymous.png" data-theme="winter" alt="img"/>
        </div>
      </label>
      <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52" data-theme="winter">
        <li data-theme="winter" v-if="this.$store.state.token">
          <a class="justify-between" data-theme="winter">
            <router-link  :to="{ name: 'ProfilePage' }">Profile</router-link>
            <span class="badge" data-theme="winter">New</span>
          </a>
        </li>
        <!-- <li data-theme="winter"><a>Settings</a></li> -->
        <li data-theme="winter" v-if="this.$store.state.role === 'admin' && this.$store.state.token"><router-link :to="{ name: 'CreateContents' }">Create content</router-link></li>
        <li data-theme="winter" v-if="this.$store.state.role === 'admin' && this.$store.state.token"><router-link :to="{ name: 'GPSTrackingPage' }">GPS Tracking</router-link></li>
        <li data-theme="winter"><router-link :to="{ name: 'GPSCustomerTrackingPage' }">GPS Tracking</router-link></li>
        <li data-theme="winter" v-if="!this.$store.state.token"><router-link :to="{ name: 'Login' }">Login</router-link></li>
        <li data-theme="winter" v-if="this.$store.state.token"><a @click="logout">Logout</a></li>
      </ul>
    </div>
  </div>
</div>

</template>
<script>
import AuthService from '@/services/AuthService.js'
export default {
  name: 'NavBar',
  methods: {
    logout() {
      AuthService.logout()
      this.$router.go()
    },
  }
}
</script>