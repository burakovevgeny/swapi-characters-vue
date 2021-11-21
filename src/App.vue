<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapGetters } from "vuex";
import { APIStatus } from "./models";

export default Vue.extend({
  name: "App",
  async mounted() {
    if (this.status !== APIStatus.Success) {
      await this.setPeople();
    }
  },
  created() {
    this.addFavoriteToLocalStore();
  },
  computed: {
    ...mapGetters({
      status: "getStatus",
    }),
  },
  methods: {
    ...mapActions({
      setPeople: "setPeople",
      addFavoriteToLocalStore: "addFavoriteToLocalStore",
    }),
  },
});
</script>
