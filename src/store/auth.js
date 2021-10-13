import axios from "axios";
import router from "../router";
import HTTP from "../service/HTTP";

const state = () => {
    return {
        token: "",
        username: "",
        role: "",
        division: null,
        jk: ""
    }
}
//dipanggil menggunaan commit
const mutations = {
    setToken: (state, data) => {
        state.token = data.access_token;
    },
    setUser: (state, data) => {
        state.username = data.username;
        state.role = data.role;
        state.division = data.division.name;
    },
    clearState: (state) =>{
        state.token = "";
        state.username = "";
        state.role = "";
        state.division = null;
    },
    setJK: (state, jk) => {
        state.jk = jk;
    }
}

const getters = {
    getToken: state => state.token,
    getUsername: state => state.username,
    getRole: state => state.role,
    getDivision: state => state.division,
    isAuthenticated: state => state.token.length > 0 ||  state.token != ""
}

//dipanggil menggunakan dispatch
const actions = {
    LogIn({commit, dispatch}, user){
        axios.post('http://localhost:8000/api/auth/login', user).then(response => {
                commit("setToken", response.data);
                dispatch("AuthMe");
                router.push({name: 'hallo'});
            }).catch(error => {
                console.log(error);    
            })
    },
    AuthMe({commit, getters}){
        let config = {
            method: 'get',
            url: 'http://localhost:8000/api/auth/me',
            headers: { 
              'Accept': 'application/vnd.api+json', 
              'Authorization': 'Bearer '+ getters.getToken
            }
          };
          
          axios(config)
          .then(response => {
              commit("setUser", response.data.data);
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    LogOut({commit}){
        HTTP.post("/auth/logout", {}).then(() => {
            commit("clearState");
            router.push({name: 'login'});
        }).catch(() => {
            console.log("Logout Gagal");
        })        
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}