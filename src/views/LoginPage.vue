<template>
<div class="bg-no-repeat bg-cover bg-center relative" :style="{'background-image': 'linear-gradient(0deg, rgba(35, 58, 80, 0.87), rgba(35, 58, 80, 0.87)), url(src/assets/img/bg-login.jpg)'}"><div class="absolute bg-gradient-to-b opacity-75 inset-0 z-0"></div>
  <div class="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
      <div class="flex justify-center self-center  z-10">
        <form @submit.prevent="submitForm">
          <div class="p-12 bg-white mx-auto rounded-2xl w-100 ">
            <div class="mb-4">
              <h3 class="font-semibold text-2xl text-gray-800">Login</h3>
              <p class="text-gray-500">Please login to your account.</p>
            </div>
            <div class="space-y-5">
                        <div class="space-y-2">
                              <label class="text-sm font-medium text-gray-700 tracking-wide">Email</label>
              <input class=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400" type="email" name="email" v-model="email" placeholder="mail@gmail.com" @blur="validate('email')" @keypress="validate('email')">
              </div>
                          <div class="space-y-2">
              <label class="mb-5 text-sm font-medium text-gray-700 tracking-wide">
                Password
              </label>
              <input class="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400" type="password" name="password" v-model="password" placeholder="Enter your password" @blur="validate('password')" @keypress="validate('password')">
            </div>
            <div>
              <button type="submit" class="w-full flex justify-center bg-blue-700  hover:bg-white text-white hover:text-black p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500">
                Login
              </button>
            </div>
            </div>
            
          </div>
        </form>
      </div>
  </div>
</div>
</template>


<script>
import axios from 'axios';
import * as yup from 'yup';

export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',

    }
  },
  methods: {
    submitForm(e) {
      axios.defaults.headers.common['Authorization'] = ''
      localStorage.removeItem('token')
      
        const formData = {
          email: this.email,
          password: this.password,

        }
        axios
        .post('/api/login', formData)
        .then(response => {
            const token = response.data.jwt
            this.$store.commit('setToken', token)

            console.log(response)
            axios.defaults.headers.common['Authorization'] = 'JWT' + token
            localStorage.setItem("token", token)
            this.$router.push('/')
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
