<template>
  <div class="container mt-5">
      <form @submit.prevent="login">
        <div class="mb-3">
            <label class="form-label">Username</label>
            <input type="text" class="form-control" v-model="auth.username">
            
        </div>
        <div class="mb-3">
            <label class="form-label">Password</label>
            <input type="password" class="form-control" v-model="auth.password" >
        </div>
        
        <button type="submit" class="btn btn-primary">Login</button>
     </form>

  </div>
</template>

<script>
import { reactive } from 'vue';
import { useStore } from 'vuex';
export default {
    name: "Login",
    setup(){
        const auth  = reactive({
            username: '',
            password: ''
        });

        const store =  useStore();
        function login() {
            store.dispatch("auth/LogIn", auth)
        }

        return {
            auth,
            login,
        }
    }
}
</script>

<style>

</style>