<template>
<div class="w-auto h-screen bg-gradient-to-r from-cyan-500 to-blue-500">
  <div class="flex flex-col justify-center h-full place-items-center">
    <h1 class="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl 2xl:text-6xl">
      Welcome to <span class="inline-block hover:text-transparent bg-gradient-to-r from-cyan-200 to-cyan-300 bg-clip-text duration-200 hover:text-4xl sm:hover:text-5xl md:hover:text-6xl lg:hover:text-7xl xl:hover:text-7xl 2xl:hover:text-7xl"> Movie Browser </span>
    </h1>
    <div class="p-2 m-2">
    <button @click="$emit('searchClicked')" class="inline bg-gradient-to-r from-slate-600 to-slate-700 rounded mt-5 p-2 hover:from-blue-800 hover:to-blue-900">
      <a class="duration-200 text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl 2xl:text-5xl hover:2xl:text-6xl hover:xl:text-6xl hover:lg:text-6xl hover:md:text-5xl hover:sm:text-4xl">Find A Movie</a>
    </button>
      <router-link to="/submit">
      <button class="ml-2 inline bg-gradient-to-r from-slate-600 to-slate-700 rounded mt-5 p-2 hover:from-blue-800 hover:to-blue-900">
        <a class="duration-200 text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl 2xl:text-5xl hover:2xl:text-6xl hover:xl:text-6xl hover:lg:text-6xl hover:md:text-5xl hover:sm:text-4xl">Submit a movie!</a>
      </button>
      </router-link>
      </div>
  </div>
</div>
</template>

<script>
export default {
  name: "landinghero"
}
</script>

<style scoped>

</style>