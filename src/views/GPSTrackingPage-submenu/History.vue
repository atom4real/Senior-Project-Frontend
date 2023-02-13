<template>
    <SubMenu />
    <ul data-theme="winter">
        <div v-for="allevents in AllEvents" :key="allevents.registration">
            <a class="cursor-pointer" ref="truck" @click="event(allevents.registration)">
                <li data-theme="winter" class="transition ease-in-out duration-250 bg-white hover:bg-gray-200">
                    <div class="grid grid-cols-6 py-3">
                        <div class="col-span-2 flex justify-center">
                            <img v-if="allevents.ignition == true" class="h-24" src="http://127.0.0.1:8000/Photos/online-truck.png" alt="truck-icon"/>
                            <img v-if="allevents.ignition == false" class="h-24" src="http://127.0.0.1:8000/Photos/offline-truck.png" alt="truck-icon"/>
                        </div>
                        <div class="col-span-3 text-left py-5">
                            <p>License plate: {{ allevents.registration }}</p>
                            <div v-if="allevents.ignition == true">
                                Status: <span class="text-green-500">Online</span>
                            </div>
                            <div v-if="allevents.ignition == false">
                                Status: <span class="text-red-500">Offline</span>
                            </div>
                            <p>Last updated: {{ allevents.location.position_description }}</p>
                        </div>
                    </div>
                    <hr />
                </li>
            </a>
        </div>
    </ul>
</template>
<script>
import axios from 'axios';
import SubMenu from '../../components/SubMenu.vue';

    export default {
        name: 'History',
        
        components: {SubMenu},
        data() {
            return {
                AllEvents: [],
            }
        },
        methods: {
            fetchHistory() {
                axios.get('/api/get-events')
                .then(response => {
                    this.AllEvents = response.data.data
                    console.log(this.AllEvents)
                })
            },
            event(id) {
                this.$router.push({ name: 'HistoryTruck', params: { id: id } })
            }
        },
        created() {
        this.fetchHistory()
        }
    }
</script>