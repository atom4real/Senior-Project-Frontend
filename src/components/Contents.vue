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
                        <img :src="'http://54.169.123.14:8000/Photos/'+content.PhotoFileName" alt="Shoes" class="rounded-xl" />
                     </figure>
                    <div class="card-body items-center text-center">
                        <h2 class="card-title">{{ content.ContentTitle }}</h2>
                        <p>{{ content.ContentDescription }}</p>
                        <p>Posted: {{ content.DateOfPosting }}</p>
                        <div class="card-actions">
                            <router-link class="btn btn-primary" :to="{name: 'ContentDetailPage', params: { id: content.ContentID }} ">READ MORE</router-link>
                        </div>
                    </div>

                    <!-- Modal popup -->
                    <input type="checkbox" id="my-modal-3" class="modal-toggle" />
                    <div class="modal">
                        <div class="modal-box relative bg-white shadow-md px-8 pt-6 pb-8 mb-4">
                            <label for="my-modal-3" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                            <form @submit.prevent="EditContent(content.ContentID)" class="bg-white">
                                <div>
                                    ContentID: #{{ content.ContentID }}
                                </div>
                                <div class="mb-4">
                                    <label class="flex justify-start text-gray-700 text-sm font-bold mb-2" for="title">
                                        Title 
                                    </label>
                                    <input class="shadow appearance-none w-full py-2 px-3 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="title" type="text" v-model="title" placeholder="Title">
                                </div>
                                <div class="mb-4">
                                    <label for="description" class="flex justify-start mb-2 text-sm font-medium text-gray-900 dark:text-black">Descriptions</label>
                                    <textarea rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="description" type="text" v-model="description" placeholder="descriptions..."></textarea>
                                </div>
                                <div class="mb-4">
                                    <label class="text-gray-700 text-sm font-bold mb-2 flex justify-start" for="date">
                                        Date
                                    </label>
                                    <input class="shadow appearance-none w-full py-2 px-3 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="date" type="date" v-model="date">
                                </div>
                                <div class="mb-4">
                                    <label class="text-gray-700 text-sm font-bold mb-2 flex justify-start" for="date">
                                        photo
                                    </label>
                                    <div class="p-2 w-50">
                                        <img :src="'http://54.169.123.14:8000/Photos/'+content.PhotoFileName" alt="img" />
                                    </div>
                                    <input class="shadow appearance-none w-full py-2 px-3 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="photo" type="file" @change="imageUpload">
                                </div>

                                <div class="flex items-center justify-center">
                                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                        Post
                                    </button>
                                </div>
                             </form>
                        </div>
                    </div>

                </div>
            </div>
            <router-link :to="{ name: 'ContentPage' }">
            <div class="mb-32 mt-16 btn bg-white hover:bg-blue-700 text-black hover:text-white font-bold py-2 px-4 border border-white hover:border-white " :style="{'border-radius': '30px'}">
                READ MORE!
            </div>
        </router-link>
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
            currentPage: 1,
        }
    },
    computed: {
        hasPrevious() {
            return this.currentPage > 1
        },
        hasNext() {
            return this.contents.length === 10
        },
    },
    mounted() {
        this.refeshData()
        this.getContentID()
    },
    created() {
        this.fetchItems()
    },
    methods: {
        refeshData() {
            axios.get('/api/content')
            .then(response => {
                this.contents=response.data;
                this.$store.commit('setContent', this.contents)
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
        },
        getContentID(id) {
            this.content_id=id;
        },
        EditContent(id) {
            const contentData = {
                ContentTitle: this.title,
                ContentDescription: this.description,
                DateOfPosting: this.date,
                PhotoFileName: this.PhotoFileName,
            }

            axios.put('/api/content/'+id, contentData)
            .then(response => {
                this.refeshData();
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
        },
        imageUpload(event) {
            let formData = new FormData()
            formData.append('file', event.target.files[0])
            axios.post('/api/content/savefile', formData)
            .then((response => {
                this.PhotoFileName=response.data
                console.log(this.PhotoFileName)
            })) 
        },
        async fetchItems() {
        try {
            const response = await axios.get(`/api/content-list?page=1`, {
            params: {
                page: this.currentPage,
                page_size: 3
                }
            })
            this.contents = response.data.results
            } catch (error) {
                console.error(error)
            }
        },
        previousPage() {
            this.currentPage--
            this.fetchItems()
        },
        nextPage() {
            this.currentPage++
            this.fetchItems()
        },
    }
}
</script>
