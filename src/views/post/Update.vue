<template>
  <div class="container mt-5">
      <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>TAMBAH POST</h4>
                        <hr>

                        <form @submit.prevent="update">
                            <div class="form-group">
                                <label for="title" class="font-weight-bold">TITLE</label>
                                <input type="text" class="form-control" v-model="post.title" placeholder="Masukkan Judul Post">
                                <!-- validation -->
                                <div  class="mt-2 alert alert-danger" v-if="validation.title">
                                    <li v-for="(val, index ) in validation.title" :key="index" >
                                        {{val}}
                                    </li>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="content" class="font-weight-bold">CONTENT</label>
                                <textarea class="form-control" rows="4" v-model="post.content" placeholder="Masukkan Konten Post"></textarea>
                                <!-- validation -->
                                <div  class="mt-2 alert alert-danger" v-if="validation.content">
                                    {{ validation.content[0] }}
                                </div>
                            </div>
                            <button type="submit" class="btn btn-primary">SIMPAN</button>
                        </form>                        

                    </div>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
import { reactive, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios';
import { useStore } from 'vuex';
export default {
    setup(){
        const post  = reactive({
            title: '',
            content: ''
        });

        const validation = ref([]);
        const router =  useRouter();
        const route = useRoute();
        const store =  useStore();

        onMounted(() => {
             let config = {
                method: 'get',
                url: 'http://localhost:8000/api/post/'  + route.params.id,
                headers: { 
                    'Accept': 'application/vnd.api+json', 
                    'Authorization': 'Bearer '+ store.getters['auth/getToken']
                }
            };
            axios(config)
            .then(response => {
                post.title = response.data.data.title
                post.content = response.data.data.content
            }).catch(error => {
                 console.log(error.response.data)
            })
        });

       
        function update(){
             let config = {
                method: 'put',
                url: 'http://localhost:8000/api/post/' + route.params.id,
                headers: { 
                    'Accept': 'application/vnd.api+json', 
                    'Authorization': 'Bearer '+ store.getters['auth/getToken']
                },
                data: post
            };
            axios(config).then(() => {
                 router.push({
                     name: 'post.index'
                 })
            }).catch(error => {
                validation.value = error.response.data;
                console.log(error);
            })
        }
        return {
            post,
            validation, 
            router,
            update
        }
    }

}
</script>

<style>

</style>