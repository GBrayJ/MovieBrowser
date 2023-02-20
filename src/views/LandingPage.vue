<template>
  <div>
  <div class="grid md:max-2xl:grid-cols-4 md:max-xl:grid-rows-2 2xl:grid-rows-1 2xl:grid-cols-8 sm:grid-cols-2 sm:grid-rows-4 gap-4">
<grid-item v-for="movie in movies" :key="movie.objectID" :id="movie.objectID" :title="movie.moviename" :image="movie.imageurl" :description="movie.description"/>
  </div>
    <search v-if="searchShown" id="search"></search>
  </div>

</template>

<script >
import Landinghero from "../components/landinghero.vue";
import search from "../components/search.vue";
import axios from "axios";
import GridItem from "../components/griditem.vue";
export default {
  name: "LandingPage",
  components: {
    GridItem,
    Landinghero,
    search
  },
  data() {
    return {
      searchShown: false,
      movies: [],
    };
  },
  methods: {
    callMovies() {
      axios.get(`https://moviebrowserbackend.onrender.com/data/movie/top/8`).then((response) => {
        this.movies = response.data
      })
    }
  },
  mounted() {
    this.callMovies()
  }
}
</script>

<style scoped>
.hideElement{
  display: none;
}
</style>