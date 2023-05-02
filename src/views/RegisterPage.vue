<template>
    <!-- <div class="">
        <h1>Sign Up</h1>
        <form @submit.prevent="submitForm">
            <div class="py-3">
                <input type="name" username="name" v-model="name">
            </div>
            <div class="py-3">
                <input type="email" name="email" v-model="email">
            </div>
            <div class="py-3">
                <input type="password" name="password" v-model="password">
            </div>
            <div class="py-3">
                <input type="role" name="role" v-model="role">
            </div>
            <button type="submit">Sign Up</button>
        </form>
    </div> -->

    <!-- <div v-if="this.$store.state.role === 'admin' && this.$store.state.isAuthenticated"> -->
    <div class="max-w-xl w-full lg:max-w-full lg:flex justify-center mt-32">
        <div class="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t px-16 lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
            <div class="mb-8">
                <div class="text-gray-900 font-bold text-xl mb-2">Sign in</div>
                <form @submit.prevent="submitForm">
                    <div class="py-1">
                        <input type="text" username="name" v-model="name" placeholder="username">
                    </div>
                    <div class="py-1">
                        <input type="email" name="email" v-model="email" placeholder="example@email.com">
                    </div>
                    <div class="py-1">
                        <input type="password" name="password" v-model="password" placeholder="password">
                    </div>
                    <div class="py-1">
                        <input type="text" name="role" v-model="role" placeholder="role">
                    </div>
                    <div class="pt-3">
                        <div class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            <button type="submit">Sign Up</button>
                        </div>
                    </div>
                </form>
            </div>        
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'RegisterPage',
    data() {
        return {
            name: '',
            email: '',
            password: '',
            role: '',
        }
    },
    methods: {
        submitForm(e) {
            const formData = {
                name: this.name,
                email: this.email,
                password: this.password,
                role: this.role,
            }
            axios
            .post('/api/register', formData)
            .then(response => {
                this.$router.push('/login')
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
        }
    }
}
</script>
