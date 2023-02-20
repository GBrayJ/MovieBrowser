<template>
  <div class="flex flex-col items-center justify-center bg-gray-100 min-h-screen">
    <div class="max-w-2xl bg-white border-2 border-gray-300 p-5 rounded-md tracking-wide shadow-lg">
      <div>
      </div>
      <div id="header" class="flex flex-col items-center divide-solid divide-y">
        <div class="">
          <img alt="movie poster" class="m-2 w-45 rounded-md border-2 border-gray-300 sm:h-72 md:h-96 lg:max-2xl:h-96"
               height="200px" :src="movie.imageurl"/>
        </div>
        <div id="body" class="flex flex-col ml-5">
          <div>
            <h4 id="name" class="text-xl font-semibold mb-2">{{ movie.moviename }}</h4>
            <div id="rating_bar"></div>
          </div>
          <p id="rating" class="text-gray-800 mt-2">Rating: {{ movie.rating }}/10</p>
          <p id="genre" class="text-gray-800 mt-2">{{ movie.genre }}</p>
          <p id="year" class="text-gray-800 mt-2">{{ movie.year }}</p>
          <p id="description" class="text-gray-800 mt-2">{{ movie.description }}</p>
          <p id="actors" class="text-gray-800 mt-2">

            <span
                class="px-4 py-2 rounded-full text-gray-500 bg-gray-200 font-semibold text-sm flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease"
                v-for="actor in actors" :key="actor.name">
              <router-link :to="'/actor/' + actor.objectID">
              {{ actor.name }}
              </router-link>
            </span>
          </p>
          <p id="director" class="text-gray-800 mt-2">{{ movie.director }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "movieinfo",
  props: {
    movie: Object,
    actors: Array,
  },
  mounted() {
    setTimeout(() => {
      this.getRatingBar();
    }, 200);
  },
  methods: {
    getRatingBar() {
      let ratingBar = document.getElementById("rating_bar");
      // Clear any existing content in the div
      ratingBar.innerHTML = "";
      // Create a div element to hold the stars
      let stars = document.createElement("span");
      // Set the class attribute to "flex flex-row"
      stars.className = "flex flex-row";
      // Loop through the rating and add a star for each point
      for (let i = 0; i < parseInt(this.movie.rating).toFixed(0); i++) {
        // Create an img element for each star
        let star = document.createElement("img");
        // Set the source attribute to a star image url
        star.src = '/star.png';
        // Set the width and height attributes to 20 pixels
        star.width = 30;
        star.height = 20;
        // Append the star to the div element
        stars.appendChild(star);
      }
      for (let i = 0; i < (10 - parseInt(this.movie.rating).toFixed(0)); i++) {
        let star = document.createElement("img");
        star.src = '/star_empty.png';
        star.width = 30;
        star.height = 20;
        stars.appendChild(star)
      }
      // Append the div element to the rating bar element
      ratingBar.appendChild(stars);
    },
  },
}
</script>

<style scoped>
</style>