<template>
    <div ref="SubMenu">
        <SubMenu />
    </div>
    <div class="grid grid-cols-3 bg-white">
        <div class="col-span-1 bg-white overflow-y-scroll" style="height: 87vh">
            <!-- List of trucks -->
            <ul data-theme="winter">
                <div v-for="allevents in AllEvents" :key="allevents.registration">
                    <a class="cursor-pointer" ref="truck" @click="event(allevents.location.latitude, allevents.location.longitude)">
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
                                </div>
                                <div class="col-span-1 text-left py-5 flex justify-center">
                                    <!-- Detail truck btn -->
                                    <button @click.prevent="detailTruck(allevents.registration)" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 ml-1 px-2 rounded">
                                        DETAIL
                                    </button>
                                </div>
                            </div>
                            <hr />
                        </li>
                    </a>
                </div>
            </ul>
        </div>
        <div class="col-span-2">
            <!-- Map -->
            <div ref="mapDiv" style="width: 100%; height: 87vh">
            </div>
        </div>
    </div>
</template>
<script>
/* eslint-disable no-undef */
import axios from 'axios';
import { useGeolocation } from '../services/useGeolocation';
import { computed, onMounted, ref } from 'vue';

import { Loader } from '@googlemaps/js-api-loader';

import SubMenu from '../components/SubMenu.vue';

const GOOGLE_MAPS_API_KEY = 'AIzaSyCVP7k1BcfzC5E8gJvLSx9exiSTh1M16-k'

  export default {
    // component properties and data
    name: 'GPSTrackingPage',
    components: {SubMenu},
    setup() {
        let Events = []
        let Events2 = []
        // const { coords } = useGeolocation()
        const currPos = computed(() => ({
            //Thailand location
            lat: 15.8700,
            lng: 100.9925
        }))

        const loader = new Loader({ apiKey: GOOGLE_MAPS_API_KEY })
        const mapDiv = ref(null)
        const truck = ref(null)
        onMounted(async () => {
            //fetch data from backend
            axios.get('/api/get-events')
            .then(response => {
                Events = response.data.data
            })
            //cre8 map
            await loader.load()
            const map = new google.maps.Map(mapDiv.value, {
                center: currPos.value,
                zoom: 7
            })
            //cre8 marker
            axios.get('/api/get-events')
            .then(response => {
                Events = response.data.data
                for(const element of Events) {
                    const marker = new google.maps.Marker({
                        position: { lat: element.location.latitude, lng: element.location.longitude },
                        map,
                        icon: "http://127.0.0.1:8000/Photos/truck_location.png",
                        title: "Hello World!",
                    })
                    const contentString =
                        '<div id="content">' +
                        '<div id="siteNotice">' +
                        "</div>" +
                        '<h1 id="firstHeading" class="firstHeading">Vehicle ID: '+ element.vehicle_id +'</h1>' +
                        '<h2>Status Ignition: '+ element.ignition +'</h2>'+
                        '<h2>Speed '+ element.speed +' km/h</h2>'+
                        '<h2>Location: '+ element.location.position_description +'</h2>'+
                        '<h2>Last updated: '+ element.location.updated +'</h2>'+
                        "</div>"
                    const infowindow = new google.maps.InfoWindow({
                        content: contentString,
                        ariaLabel: "content",
                    })
                    marker.addListener("click", () => {
                        infowindow.open({
                            anchor: marker,
                            map,
                        }),
                        map.setZoom(13)
                        map.setCenter(marker.getPosition())
                    })
                }
            })
        })

        //bring to a truck location when click a truck component.
        function event(lat, lng) {
            const location = {
                lat: lat,
                lng: lng
            }
            const map = new google.maps.Map(mapDiv.value, {
                center: location,
                zoom: 13
            })
            axios.get('/api/get-events')
            .then(response => {
                Events2 = response.data.data
                for(const element of Events2) {
                    const marker = new google.maps.Marker({
                        position: { lat: element.location.latitude, lng: element.location.longitude },
                        map,
                        icon: "http://127.0.0.1:8000/Photos/truck_location.png",
                        title: "Hello World!",
                    })
                    const contentString =
                        '<div id="content">' +
                        '<div id="siteNotice">' +
                        "</div>" +
                        '<h1 id="firstHeading" class="firstHeading">Vehicle ID: '+ element.registration +'</h1>' +
                        '<h2>Status Ignition: '+ element.ignition +'</h2>'+
                        '<h2>Speed '+ element.speed +' km/h</h2>'+
                        '<h2>Location: '+ element.location.position_description +'</h2>'+
                        '<h2>Last updated: '+ element.location.updated +'</h2>'+
                        "</div>"
                    const infowindow = new google.maps.InfoWindow({
                        content: contentString,
                        ariaLabel: "content",
                    })
                    marker.addListener("click", () => {
                        infowindow.open({
                            anchor: marker,
                            map,
                        }),
                        map.setZoom(13)
                        map.setCenter(marker.getPosition())
                    })
                }
            })
        }
        return { currPos, mapDiv, truck, event }
    },
    data() {
        return {
            AllEvents: [],
        }
    },

    methods: {
        fetchTrackingData() {
            axios.get('/api/get-events')
            .then(response => {
                this.AllEvents = response.data.data
                console.log(this.AllEvents)
            })
        },
        detailTruck(id) {
            this.$router.push({ name: 'DetailTruck', params: { id: id }})
        },
    },
    created() {
        this.fetchTrackingData()
    }
  }
</script>  
