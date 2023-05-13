<template>
  <div v-if="content" class="w-full h-full pb-32 bg-no-repeat bg-cover bg-center bf-fixed" :style="{'background': '#1A4268C2'}">
    <div class="flex justify-center py-20 mx-16">
        <img :src="'http://175.41.168.88:8000/Photos/'+content.PhotoFileName" alt="Shoes" class="rounded-xl" />
    </div>
    <div class="text-black card mx-24 py-10 bg-white shadow-xl">
        <div class="text-4xl font-bold pb-8">
            <h1>{{ content.ContentTitle }}</h1>
        </div>
        <div class="mx-12">
          <p>{{ content.ContentDescription }}</p>
        </div>
    </div>
    <div class="mx-12 my-6 text-right">
      <p>Posted: {{ content.DateOfPosting }}</p>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
    name: 'ContentDetailPage',
    props: ['id'],
    data() {
    return {
      content: null
    }
  },  
  created() {
    // fetch event (by id) and set local event data
    axios.get(`/api/content/` + this.id + `/`)
      .then((response) => {
        this.content = response.data
        console.log(this.content)
      })
      .catch((error) => {
        console.log(error)
      })
  }

}
</script>
