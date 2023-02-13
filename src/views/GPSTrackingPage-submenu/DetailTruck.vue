<template>
    <SubMenu />
    {{ id }}
</template>
<script>
import SubMenu from '../../components/SubMenu.vue';

export default {
    name: 'DetailTruck',
    components: {SubMenu},
    props: ['id'],
    data() {

    }
}
</script>
