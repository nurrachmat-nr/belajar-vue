import { createStore } from 'vuex'
import auth from './auth';
import createPersistedState from "vuex-persistedstate";
const store = createStore({
    modules: {
        auth
    },
    plugins: [
        createPersistedState({
            paths: ["auth"]
        })
    ]
});

export function useStore(){
    return store;
}

export default store;