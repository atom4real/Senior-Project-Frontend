<template>
        <hr>
    <div class="grid grid-cols-1 bg-white">
        <div class="font-sans font-bold pt-12 pb-3 text-3xl text-black">Tracking System</div>
            <div class="inline-flex justify-center items-center w-full">
                <hr class="my-6 w-3/5 h-1 bg-blue-700 border-0">
            </div>
        <div class="col-span-1 bg-white" style="height: 8vh; ">
            <ul data-theme="winter">
                <div class="flex justify-center">
                    <form class="w-full max-w-sm rounded-lg" @submit.prevent="submitFindingTrackingIDForm">
                        <div class="flex items-center border-b border-blue-500 py-2 px-2">
                            <input class="appearance-none bg-transparent border-none w-full text-blue-700 mr-3 py-1 px-2 leading-tight focus:outline-none" id="trackingID" v-model="trackingID" type="text" placeholder="ID Tracking..." aria-label="Full name" required>
                            <button class="flex-shrink-0 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-4 text-white py-1 px-2 rounded" type="submit">
                                Track
                            </button>
                        </div>
                    </form>
                </div>
            </ul>
        </div>
        <div class="col-span-1">
            <!-- Map -->
            <div class="flex justify-center" style="width: 100%; height: 62vh">
                <div class="rounded-lg" ref="mapDiv" style="width: 50%; height: 52vh"></div>
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
    name: 'GPSCustomerTrackingPage',
    components: {SubMenu},
    setup() {
        const trackingID = ref(null)
        let Events = []
        let data = []
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
            // axios.get('/api/get-events')
            // .then(response => {
            //     Events = response.data.data
            //     for(const element of Events) {
            //         const marker = new google.maps.Marker({
            //             position: { lat: element.location.latitude, lng: element.location.longitude },
            //             map,
            //             icon: "http://127.0.0.1:8000/Photos/truck_location.png",
            //             title: "Hello World!",
            //         })
            //         const contentString =
            //             '<div id="content">' +
            //             '<div id="siteNotice">' +
            //             "</div>" +
            //             '<h1 id="firstHeading" class="firstHeading">Vehicle ID: '+ element.vehicle_id +'</h1>' +
            //             '<h2>Status Ignition: '+ element.ignition +'</h2>'+
            //             '<h2>Speed '+ element.speed +' km/h</h2>'+
            //             '<h2>Location: '+ element.location.position_description +'</h2>'+
            //             '<h2>Last updated: '+ element.location.updated +'</h2>'+
            //             "</div>"
            //         const infowindow = new google.maps.InfoWindow({
            //             content: contentString,
            //             ariaLabel: "content",
            //         })
            //         marker.addListener("click", () => {
            //             infowindow.open({
            //                 anchor: marker,
            //                 map,
            //             }),
            //             map.setZoom(13)
            //             map.setCenter(marker.getPosition())
            //         })
            //     }
            // })
        })
        //Find Truck ID
        function submitFindingTrackingIDForm(){
            let truck_id = `${trackingID.value}`
            // console.log(truck_id)
            axios.get('/api/get-events')
            .then(response => {
                data = response.data.data
                for(const element of data) {
                    if(element.vehicle_id == truck_id) {
                        const location = {
                            lat: element.location.latitude,
                            lng: element.location.longitude
                        }
                        console.log(location)
                        const map = new google.maps.Map(mapDiv.value, {
                            center: location,
                            zoom: 13
                        })
                        axios.get('/api/get-events')
                        .then(response => {
                            Events = response.data.data
                            for(const element of Events) {
                                if(element.vehicle_id == truck_id) {
                                    const marker = new google.maps.Marker({
                                        position: { lat: element.location.latitude, lng: element.location.longitude },
                                        map,
                                        icon: "http://175.41.168.88:8000/Photos/truck_location.png",
                                        title: "Hello World!",
                                    })
                                    map.setZoom(13)
                                    map.setCenter(marker.getPosition())
                                    const contentString =
                                        '<div id="content">' +
                                        '<div id="siteNotice">' +
                                        "</div>" +
                                        '<h1 id="firstHeading" class="firstHeading">Tracking ID: '+ element.vehicle_id +'</h1>' +
                                        '<h2>Location: '+ element.location.position_description +'</h2>'+
                                        '<h2>Last updated: '+ FormatData(element.location.updated) +'</h2>'+
                                        "</div>"
                                    const infowindow = new google.maps.InfoWindow({
                                        content: contentString,
                                        ariaLabel: "content",
                                    })
                                    marker.addListener("click", () => {
                                        infowindow.open({
                                            anchor: marker,
                                            map,
                                        })
                                        map.setZoom(13)
                                        map.setCenter(marker.getPosition())
                                    })
                                }
                            }
                        })
                    }
                }
            })
        }
        function FormatData(data) {
            let originalString = data
            let dateRegex = /^\d{4}-\d{2}-\d{2}/
            let timeRegex = /\d{2}:\d{2}:\d{2}/
            let dateMatch = originalString.match(dateRegex);
            let timeMatch = originalString.match(timeRegex);
            return `${dateMatch[0]} @ ${timeMatch[0]}`
        }
        return { currPos, mapDiv, truck, submitFindingTrackingIDForm, trackingID, FormatData }
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
