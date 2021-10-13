<template>
    <div class="container mt-5">
        <h5>{{ brand }}</h5>
        <nav class="nav">
            <router-link class="nav-link active" aria-current="page" :to="{name:'hallo'}">Home</router-link>
            <router-link class="nav-link" :to="{name:'post.index'}">Post</router-link>
            <a class="nav-link" href="#" @click="logout">Log Out</a>
        </nav>
    </div>
</template>

<script>
import { useStore } from 'vuex'
export default {
    name: "NavMenu",
    props: {
        brand: String
    },
    data() {
        return {
            nama: ""
        }
    },
    setup(){
        const store = useStore()
        return{
            logout : () => store.dispatch("auth/LogOut")
        }
    }
}
</script>

<style>

</style>