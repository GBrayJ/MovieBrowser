import {createRouter, createWebHashHistory} from 'vue-router'
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import routes from "./router/router.js";
import InstantSearch from 'vue-instantsearch/vue3/es';
import * as firebase from "firebase/app";
import "firebase/analytics";
import {env} from "process";

try {
firebase.initializeApp(env.VITE_FIREBASE_CONFIG);
analytics();

} catch (e) {
console.log(e);
}

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
