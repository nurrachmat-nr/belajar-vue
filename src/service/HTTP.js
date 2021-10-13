import axios from "axios";
import store from "../store";

const HTTP =  axios.create({
    baseURL:  'http://localhost:8000/api/',
    headers: {
        "Content-Type" : "application/json"
    }
})

HTTP.interceptors.request.use(req => {
    const isAuthenticated = store.getters["auth/isAuthenticated"];
    if(isAuthenticated){
        req.headers.Authorization = 'Bearer '+ store.getters['auth/getToken']
    }
    return req;
});

export default HTTP;