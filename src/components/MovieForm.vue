<template>
  <form>
<input v-bind="this.moviename" type="text" placeholder="Movie Name" />
<input v-bind="this.year" type="number" placeholder="Year" />
<input v-bind="this.description" type="text" placeholder="Description" />
<input v-bind="this.imageURL" type="url" placeholder="Image URL" />
<input v-bind="this.genre" type="text" placeholder="Genre" />
<input v-bind="this.rating" type="number" placeholder="Rating" />
<input v-bind="this.director" type="text" placeholder="Director" />
<input v-bind="this.actors" type="text" placeholder="Actors" />
    <input type="submit" value="Submit" @click="submitForm"/>
  </form>
</template>

<script>
export default {
  name: "MovieForm",
  data: () => ({
      moviename: "",
      year: "",
      description: "",
      imageURL: "",
      genre: "",
      rating: "",
      director: "",
      actors: ""
  }),
  methods: {
    submitForm() {

    }
  }
}
</script>

<style scoped>

</style>