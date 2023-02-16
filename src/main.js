import {createRouter, createWebHashHistory} from 'vue-router'
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import routes from "./router/router.js";
import InstantSearch from 'vue-instantsearch/vue3/es';


const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

createApp(App, {
    // searchClient: algoliasearch(
    //     `P4GH5MJ3RF`,
    //     `00a3ed928d4eeeccfde03e77ff280cdd`
    //     )
}).use(InstantSearch).use(router).mount('#app')
