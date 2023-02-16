<template>
  <form name="movieForm" onsubmit="return false;" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <input
        class="m-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        name="movieName" type="text" placeholder="Movie Name" required/>
    <input
        class="m-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        name="year" type="number" placeholder="Year" required/>
    <input
        class="m-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        name="description" type="text" placeholder="Description" required/>
    <input
        class="m-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        name="imageURL" type="url" placeholder="Image URL"/>
    <input
        class="m-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        name="genre" type="text" placeholder="Genre" required/>
    <input
        class="m-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        name="rating" type="number" placeholder="Rating" required/>
    <input
        class="m-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        name="director" type="text" placeholder="Director"/>
    <input
        class="m-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        name="actors" type="text" placeholder="Actors"/>
    <input
        class="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit" value="Submit" @click="submitForm"/>
  </form>
</template>

<script>
export default {
  name: "MovieForm",
  data: () => ({
    movieObject: {
      moviename: "",
      year: "",
      description: "",
      imageURL: "",
      genre: "",
      rating: "",
      director: "",
      actors: ""
    }
  }),
  methods: {
    submitForm() {
      if (isNaN(document.movieForm.rating.value) || document.movieForm.rating.value < 1 || document.movieForm.rating.value > 10) {
        alert("Rating must be a number between 1 and 10");
        return false;
      }
      if (isNaN(document.movieForm.year.value) || document.movieForm.year.value < 1900 || document.movieForm.year.value > 2021) {
        alert("Year must be a number between 1900 and 2021");
        return false;
      }
      this.movieObject.moviename = document.movieForm.movieName.value;
      this.movieObject.year = document.movieForm.year.value;
      this.movieObject.descriptiontext = document.movieForm.description.value;
      this.movieObject.imageURL = document.movieForm.imageURL.value;
      this.movieObject.genre = document.movieForm.genre.value;
      this.movieObject.rating = document.movieForm.rating.value;
      this.movieObject.director = document.movieForm.director.value;
      this.movieObject.actors = document.movieForm.actors.value;
      this.$emit("submitClicked", this.movieObject);
    }
  }
}
</script>

<style scoped>

</style>