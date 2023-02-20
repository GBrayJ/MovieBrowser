<template>
  <movieinfo :movie="this.movie" :actors="this.actors"></movieinfo>
</template>
<script>
import axios from "axios";
import movieinfo from "../components/movieinfo.vue";

export default {
  name: "MovieView",
  components: {movieinfo},
  mounted() {
    this.getMovie();
  },
  methods: {
    async getMovie() {
      const response = await axios.get(
          `https://moviebrowserbackend.onrender.com/data/movie/` + this.$route.params.id
      ).then((response) => {
        console.log(response)
        this.movie = response.data
        this.getActors()
      })
    },
    async getActors() {
      for (let i = 0; i < this.movie.actors.length; i++) {
        try {
          await axios.get(
              `https://moviebrowserbackend.onrender.com/actors/` + this.movie.actors[i]
          ).then((response) => {
              this.actors[i] = response.data
              this.actors[i].name = response.data.actor_info.name




          })
        } catch (err) {
          console.log(err)
        }
      }
    }
  },
  data() {
    return {
      movie: {},
      actors: [],
    };
  },
}
</script>

<style scoped>

</style>