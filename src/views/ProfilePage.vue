<template>
    <div 
        class="w-full h-full bg-no-repeat bg-cover bg-center bf-fixed" 
        :style="{'background-image': 'linear-gradient(0deg, rgba(35, 58, 80, 0.87), rgba(35, 58, 80, 0.87)), url(src/assets/img/bg-masthead.jpg)'}">
        <div class="font-sans font-bold pt-72 pb-3 text-5xl text-white">Profile</div>
        <div class="inline-flex justify-center items-center w-full">
            <hr class="my-6 w-4/5 h-1 bg-blue-700 border-0">
        </div>
        <div class="font-extrabold text-2xl leading-10 text-white mb-20 pb-20 flex justify-center">
            <div class="card w-96 bg-base-100 shadow-xl">
                <figure >
                    <div class="p-10 w-50">
                        <img v-if="this.$store.state.role === 'admin'" :src="'http://175.41.168.88:8000/Photos/admin.png'" alt="img" />
                        <img v-if="this.$store.state.role === 'customer'" :src="'http://175.41.168.88:8000/Photos/customer.png'" alt="img" />
                    </div>
                </figure>
                <div class="card-body py-10">
                    <p class="text-center text-xl">Name: {{ this.$store.state.name }}</p>
                    <p class="text-center text-xl">Email: {{ this.$store.state.email }}</p>
                    <p class="text-center text-xl">Permission: {{ this.$store.state.role }}</p>
                    <!-- <div class="card-actions justify-end">
                        <button class="btn btn-primary">Buy Now</button>
                    </div> -->
                </div>
            </div>
        </div>

    </div>
    </template>
<script>
import axios from 'axios';
export default {
    name: 'ContentPage',
    data() {
        return {
            contents: []
        }
    },
    mounted() {
        this.refeshData()
    },
    methods: {
        refeshData() {
            axios.get('/api/user')
            .then(response => {
                this.contents=response.data;
                console.log(response.data)
            })
        },
    }
}
</script>
    