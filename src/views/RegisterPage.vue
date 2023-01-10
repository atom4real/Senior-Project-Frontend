<template>
    <div>
        <h1>Sign Up</h1>
        <form @submit.prevent="submitForm">
            <input type="name" username="name" v-model="name">
            <input type="email" name="email" v-model="email">
            <input type="password" name="password" v-model="password">
            <button type="submit">Sign Up</button>
        </form>
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
        }
    },
    methods: {
        submitForm(e) {
            const formData = {
                name: this.name,
                email: this.email,
                password: this.password,
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
