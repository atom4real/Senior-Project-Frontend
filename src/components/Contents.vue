<template>
    <div class="w-full h-full bg-no-repeat bg-cover bg-center bf-fixed" 
    :style="{'background': '#1A4268C2'}">
        <div class="font-sans font-bold pt-32 pb-3 text-3xl text-white">Contents</div>
            <div class="inline-flex justify-center items-center w-full">
                <hr class="my-6 w-3/5 h-1 bg-blue-700 border-0">
            </div>
        <div class="md:container md:mx-auto pt-4 pb-8 text-xl">
            <div class="grid grid-cols-3 gap-3 justify-items-center">
                <div v-for="content in contents" :key="content.ContentID" :content="contents" class="card w-92 bg-base-100 shadow-xl">
                    <figure class="px-10 pt-10">
                        <img :src="'http://127.0.0.1:8000/Photos/'+content.PhotoFileName" alt="Shoes" class="rounded-xl" />
                     </figure>
                    <div class="card-body items-center text-center">
                        <h2 class="card-title">{{ content.ContentTitle }}</h2>
                        <p>{{ content.ContentDescription }}</p>
                        <p>Posted: {{ content.DateOfPosting }}</p>
                        <div class="card-actions">
                            <!-- <button class="btn btn-primary" :to="{name: 'ContentDetailPage', params: { id: contents.ContentID }} ">READ MORE</button> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>     
        <div class="mb-52 mt-16 btn bg-white hover:bg-blue-700 text-black hover:text-white font-bold py-2 px-4 border border-white hover:border-white " :style="{'border-radius': '30px'}">
            <router-link :to="{ name: 'ContentPage' }">READ MORE!</router-link>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    name: 'ContentPage',
    data() {
        return {
            content_id: '',
            contents: [],
            title: '',
            description: '',
            date: '',
            photo: '',
            PhotoFileName: '',
        }
    },
    mounted() {
        this.refeshData()
        this.getContentID()
    },
    methods: {
        refeshData() {
            axios.get('/api/content')
            .then(response => {
                this.contents=response.data;
                console.log(this.contents)
            })
        },
        getContentID(id) {
            this.content_id=id;
        },
    }
}
</script>
