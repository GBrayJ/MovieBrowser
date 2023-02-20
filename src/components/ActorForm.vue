<template>
  <form name="actorForm" onsubmit="return false;" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <input
        class="m-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        name="actorName" type="text" placeholder="Actor Name" required/>
    <input
        class="m-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        name="description" type="text" placeholder="Description" required/>
    <input
        class="m-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        name="image" type="file" placeholder="Image Upload"/>
     <ais-instant-search :search-client="this.searchClient" index-name="movies">
      <ais-search-box>
        <template v-slot="{ currentRefinement, isSearchStalled, refine }">
          <input
              class="m-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="search"
              placeholder="Search for movies..."
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
              <p class="sm:max-md:text-xl lg:max-2xl:text-2xl">{{ item.moviename }}</p>
              <button @click="this.activeButtons.push(item.objectID)"
                      v-if="!this.activeButtons.includes(item.objectID)"
                      class="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Add To Actor
              </button>
              <button v-if="this.activeButtons.includes(item.objectID)" @click="removeString(item.objectID)"
                      class="m-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Remove From Actor
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
  name: "ActorForm",
  data: () => ({
    actorObject: {
      name: "",
      descriptiontext: "",
      imageurl: "",
      movies: []
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
      if (!document.actorForm.actorName.value || !document.actorForm.description.value || !document.actorForm.image.value) {
        alert("Please fill out all fields");
        return false;
      }
      console.log('Passes check')
      this.actorObject.name = document.actorForm.actorName.value;
      this.actorObject.descriptiontext = document.actorForm.description.value;
      if (this.activeButtons.length > 0) {
        this.actorObject.movies = this.activeButtons;
      }
      var input = document.actorForm.image;
      var e = input.files[0];
      if (e.name.toLowerCase().split(".").pop() !== "jpg" && e.name.toLowerCase().split(".").pop() !== "png") {
        alert("Image must be a jpg or png file");
        return false;
      }
      let imagesRef = ref(storage, `/actors/${e.name}`);

      uploadBytes(imagesRef, e).then((snapshot) => {
        console.log('Uploaded a blob or file!');
      }).then(stuff => {
        getDownloadURL(imagesRef).then((url) => {
          console.log(url)
          this.$emit("imageURL", url)
        }).catch((error) => {
          console.log(error);
        })
      })
      console.log('emit')
      this.$emit("submitClicked", this.actorObject);
    }
  }
}
</script>

<style scoped>

</style>