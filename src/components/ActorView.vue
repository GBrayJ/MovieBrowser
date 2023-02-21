<template>
  <div class="flex flex-col items-center justify-center bg-gray-100 min-h-screen">
    <div class="max-w-2xl bg-white border-2 border-gray-300 p-5 rounded-md tracking-wide shadow-lg">
      <div>
      </div>
      <div id="header" class="flex flex-col items-center divide-solid divide-y">
        <div class="">
          <img alt="movie poster" class="m-2 w-45 rounded-md border-2 border-gray-300 sm:h-72 md:h-96 lg:max-2xl:h-96"
               height="200px" :src="actor.imageurl"/>
        </div>
        <div id="body" class="flex flex-col ml-5">
          <div>
            <h4 id="name" class="text-xl font-semibold mb-2">{{ actor.name }}</h4>
            <div id="rating_bar"></div>
          </div>
          <p id="description" class="text-gray-800 mt-2">{{ actor.description }}</p>
          <span
                 class="px-4 py-2 rounded-full text-gray-500 bg-gray-200 font-semibold text-sm flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease"
                v-for="movie in movies" :key="movie.name">
          <router-link :to="'/movies/' + movie.objectID">
            {{ movie.moviename }}
          </router-link>
          </span>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "actorview",
  props: {
    actor: Object,
    movies: Array
  },
  mounted() {
    console.log(this.movies)
  }
}
</script>

<style scoped>

</style>