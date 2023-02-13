<template>
    <ul class="menu menu-horizontal bg-base-100 rounded-box text-white shadow-md">
            <li>
                <router-link class="active:bg-blue-700" :to="{ name: 'GPSTrackingPage' }">
                    <div>
                        <img src="http://127.0.0.1:8000/Photos/locator.png" class="h-4" alt="map" />
                    </div>
                    <div>
                        Map
                    </div>
                </router-link>
            </li>
            <li>
                <router-link class="active:bg-blue-700" :to="{ name: 'History' }">
                    <div>
                        <img src="http://127.0.0.1:8000/Photos/history.png" class="h-4" alt="history" />
                    </div>
                    <div>
                        History
                    </div>
                </router-link>
            </li>
             <li>
                <router-link class="active:bg-blue-700" :to="{ name: 'List' }">
                    <div>
                        <img src="http://127.0.0.1:8000/Photos/list-text.png" class="h-4" alt="history" />
                    </div>
                    <div>
                        List
                    </div>
                </router-link>
            </li>
        </ul>
</template>
<script>
import SubMenu from '../components/SubMenu.vue';

export default {
    name: 'SubMenu',

}
</script>