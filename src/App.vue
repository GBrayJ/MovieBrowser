<<<<<<< HEAD
<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
}
</script>
=======
<script setup>

import NavBar from "./components/NavBar.vue";
</script>

<template>
  <nav-bar/>
  <router-view/>
</template>

<style scoped>

</style>
>>>>>>> 3603344d6f34a2d2d23e7499847610780649d7ef
