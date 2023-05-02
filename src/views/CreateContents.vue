<template>
    <div 
        class="w-full h-full bg-no-repeat bg-cover bg-center bf-fixed" 
        :style="{'background-image': 'linear-gradient(0deg, rgba(35, 58, 80, 0.87), rgba(35, 58, 80, 0.87)), url(src/assets/img/bg-masthead.jpg)'}">
        <div class="font-sans font-bold pt-20 pb-3 text-5xl text-white">Create a content</div>
        <div class="inline-flex justify-center items-center w-full">
            <hr class="my-6 w-4/5 h-1 bg-blue-700 border-0">
        </div>
        <div class="font-extrabold text-2xl leading-10 text-white mb-20 pb-24 flex justify-center">
            
            <div class="w-full max-w-3xl">
                <form @submit.prevent="submitForm" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div class="mb-4">
                        <label class="flex justify-start text-gray-700 text-sm font-bold mb-2" for="title">
                            Title
                        </label>
                        <input class="shadow appearance-none w-full py-2 px-3 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="title" type="text" v-model="title" placeholder="Title">
                    </div>
                    <div class="mb-4">
                        <label for="description" class="flex justify-start mb-2 text-sm font-medium text-gray-900 dark:text-black  ">Descriptions</label>
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
                            <img width="250px" height="250px" :src="PhotoPath+PhotoFileName" alt="img" />
                        </div>
                        <input class="shadow appearance-none w-full py-2 px-3 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="photo" type="file" @change="imageUpload">
                        
                    </div>
                    <!-- <div class="mb-4">
                        <div class="flex items-center justify-center w-full">
                            <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg aria-hidden="true" class="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                                    <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                </div>
                                <input id="dropzone-file" type="file" @change="imageUpload" />
                            </label>
                        </div> 
                    </div> -->
                    <div class="flex items-center justify-center">
                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Post
                        </button>
                    </div>
                </form>
  <p class="text-center text-gray-500 text-xs">
    &copy;2020 Acme Corp. All rights reserved.
  </p>
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
            title: '',
            description: '',
            date: '',
            PhotoFileName: 'content4.jpeg',
            PhotoPath: 'http://54.169.123.14:8000/Photos/',
        }
    },
    mounted() {

    },
    methods: {
        submitForm(e) {
            const contentData = {
                ContentTitle: this.title,
                ContentDescription: this.description,
                DateOfPosting: this.date,
                PhotoFileName: this.PhotoFileName,
            }
            
            axios.post('/api/content', contentData)
            .then(response => {
                // this.title=response.data.ContentTitle;
                // this.description=response.data.ContentDescription;
                // this.date=response.data.DateOfPosting;
                // this.photo=response.data.PhotoFileName;
                console.log(response)
                this.$router.push('/content-list')
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
        }
    }
}
</script>
    