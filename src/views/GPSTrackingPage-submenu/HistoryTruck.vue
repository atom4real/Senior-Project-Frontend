<template>
    <SubMenu />
    <!-- {{ AllEvents }} -->
    <div v-for="index in 10" :key="index">
        <div v-for="allevents in AllEvents[index]" :key="allevents.registration">
        <!-- Show only match w/ props -->
        <div v-if="allevents.registration === id">
            <p>License plate: {{ allevents.registration }}</p>
            <p>Start</p>
            <p>Start time: {{ allevents.start_timestamp }}</p>
            <p>Start Lacation: {{ allevents.start_location }}</p>
            <br>
            <p>End</p>
            <p>End time: {{ allevents.end_timestamp }}</p>
            <p>End Lacation: {{ allevents.end_location }}</p>
            <hr />
            <p>Duration: {{ allevents.trip_duration }}</p>
            <hr />
            <br>
        </div>
        </div>
    </div>
    
    <!-- <div class="flex flex-col flex-nowrap justify-end w-2 h-52 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700">
        <div class="bg-blue-500 overflow-hidden" role="progressbar" style="height: 25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
        <div class="bg-blue-500 overflow-hidden" role="progressbar" style="height: 25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
        <div class="bg-blue-500 overflow-hidden" role="progressbar" style="height: 25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
        <div class="bg-blue-500 overflow-hidden" role="progressbar" style="height: 25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
    </div> -->
    
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
                    //     for(let x=0 ; x<10 ; x++){
                    //         this.AllEvents.push(response.data[i].data)
                    //     }
                    }
                    console.log(this.AllEvents)
                })
            }
        },
        created() {
            this.fetchHistory()
        }
    }
</script>