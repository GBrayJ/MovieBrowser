<template>
  <movie-form @submitClicked="submitForm"></movie-form>
</template>

<script>
import MovieForm from "../components/MovieForm.vue";

import axios from "axios";

export default {
  name: "submit",
  components: {MovieForm},
  data() {
    return {
      movie: {},
    };
  },
  methods: {
    submitForm(movie) {
      let options = {
        method: 'POST',
        url: 'https://moviebrowserbackend.onrender.com/data/movie/new',
        headers: {'Content-Type': 'application/json'},
        data: {
          name: movie.moviename,
          descriptiontext: movie.descriptiontext,
          rating: movie.rating,
          imageurl: movie.imageurl,
          year: movie.year,
          genre: movie.genre,
          director: movie.director,
          actors: movie.actors
        }
      };
      axios.request(options).then(function (response) {
        if(response.data.objectID) {
          window.location = "/#/movies/" + response.data.objectID
        } else {
          alert(response.data)
        }
      }).catch(function (error) {
        console.error(error);
      });
    }
  }
}
</script>

<style scoped>

</style>