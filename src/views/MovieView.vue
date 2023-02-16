<template>
<movieinfo :movie="movie"></movieinfo>
</template>
<script>
import axios from "axios";
import Movieinfo from "../components/movieinfo.vue";

export default {
  name: "MovieView",
  components: {Movieinfo},
  mounted() {
    this.getMovie();
  },
  methods: {
    async getMovie() {
      const response = await axios.get(
          `http://localhost:3000/data/movie/` + this.$route.params.id
      ).then((response) => {
        console.log(response)
        this.movie = response.data
      })
    },
  },
  data() {
    return {
      movie: {},
    };
  },
}
</script>

<style scoped>

</style>