import axios from "axios";

const state = () => {
    return {
        token: "",
        username: "",
        role: "",
        division: null,
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
    }
}

const getters = {
    getToken: state => state.token,
    getUsername: state => state.username,
    getRole: state => state.role,
    getDivision: state => state.division,
    isAuthenticated: state => {
        state.token.length > 0
    }
}

//dipanggil menggunakan dispatch
const actions = {
    LogIn({commit}, user){
        axios.post('http://localhost:8000/auth/login', user).then(response => {
                commit("setToken", response.data);
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
              'Authorization': 'Bearer '+ getters.getToken()
            }
          };
          
          axios(config)
          .then(response => {
              commit("setUser", response.data.data);
          })
          .catch(function (error) {
            console.log(error);
          });
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}