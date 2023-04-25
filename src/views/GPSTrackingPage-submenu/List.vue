<template>
    <SubMenu />
        <div class="mx-8" v-if="this.$store.state.role === 'admin' && this.$store.state.token">
            <div class="grid grid-cols-9 gap-4 py-5 font-bold">
                <div>License plate</div>
                <div>Status</div>
                <div>Driver</div>
                <div>Speed</div>
                <div>Location</div>
                <div>Fuel</div>
                <div>Chassis number</div>
                <div>Odometer </div>
                <div>Last updated</div>
            </div>
            <div v-for="allevents in AllEvents" :key="allevents.registration">
                <div class="grid grid-cols-9 gap-4 py-5 font-bold">
                    <!-- License plate -->
                    <div class="py-3" :style="{'background': '#323948'}">
                        {{ allevents.registration }}
                    </div>
                    <!-- Status -->
                    <div class="py-3">
                        <div v-if="allevents.ignition == true">
                            Status: <span class="text-green-500">Online</span>
                        </div>
                        <div v-if="allevents.ignition == false">
                            Status: <span class="text-red-500">Offline</span>
                        </div>
                    </div>
                    <!-- Driver -->
                    <div class="py-3" :style="{'background': '#323948'}">
                        {{ allevents.driver.first_name }} {{ allevents.driver.last_name }}
                    </div>
                    <!-- Speed -->
                    <div class="py-3">
                        {{ allevents.speed }} km/hr
                    </div>
                    <!-- Location -->
                    <div class="py-3" :style="{'background': '#323948'}">
                        {{ allevents.location.position_description }}
                    </div>
                    <!-- Fuel -->
                    <div class="py-3">
                        <!-- fuel level -->
                        <div v-if="!allevents.fuel.level">
                            Fuel level: - L<br>
                        </div>
                        <div v-else>
                            Fuel level: {{ allevents.fuel.level }} L<br>
                        </div>
                        <!-- Percentage left -->
                        <div v-if="!allevents.fuel.precentage_left">
                            - <br>
                        </div>
                        <div v-else>
                            <div v-if="allevents.fuel.precentage_left >= 61 && allevents.fuel.precentage_left <=100">
                                <p class="text-green-500">Remaining: {{ allevents.fuel.precentage_left }}%</p>
                            </div> 
                            <div v-else-if="allevents.fuel.precentage_left >= 40 && allevents.fuel.precentage_left <=60">
                                <p class="text-yellow-500">Remaining: {{ allevents.fuel.precentage_left }}%</p>
                            </div>
                            <div v-else-if="allevents.fuel.precentage_left >= 10 && allevents.fuel.precentage_left <=39">
                                <p class="text-red-500">Remaining: {{ allevents.fuel.precentage_left }}%</p>
                            </div>
                            <div v-else>
                                <p class="text-red-500">WARNING!! <br> Remaining: {{ allevents.fuel.precentage_left }}%</p>
                            </div>
                            <br>
                        </div>
                    </div>
                    <!-- Chassis number -->
                    <div class="py-3" :style="{'background': '#323948'}">
                        <p>{{ allevents.chassis_number }}</p>
                    </div>
                    <!-- Odemeter -->
                    <div class="py-3">
                        <p>{{ allevents.odometer }}</p>
                    </div>
                    <!-- Last updated -->
                    <div class="py-3" :style="{'background': '#323948'}">
                        <p>{{ FormatData(allevents.event_ts) }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import SubMenu from '../../components/SubMenu.vue';

    export default {
        name: 'List',
        components: {SubMenu},
        data() {
            return {
                AllEvents: [],
            }
        },
        methods: {
            fetchAllTruck() {
                axios.get('/api/get-events')
                .then(response => {
                    this.AllEvents = response.data.data
                    console.log(this.AllEvents)
                })
            },
            FormatData(inputString) {
                const date = new Date(inputString);
                return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} @ ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
            },
        },
        created() {
            this.fetchAllTruck()
        }
    }
</script>