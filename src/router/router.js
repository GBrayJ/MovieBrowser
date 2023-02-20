import LandingPage from "../views/LandingPage.vue";
import MovieView from "../views/MovieView.vue";
import submit from "../views/submit.vue";
import ActorView from "../views/ActorView.vue";
const routes = [
    { path: '/', component: LandingPage },
    { path: '/movies/:id', component: MovieView},
    { path: '/submit' , component: submit},
    { path: '/actor/:id', component: ActorView},
];

export default routes;