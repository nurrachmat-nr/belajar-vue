import { createStore } from 'vuex'
import auth from './auth';
const store = createStore({
    modules: {
        auth
    },
    plugins: []
});

export function useStore(){
    return store;
}

export default store;