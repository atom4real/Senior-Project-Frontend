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
                    <div v-if="this.$store.state.role === 'admin'" class="flex justify-end">
                        <!-- <button @click.prevent="EditContent(content.ContentID)" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Edit
                        </button> -->
                        <label for="my-modal-3" class="btn text-base bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Edit</label>

                        <button @click.prevent="deleteContent(content.ContentID)" class="bg-red-500 hover:bg-red-700 text-white font-medium py-2 ml-1 px-2 rounded">
                            Delete
                        </button>
                    </div>
                    {{ content.ContentID }}
                    
                    <figure class="px-10 pt-10">
                        <img src="https://placeimg.com/400/225/arch" alt="Shoes" class="rounded-xl" />
                     </figure>
                    <div class="card-body items-center text-center">
                        <h2 class="card-title">{{ content.ContentTitle }}</h2>
                        <p>{{ content.ContentDescription }}</p>
                        <p>{{ content.DateOfPosting }}</p>
                        <div class="card-actions">
                            <button class="btn btn-primary" :to="{name: 'ContentDetailPage', params: { id: contents.ContentID }} ">READ MORE</button>
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
            content_id: '',
            contents: [],
            title: '',
            description: '',
            date: '',
            photo: '',
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
                // photo: this.photo,
            }

            axios.put('/api/content/'+id, contentData)
            .then(response => {
                this.refeshData();
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
        }
    }
}
</script>
