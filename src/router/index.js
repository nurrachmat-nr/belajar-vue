import { createRouter,  createWebHashHistory } from "vue-router";
import store from "../store";

const routes = [
    {
        path: "/login",
        name: "login",
        component: () => import('@/views/Login.vue')
    },
    {
        path: "/",
        name: "hallo",
        component: () => import('@/views/Hallo.vue')
    },
    {
        path: "/post/index",
        name: "post.index",
        component: () => import('@/views/post/Index.vue')
    },
    {
        path: "/post/create",
        name: "post.create",
        component: () => import('@/views/post/Create.vue')
    },
    {
        path: "/post/update/:id",
        name: "post.update",
        component: () => import('@/views/post/Update.vue')
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = store.getters["auth/isAuthenticated"];
    if(to.name != 'login' && !isAuthenticated) next({name: "login"})
    else next();
});

/*router.afterEach((to, from, next) => {
    const isAuthenticated = store.getters["auth/isAuthenticated"];
    if(to.name != 'login' && !isAuthenticated) next({name: "login"})
    else next();
})*/

export default router;