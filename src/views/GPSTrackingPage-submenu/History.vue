<template>
    <SubMenu />
    <div v-if="this.$store.state.role === 'admin' && this.$store.state.token">
    <div class="flex justify-center">
        <form class="w-full max-w-sm rounded-lg" @submit.prevent="submitFindingTrackingIDForm">
            <div class="flex justify-center">
                <div class="mb-3 xl:w-96 flex items-center border-b border-blue-500 py-2 px-2">
                    <select data-te-select-init data-te-select-filter="true" id="trackingID" v-model="trackingID" class="appearance-none bg-transparent border-none w-full text-blue-700 mr-3 py-1 px-2 leading-tight focus:outline-none">
                        <option value="0711763">0711763</option>
                        <option value="0711525">0711525</option>
                        <option value="0708200">0708200</option>
                        <option value="0710644">0710644</option>
                        <option value="0704554">0704554</option>
                        <option value="0710026">0710026</option>
                        <option value="0679079">0679079</option>
                        <option value="0711603">0711603</option>
                        <option value="0710459">0710459</option>
                        <option value="0710906">0710906</option>
                        <option value="0711018">0711018</option>
                        <option value="0711530">0711530</option>
                        <option value="0711243">0711243</option>
                        <option value="0708788">0708788</option>
                        <option value="0714980">0714980</option>
                        <option value="0711609">0711609</option>
                        <option value="0711760">0711760</option>
                        <option value="0708958">0708958</option>
                        <option value="0709401">0709401</option>
                        <option value="0709684A">0709684A</option>
                        <option value="711845">711845</option>
                        <option value="0708596">0708596</option>
                        <option value="0711057">0711057</option>
                        <option value="0708758">0708758</option>
                        <option value="0711508">0711508</option>
                        <option value="0710457">0710457</option>
                        <option value="0710550">0710550</option>
                        <option value="0708623">0708623</option>
                        <option value="0710936">0710936</option>
                        <option value="0709363">0709363</option>
                        <option value="0710365">0710365</option>
                        <option value="0709542">0709542</option>
                    </select>
                    <button class="flex-shrink-0 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-4 text-white py-1 px-2 rounded" type="submit">
                        Track
                    </button>
                </div>
            </div>
        </form>          
    </div>
    <ul data-theme="winter">
        <div v-for="allevents in AllEvents" :key="allevents.registration">
            <a class="cursor-pointer" ref="truck" @click="event(allevents.registration)">
                <li data-theme="winter" class="transition ease-in-out duration-250 bg-white hover:bg-gray-200">
                    <div class="grid grid-cols-6 py-3">
                        <div class="col-span-2 flex justify-center">
                            <img v-if="allevents.ignition == true" class="h-24" src="http://54.169.123.14:8000/Photos/online-truck.png" alt="truck-icon"/>
                            <img v-if="allevents.ignition == false" class="h-24" src="http://54.169.123.14:8000/Photos/offline-truck.png" alt="truck-icon"/>
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
    </div>
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
                    console.log(response)
                })
            },
            event(id) {
                this.$router.push({ name: 'HistoryTruck', params: { id: id } })
            },
            submitFindingTrackingIDForm() {
                this.$router.push({ name: 'HistoryTruck', params: { id: trackingID.value } })
            }
        },
        created() {
        this.fetchHistory()
        }
    }
</script>