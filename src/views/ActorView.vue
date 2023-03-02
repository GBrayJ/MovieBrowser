<template>
  <div>
    <actorview :actor="this.actor" :movies="this.movies"></actorview>
  </div>
</template>

<script>
import axios from "axios";
import actorview from "../components/ActorView.vue";
export default {
  name: "ActorView",
  mounted() {
    this.getActor();
  },
  methods: {
    getActor() {
      axios.get(`https://moviebrowserbackend.onrender.com/actors/` + this.$route.params.id).then((response) => {
        this.actor = response.data.actor_info
        if(response.data.movies.length < 0) {
          return;
        }
        for (let i = 0; i < response.data.movies.length; i++) {
          this.getMovie(response.data.movies[i]).then((responsetwo) => {
            console.log(this.movies)
            responsetwo.objectID = response.data.movies[i],
            this.movies.push(responsetwo)
          })
        }
      })
    },
    async getMovie(id) {
      let promise = new Promise((resolve, reject) => {
        try {
          axios.get(`https://moviebrowserbackend.onrender.com/data/movie/` + id).then((response) => {
            resolve(response.data)
          })
        }
        catch (err) {
          reject(err)
        }
      })
      return promise;
    }
  },
  data() {
    return {
      actor: {

      },
      movies: [],
    };
  },
  components: {
  actorview
  }
}
</script>

<style scoped>

</style>