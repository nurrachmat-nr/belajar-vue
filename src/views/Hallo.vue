<template>
    <div>
      <nav-menu :brand="'Yuk Voting'"></nav-menu>
      <h1 class="text-center">Hallo {{ username }}</h1>
      <p> {{ jeniskelamin }}</p>
    </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex'
import NavMenu from '../components/NavMenu.vue'
export default {
  components: { NavMenu },
    name: "Hallo",
    setup(){
      const store =  useStore();

      //memanggil mutation menggunakan commit
      store.commit('auth/setJK', "Laki-laki")
      
      //untuk memanggil getter di compositio api harus menggunakan computed 
      return {
        username : computed(() => store.getters['auth/getUsername']), //
        jeniskelamin : computed(() => store.state.auth.jk)
      }
    }

}
</script>

<style>

</style>