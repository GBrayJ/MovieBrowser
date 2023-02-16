<template>
  <landinghero @searchClicked="searchClicked" id="hero"></landinghero>
  <search v-if="searchShown" id="search"></search>
</template>

<script >
import Landinghero from "../components/landinghero.vue";
import search from "../components/search.vue";
export default {
  name: "LandingPage",
  components: {
    Landinghero,
    search
  },
  data() {
    return {
      searchShown: false,
    };
  },
  methods: {
    async searchClicked() {
      this.searchShown = !this.searchShown;
      console.log(this.searchShown)
      await this.$nextTick();
      if (this.searchShown) {
        window.scrollTo({
          top: (document.getElementById("search").offsetTop),
          behavior: "smooth",
        })
      } else {
        window.scrollTo({
          top: document.getElementById("hero").offsetTop,
          behavior: "smooth",
        })
      }
    }
  },
}
</script>

<style scoped>
.hideElement{
  display: none;
}
</style>