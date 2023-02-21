<template>
  <div class="bg-gradient-to-r from-blue-200 to-cyan-200 max-h-full min-h-screen w-full">
    <div class="flex flex-col">
      <div
          class="m-2 grid sm:grid-cols-2 sm:grid-rows-4 md:grid-cols-4 md:grid-rows-2 lg:max-2xl:grid-cols-8 lg:max-2xl:grid-rows-1">
        <grid-item v-for="movie in movies" :id="movie.objectID" :title="movie.moviename" :image="movie.imageurl"
                   :description="movie.description">hi
        </grid-item>
      </div>
      <div class="place-self-center">
        <router-link to="/submit">
          <button
              style="left:0;right:0;margin-left: auto;margin-right: auto;position: absolute; width: 40%"
              class="absolute z-10 sm:text-4xl md:text-4xl lg:text-5x xl:max-2xl:text-6x lm-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline bg-gradient-to-r from-indigo-400 to-cyan-400">
            Submit Actor Or Movie
          </button>
          <button
              style="left:0;right:0;margin-left: auto;margin-right: auto;position: absolute; width: 40%"
              class="z-20 absolute sm:text-4xl md:text-4xl lg:text-5x xl:max-2xl:text-6x lm-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline duration-300 hover:opacity-0">
            Submit Actor Or Movie
          </button>
        </router-link>
      </div>
    </div>
    <div
        style="position: relative;top: 60px;" class="m-2 flex flex-col place-items-center">
      <ais-instant-search :search-client="this.searchClient" index-name="movies">
        <ais-search-box>
          <template v-slot="{ currentRefinement, isSearchStalled, refine }">
            <input
                class="w-full m-2 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="search"
                placeholder="Search for movies..."
                @input="refine($event.currentTarget.value)"
            >
            <span :hidden="!isSearchStalled">Loading...</span>
          </template>
        </ais-search-box>
        <ais-hits>
          <template v-slot="{ items, sendEvent }">
            <div class="grid gap-4 m-2">
              <div v-for="item in items" :key="item.objectID"
                   class="bg-white flex flex-col rounded border-2 border-gray-300 h-full p-5 place-items-center shadow-xl">
                <router-link :to="'/movies/' + item.objectID">
                <p class="sm:max-md:text-xl lg:max-2xl:text-2xl">{{ item.moviename }}</p>
                </router-link>
              </div>
            </div>
          </template>
        </ais-hits>
      </ais-instant-search>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import GridItem from "../components/griditem.vue";
import algoliasearch from "algoliasearch";

export default {
  name: "LandingPage",
  components: {
    GridItem,
  },
  data() {
    return {
      movies: [],
      searchClient: algoliasearch(
          import.meta.env.VITE_APP_ALGOLIA_APP_ID,
          import.meta.env.VITE_APP_ALGOLIA_SEARCH_KEY
      ),
    };
  },
  methods: {
    callMovies() {
      axios.get(`https://moviebrowserbackend.onrender.com/data/movie/top/8`).then((response) => {
        console.log(response.data)
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
</style>