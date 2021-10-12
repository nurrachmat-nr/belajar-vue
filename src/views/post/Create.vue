<template>
  <div class="container mt-5">
      <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>TAMBAH POST</h4>
                        <hr>

                        <form @submit.prevent="store">
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
import { reactive,ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios';
export default {
    setup(){
        const post  = reactive({
            title: '',
            content: ''
        });

        const validation = ref([]);
        const router =  useRouter();
        function store(){
            axios.post('http://localhost:8000/api/post', post).then(() => {
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
            store
        }
    }

}
</script>

<style>

</style>