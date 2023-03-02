<template>
  <div class="m-5">
  <ais-instant-search :search-client="searchClient" index-name="movies" id="search">
    <ais-search-box class="flex justify-center" v-slot="{ currentRefinement, isSearchStalled, refine  }">
      <input
          class="w-5/6  border-2 border-cyan-200 rounded p-2 m-2 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:border-transparent"
          placeholder="Search for a movie"
        type="search"
        :value="currentRefinement"
        @input="refine($event.target.value)"
      />
    </ais-search-box>
    <ais-infinite-hits>
    <template v-slot="{
      items,
      index,
      insights

    }">
      <div class="grid gap-2 grid-cols-3">
       <div v-for="item in items" :key="item.objectID" class="border-2 rounded mb-1 p-2 hover:bg-cyan-100 duration-200">
         <div>
         <span class="text-xl">
           {{ item.moviename }} ({{ item.year }})
         </span>
         </div>
         <div>
         <span>
           {{ item.description}}
         </span>
         </div>
         <div>
           <router-link :to="'/movies/' + item.objectID">
           <button class="rounded bg-cyan-200 hover:bg-cyan-300 p-2 m-2 duration-200">
             Get More Information About {{ item.moviename }}
           </button>
           </router-link>
         </div>
       </div>
      </div>
    </template>
    </ais-infinite-hits>
  </ais-instant-search>
  </div>
</template>

<script>
import algoliasearch from "algoliasearch";

export default {
  name: "search",
  data() {
    return {
      searchClient: algoliasearch(
        'P4GH5MJ3RF',
        '00a3ed928d4eeeccfde03e77ff280cdd'
      ),
    };
  },
}
</script>

<style scoped>

</style>