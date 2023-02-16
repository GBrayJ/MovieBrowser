<template>
<div class="flex flex-col items-center justify-center bg-gray-100 min-h-screen">
    <div class="max-w-2xl bg-white border-2 border-gray-300 p-5 rounded-md tracking-wide shadow-lg">
      <div>
        <router-link to="/" class="m-2 pb-2">
          <button class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Go Home</button>
        </router-link>
      </div>
      <div id="header" class="flex">
        <img alt="movie poster" class="w-45 rounded-md border-2 border-gray-300 h-1/4" :src="movie.imageurl"/>
        <div id="body" class="flex flex-col ml-5">
          <h4 id="name" class="text-xl font-semibold mb-2">{{ movie.moviename }}</h4>
          <p id="rating" class="text-gray-800 mt-2">Rating: {{ movie.rating }}/10</p>
          <p id="genre" class="text-gray-800 mt-2">{{ movie.genre }}</p>
          <p id="year" class="text-gray-800 mt-2">{{ movie.year }}</p>
          <p id="description" class="text-gray-800 mt-2">{{ movie.description }}</p>
          <p id="actors" class="text-gray-800 mt-2">{{ movie.actors }}</p>
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
  },
}
</script>

<style scoped>

</style>