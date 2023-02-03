import { onMounted, onUnmounted, ref } from "vue";

export function useGeolocation() {
    const coords = ref({ latitude: 0, longitude: 0 })
    const isSupport = 'navigator' in window && 'geolocation' in navigator

    let watcher = null
    onMounted(() => {
        if(isSupport)
            watcher = navigator.geolocation.watchPosition(
                position => (coords.value = position.coords)
            )
    })
    onUnmounted(() => {
        if(watcher) navigator.geolocation.clearWatch(watcher)
    })

    return { coords, isSupport }
}
