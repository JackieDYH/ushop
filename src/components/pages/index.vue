<template>
    <div>
        <router-view></router-view>
        <v-nav></v-nav>
    </div>    
</template>

<script>
import vNav from '../views/tabnav'
export default {
    components:{
        vNav,
    }
};
</script>

<style>
</style>