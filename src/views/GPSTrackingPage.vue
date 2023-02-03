<template>
    test data of CARTRACK API: lat: {{ AllEvents[0].location.latitude }}, lng: {{ AllEvents[0].location.longitude }}
    <h4>Maps Position</h4>
    Latitude: {{ currPos.lat }} ,Longitude: {{ currPos.lng }}
    <div class="grid grid-cols-3">
        <div class="col-span-1 bg-white overflow-y-scroll" style="height: 87vh">
            <!-- List of trucks -->
            <ul data-theme="winter">
                <div v-for="allevents in AllEvents" :key="allevents.registration">
                    <li data-theme="winter" class="transition ease-in-out duration-250 bg-white hover:bg-gray-200">
                        <div class="grid grid-cols-3 py-3">
                            <div class="col-span-1 flex justify-center">
                                <img class="h-24" src="http://127.0.0.1:8000/Photos/truck.png" alt="truck-icon"/>
                            </div>
                            <div class="col-span-2 text-left">
                                <p>{{ allevents.vehicle_id }}</p>
                                <p>asdasdasd</p>
                                <p>asdasdas</p>
                                
                            </div>
                        </div>
                        <hr />
                    </li>
                </div>
            </ul>
        </div>
        <div class="col-span-2">
            <!-- Map -->
            <div ref="mapDiv" style="width: 100%; height: 87vh"></div>
        </div>
    </div>
</template>
<script>
/* eslint-disable no-undef */
import axios from 'axios';
import { useGeolocation } from '../services/useGeolocation';
import { computed, onMounted, ref } from 'vue';

import { Loader } from '@googlemaps/js-api-loader';

const GOOGLE_MAPS_API_KEY = 'AIzaSyCVP7k1BcfzC5E8gJvLSx9exiSTh1M16-k'

  export default {
    // component properties and data
    name: 'GPSTrackingPage',
    setup() {
        var Events = []
        const { coords } = useGeolocation()
        const currPos = computed(() => ({
            lat: coords.value.latitude,
            lng: coords.value.longitude
        }))

        const loader = new Loader({ apiKey: GOOGLE_MAPS_API_KEY })
        const mapDiv = ref(null)
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
                for(let i = 0; i < Events.length; i++) {
                    const marker = new google.maps.Marker({
                        position: { lat: Events[i].location.latitude, lng: Events[i].location.longitude },
                        map,
                        icon: "http://127.0.0.1:8000/Photos/truck_location.png",
                        title: "Hello World!",
                    })
                    const contentString =
                        '<div id="content">' +
                        '<div id="siteNotice">' +
                        "</div>" +
                        '<h1 id="firstHeading" class="firstHeading">Vehicle ID: '+ Events[i].vehicle_id +'</h1>' +
                        '<h2>Status Ignition: '+ Events[i].ignition +'</h2>'+
                        '<h2>Speed '+ Events[i].speed +' km/h</h2>'+
                        '<h2>Location: '+ Events[i].location.position_description +'</h2>'+
                        '<h2>Last updated: '+ Events[i].location.updated +'</h2>'+
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
        return { currPos, mapDiv }
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
          
                // this.mapMarker(response.data.data[0].location.latitude, response.data.data[0].location.longitude)
            })
        },
    },
    created() {
        this.fetchTrackingData()
    }
  }
</script>  
