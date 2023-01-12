<template>
    <div class="w-full h-full bg-no-repeat bg-cover bg-center bf-fixed" 
    :style="{'background': '#1A4268C2'}">
        <div class="font-sans font-bold pt-32 pb-3 text-3xl text-white">Contents</div>
            <div class="inline-flex justify-center items-center w-full">
                <hr class="my-6 w-3/5 h-1 bg-blue-700 border-0">
            </div>
        <div class="md:container md:mx-auto pt-4 pb-8 text-xl">
            <div class="grid grid-cols-3 gap-3 justify-items-center">
                <div v-for="content in contents" :key="content.id" :content="contents" class="card w-92 bg-base-100 shadow-xl">
                    <div v-if="this.$store.state.role === 'admin'" class="flex justify-end">
                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Edit
                        </button>
                        <button @click.prevent="deleteContent(content.ContentID)" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 ml-1 px-2 rounded">
                            Delete
                        </button>
                    </div>
                    <figure class="px-10 pt-10">
                        <img src="https://placeimg.com/400/225/arch" alt="Shoes" class="rounded-xl" />
                     </figure>
                    <div class="card-body items-center text-center">
                        <h2 class="card-title">{{ content.ContentTitle }}</h2>
                        <p>{{ content.ContentDescription }}</p>
                        <div class="card-actions">
                            <button class="btn btn-primary" :to="{name: 'ContentDetailPage', params: { id: contents.id }} ">READ MORE</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Previous Button -->
        <div class="pb-3 justify-center content-center items-center">
            <a href="#" class="inline-flex items-center px-4 py-2 mr-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                <svg aria-hidden="true" class="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd"></path></svg>
                <!-- Previous -->
            </a>
            <a href="#" class="inline-flex items-center px-4 py-2 mr-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                <!-- Next -->
                <svg aria-hidden="true" class="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </a>
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
            axios.get('/api/content')
            .then(response => {
                this.contents=response.data;
                console.log(this.contents)
            })
        },
        deleteContent(id) {
            // axios.delete(`/api/conetnt?ids=${ContentID}`)
            if(!confirm('Are you sure?')){
                return ;
            }
            axios.delete('/api/content/'+id)
            .then((response) => {
                this.refeshData();
                alert("Delete Successfully!");
            });
        }
    }
}
</script>
