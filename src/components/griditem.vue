<template>
  <div class="md:h-fit flex place-items-center flex-col bg-white shadow-md border border-gray-200 rounded-lg max-w-sm">
    <router-link :to="'/movies/' + id">
    <img class="rounded-t-lg sm:h-14 md:h-96 lg:max-2xl:h-96" :src="image" alt="Movie Thumbnail">
    </router-link>
    <div class="p-5">
        <h5 class="text-gray-900 font-bold text-2xl tracking-tight mb-2">{{ title }}</h5>
      <p class="font-normal text-gray-700 mb-3 dark:text-gray-400">
      {{ description }}
      </p>
      <router-link :to="'/movies/' + id">
      <svg class="-mr-1 ml-2 h-4 w-4" fill="white" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clip-rule="evenodd"></path>
        </svg>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "GridItem",
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>

</style>