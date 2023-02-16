import LandingPage from "../views/LandingPage.vue";
import MovieView from "../views/MovieView.vue";
import submit from "../views/submit.vue";
const routes = [
    { path: '/', component: LandingPage },
    { path: '/movies/:id', component: MovieView},
    { path: '/submit' , component: submit}
];

export default routes;