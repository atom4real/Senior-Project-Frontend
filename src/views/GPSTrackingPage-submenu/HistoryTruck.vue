<template>
    <SubMenu />
    <!-- {{ AllEvents }} -->
    <div class="font-sans font-bold pt-8 pb-3 text-3xl text-gray-400">Recent Activity</div>
            <div>({{ id }})</div>
            <div class="inline-flex justify-center items-center w-full">
                <hr class="my-6 w-3/5 h-1 bg-gray-400 border-0">
            </div>
    <div class="grid grid-cols-4 gap-4 py-5 font-bold">
        <div>Date/Time</div>
        <div>Location</div>
        <div>Driver</div>
        <div>Duration</div>
    </div>
    <div>
        <div v-for="index in 10" :key="index">
            <div v-for="allevents in AllEvents[index]" :key="allevents.registration">
                <!-- Show only match w/ props -->
                <div v-if="allevents.registration === id">
                    <div class="grid grid-cols-4 gap-4">
                        <div>
                            <p :style="{'background': '#323948'}">Start time: {{ FormData(allevents.start_timestamp) }}</p>
                            <p>End time: {{ FormData(allevents.end_timestamp) }}</p>
                            <br>
                        </div>
                        <div>
                            <p :style="{'background': '#323948'}">{{ allevents.start_location }}</p>
                            <p>{{ allevents.end_location }}</p>
                            <br>
                        </div>
                        <div>
                            <p :style="{'background': '#323948'}">{{ allevents.driver_name }}</p>
                            <br>
                        </div>
                        <div>
                            <p :style="{'background': '#323948'}">{{ allevents.trip_duration }}</p>
                            <br>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
</template>
<script>
import axios from 'axios';
import SubMenu from '../../components/SubMenu.vue';

    export default {
        name: 'HistoryTruck',
        props: ['id'],
        components: {SubMenu},
        data() {
            return {
                AllEvents: [],
            }
        },
        methods: {
            fetchHistory() {
                axios.get('/api/get_trip')
                .then(
                response => {
                    for(let i=0 ; i<10 ; i++){
                        this.AllEvents.push(response.data[i].data)
                    }
                    console.log(this.AllEvents)
                })
            },
            FormData(data) {
                let dateRegex = /^\d{4}-\d{2}-\d{2}/
                let timeRegex = /\d{2}:\d{2}:\d{2}/

                let dateMatch = data.match(dateRegex);
                let timeMatch = data.match(timeRegex);

                return `${dateMatch[0]} @ ${timeMatch[0]}`
            }
        },
        created() {
            this.fetchHistory()
        }
    }
</script>