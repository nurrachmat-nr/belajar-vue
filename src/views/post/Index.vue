<template>
  <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>DATA POST</h4>
                        <hr>
                        <router-link :to="{name: 'post.create'}" class="btn btn-md btn-success">TAMBAH POST</router-link>

                        <div class="alert alert-danger" role="alert" v-if="posts.length == 0">
                            Data Post tidak ditemukan!
                        </div>

                        <div class="alert alert-warning" role="alert" v-if="pesandelete">
                            {{ pesandelete }}
                        </div>

                        <table class="table table-striped table-bordered mt-4">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">TITLE</th>
                                    <th scope="col">CONTENT</th>
                                    <th scope="col">OPTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(post, index) in posts" :key="index" >
                                    <td>{{ post.title }}</td>
                                    <td>{{ post.content }}</td>
                                    <td>
                                         <router-link :to="{name: 'post.update', params: {id: post.id} }" 
                                        class="btn btn-sm btn-warning mr-2">EDIT</router-link>
                                        <button @click.prevent="postDelete(post.id)"  
                                        class="btn btn-sm btn-danger ml-2">DELETE</button>
                                    </td>  
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
//import axios from 'axios'
import { onMounted, ref } from '@vue/runtime-core';
//import { useStore } from 'vuex';
import HTTP from "@/service/HTTP"
export default {
    name: "",
    props: {
        //buat var global / reactive / tidak mutable 
    },
    data() {
        //buat var lokal
        return {
            namadepan: "Nur",
            namabelakang: "Rachmat"
        }
    },
    setup() {
        //composition api
        //reactive
        let posts = ref([]);
        let pesandelete = ref();
        //const store =  useStore();
        onMounted(() => {
            /*let config = {
                method: 'get',
                url: 'http://localhost:8000/api/post',
                headers: { 
                    'Accept': 'application/vnd.api+json', 
                    'Authorization': 'Bearer '+ store.getters['auth/getToken']
                }
            };
            axios(config)
            .then(response => {
                posts.value = response.data.data
            }).catch(error => {
                 console.log(error.response.data)
            })*/

            HTTP.get("/post").then(response => {
                posts.value = response.data.data
            }).catch(error => {
                console.log(error.response.data)
            })

            /*var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };*/

            /*fetch("http://localhost:8000/api/post", requestOptions)
                .then(response => response.json())
                .then(result => {
                    posts.value = result.data
                })
                .catch(error => console.log('error', error));*/
        });

        //method delete
       function postDelete(id) {
           HTTP.delete("/post/" + id).then((result) => {                        
                //splice posts 
                posts.value.splice(posts.value.indexOf(id), 1);
                pesandelete.value = result.data.message;
                console.log(pesandelete);
                }).catch(error => {
                    console.log(error.response.data)
                })
            //delete data post by ID
            /*axios.delete(`http://localhost:8000/api/post/${id}`)
            .then((result) => {                        
                //splice posts 
                posts.value.splice(posts.value.indexOf(id), 1);
                pesandelete.value = result.data.message;
                console.log(pesandelete);
                }).catch(error => {
                    console.log(error.response.data)
                })*/
        }

        return {
            posts,
            postDelete,
            pesandelete
        }
    },
    mounted() {
        //dijalankan ketika halaman berhasil ditapilkan di browser
        console.log(this.namalengkap);
    },
    watch: {
        //mendeteksi perubahan value pada data     
        namabelakang(){ }
    },
    computed: {
        //untuk membuat data/variable yg sifatnya read only
        namalengkap(){
            return this.namadepan + " " + this.namabelakang
        }
    },
    methods: {
        //membuat method
        hitungUmur(){
            console.log("Umur Anda 17 tahun");
        },
        hitungGaji(){
            console.log("Umur Anda 17 tahun");
        },
    }
}
</script>

<style>

</style>