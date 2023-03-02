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
        name="image" type="file" placeholder="Image Upload"/>
    <input
        class="m-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        name="genre" type="text" placeholder="Genre" required/>
    <input
        class="m-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        name="rating" type="number" placeholder="Rating" step="0.1" required/>
    <input
        class="m-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        name="director" type="text" placeholder="Director"/>
    <ais-instant-search :search-client="this.searchClient" index-name="actors">
      <ais-search-box>
        <template v-slot="{ currentRefinement, isSearchStalled, refine }">
          <input
              class="m-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="search"
              placeholder="Search for actors..."
              @input="refine($event.currentTarget.value)"
          >
          <span :hidden="!isSearchStalled">Loading...</span>
        </template>
      </ais-search-box>
      <ais-hits>
        <template v-slot="{ items, sendEvent }">
          <div class="inline-grid 2xl:grid-cols-8 lg:max-xl:grid-cols-6 md:grid-cols-4 sm:grid-cols:2 gap-4 m-2">
            <div v-for="item in items" :key="item.objectID"
                 class="flex flex-col rounded border-2 border-gray-300 h-full p-5 place-items-center shadow-xl">
              <p class="sm:max-md:text-xl lg:max-2xl:text-2xl">{{ item.actor_info.name }}</p>
              <button @click="this.activeButtons.push(item.objectID)"
                      v-if="!this.activeButtons.includes(item.objectID)"
                      class="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Add To Movie
              </button>
              <button v-if="this.activeButtons.includes(item.objectID)" @click="removeString(item.objectID)"
                      class="m-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Remove From Movie
              </button>
            </div>
          </div>
        </template>
      </ais-hits>
    </ais-instant-search>
    <input
        class="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit" value="Submit" @click="submitForm"/>
  </form>
</template>

<script>

import {initializeApp} from 'firebase/app';
import {getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";
import algoliasearch from "algoliasearch";

const app = initializeApp(JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG));
let storage = getStorage(app);

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
      actors: [],
    },
    activeButtons: [],
    searchClient: algoliasearch(
        import.meta.env.VITE_APP_ALGOLIA_APP_ID,
        import.meta.env.VITE_APP_ALGOLIA_SEARCH_KEY
    ),
  }),
  methods: {
    removeString(string) {
      this.activeButtons = this.activeButtons.filter(item => item !== string)
    },
    submitForm() {
      if (isNaN(document.movieForm.rating.value) || document.movieForm.rating.value < 1 || document.movieForm.rating.value > 10) {
        alert("Rating must be a number between 1 and 10");
        return false;
      }
      if (isNaN(document.movieForm.year.value) || document.movieForm.year.value < 1900 || document.movieForm.year.value > 2023) {
        alert("Year must be a number between 1900 and 2023");
        return false;
      }
      if (this.activeButtons.length > 0) {
        this.movieObject.actors = this.activeButtons;
      }
      var input = document.movieForm.image;
      var e = input.files[0];
      if (e.name.toLowerCase().split(".").pop() !== "jpg" && e.name.toLowerCase().split(".").pop() !== "png") {
        alert("Image must be a jpg or png file");
        return false;
      }
      let imagesRef = ref(storage, `/images/${e.name}`);

      uploadBytes(imagesRef, e).then((snapshot) => {
        console.log('Uploaded a blob or file!');
      }).then(stuff => {getDownloadURL(imagesRef).then((url) => {
        console.log(url)
        this.$emit("imageURL", url)
      }).catch((error) => {
        console.log(error);
      })})


      this.movieObject.moviename = document.movieForm.movieName.value;
      this.movieObject.year = document.movieForm.year.value;
      this.movieObject.descriptiontext = document.movieForm.description.value;
      this.movieObject.genre = document.movieForm.genre.value;
      this.movieObject.rating = document.movieForm.rating.value;
      this.movieObject.director = document.movieForm.director.value;
      this.$emit("submitClicked", this.movieObject);
    }
  },
  components: {
  }
}
</script>

<style scoped>

</style>