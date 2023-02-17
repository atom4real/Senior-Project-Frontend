<template>
<div 
    class="w-full h-full bg-no-repeat bg-cover bg-center bf-fixed" 
    :style="{'background-image': 'linear-gradient(0deg, rgba(35, 58, 80, 0.87), rgba(35, 58, 80, 0.87)), url(src/assets/img/bg-masthead.jpg)'}">
    <div class="font-sans font-bold pt-72 pb-3 text-5xl text-white">Sriwichai Logistic <br>Limited Partnership</div>
    <div class="inline-flex justify-center items-center w-full">
        <hr class="my-6 w-4/5 h-1 bg-blue-700 border-0">
    </div>
    <div class="font-extrabold text-2xl leading-10 text-white mb-20">SINCE 2012</div>
    <div @click="scrollMeTo('contents')" class="mb-80 btn bg-white hover:bg-blue-700 text-black hover:text-white font-bold py-2 px-4 border border-white hover:border-white " :style="{'border-radius': '30px'}">
        READ MORE
    </div>
</div>
<div ref="contents">
    <Contents></Contents>
</div>
<div>
    <About></About>
</div>
</template>
<script>
import axios from 'axios';
import About from '@/components/About.vue';
import Contents from '@/components/Contents.vue';

export default {
    name: 'Home',
    components: {
    About,
    Contents
  },
    data() {
        return {
            user_data: ''
        }
    },
    mounted() {
        // this.getMe()
    },
    methods: {
        getMe(e) {
            axios
                .get("/api/user")
                .then(response => {
                    console.log(response)
                    this.user_data = response.data.email
                    
                })
                .catch(error => {
                    console.log(error)
                })
        },
        scrollMeTo(refName) {
            let element = this.$refs[refName];
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }
}
</script>
