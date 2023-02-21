<template>
  <div class="flex justify-center flex-row">
    <select @change="printText" v-model="selOption"
            class="ml-2 mr-2 mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-5/6 p-2.5">
      <option value="" disabled selected>Select an option</option>
      <option value="movie">Movie</option>
      <option value="actor">Actor</option>
    </select>
  </div>
  <transition appear>
    <movie-form class="m-2" @submitClicked="submitForm" @imageURL="movieURL" v-if="selOption == 'movie'"></movie-form>
  </transition>
  <transition appear>
    <actor-form class="m-2" @submitClicked="beforeSubmitActor" @imageURL="actorIRL"
                v-if="selOption == 'actor'"></actor-form>
  </transition>
</template>

<script>
import MovieForm from "../components/MovieForm.vue";

import axios from "axios";
import ActorForm from "../components/ActorForm.vue";

export default {
  name: "submit",
  components: {ActorForm, MovieForm},
  data() {
    return {
      movie: {},
      imageURL: "",
      selOption: '',
      actorURL: "",
      newActors: [],
    };
  },
  methods: {
    printText() {
      console.log(this.selOption)
    },
    async movieURL(url) {
      this.imageURL = url
    },
    actorIRL(url) {
      this.actorURL = url
    },
    submitForm(movie) {
      console.log("submit form")
      console.log(movie.actors)
      let options = {
        method: 'POST',
        url: 'https://moviebrowserbackend.onrender.com/data/movie/new',
        headers: {'Content-Type': 'application/json'},
        data: {
          name: movie.moviename,
          descriptiontext: movie.descriptiontext,
          rating: movie.rating,
          imageurl: this.imageURL,
          year: movie.year,
          genre: movie.genre,
          director: movie.director,
          actors: movie.actors
        }
      };
      axios.request(options).then(function (response) {
        for (let i = 0; i < movie.actors.length; i++) {
          axios.get(`https://moviebrowserbackend.onrender.com/actors/${movie.actors[i]}`).then((responsetwo) => {
            let newdata = responsetwo.data.movies
            newdata.push(response.data.objectID)
            let options = {
              method: 'PUT',
              url: `https://moviebrowserbackend.onrender.com/actors/${movie.actors[i]}`,
              headers: {'Content-Type': 'application/json'},
              data: {
                movies: newdata
              }
            };
            axios.request(options).then(function (response) {
              console.log(response.data);
            }).catch(function (error) {
              console.error(error);
            });
          })
        }
        if (response.data.objectID) {
          window.location = "/#/movies/" + response.data.objectID
        } else {
          alert(response.data)
        }
      }).catch(function (error) {
        console.error(error);
      });
    },
    beforeSubmitActor(actor) {
      setTimeout(() => {
        this.submitActor(actor)
      }, 500)
    },
    submitActor(actor) {
      let options = {
        method: 'POST',
        url: 'https://moviebrowserbackend.onrender.com/actors/new',
        headers: {'Content-Type': 'application/json'},
        data: {
          name: actor.name,
          description: actor.descriptiontext,
          imageURL: this.actorURL,
          movies: actor.movies
        }
      }
      axios.request(options).then(function (response) {
        if (response.data.objectID) {
          for (let i = 0; i < actor.movies.length; i++) {
            axios.get(`https://moviebrowserbackend.onrender.com/data/movie/${actor.movies[i]}`).then((responsetwo) => {
              console.log(response.data)
              console.log(response.data.objectID)
              console.log(`actors: ${responsetwo.data.actors}`)
              let newdata = responsetwo.data.actors
              console.log(newdata)
              newdata.push(response.data.objectID)
              console.log(newdata)
              let options = {
                method: 'PUT',
                url: `https://moviebrowserbackend.onrender.com/data/movie/actor/${actor.movies[i]}`,
                headers: {'Content-Type': 'application/json'},
                data: {
                  actors: newdata
                }
              }
              axios.request(options).then(function (response) {
                console.log(response.data)
              }).catch(function (error) {
                console.error(error);
              });
            }).catch((error) => {
              console.log(error)
            })

          }
          window.location = "/#/actor/" + response.data.objectID
        } else {
          alert(response.data)
        }
      }).catch(function (error) {
        console.error(error);
      });
      console.log(actor.movies)
    },
  }
}
</script>

<style>
.v-enter-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>