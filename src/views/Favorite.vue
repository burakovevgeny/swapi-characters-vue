<template>
  <Layout>
    <CharactersFilter
      v-model="search"
      :characters="favorites"
      :filter="gender"
      @change="handleGenderChange"
    />
    <div class="card-wrapper">
      <div v-if="!getPaginatedItems.paginatedPeople.length">
        <h2 class="card-wrapper__title">No data to display, Jedi!</h2>
      </div>
      <Card
        v-for="paginated in getPaginatedItems.paginatedPeople"
        :id="paginated.id"
        :name="paginated.name"
        :planet="paginated.homeworld.name"
        :key="paginated.id"
        :favorite="checkIsFavorite(paginated.name)"
      />
    </div>
    <Paginator
      v-model="page"
      :pageSize="pageSize"
      :total="getPaginatedItems.total"
    />
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import Layout from "@/shared/Layout.vue";
import CharactersFilter from "@/shared/Filter.vue";
import Paginator from "@/shared/Paginator.vue";
import Card from "@/shared/Card.vue";
import { mapGetters } from "vuex";
import { Gender, People } from "@/models";
import { filterPeople, paginateArray } from "@/helpers";

export default Vue.extend({
  name: "Favorite",
  components: { Layout, CharactersFilter, Card, Paginator },
  data() {
    return {
      filteredCharacters: [] as People[],
      search: "",
      gender: Gender.ALL,
      page: 1,
      pageSize: 10,
    };
  },
  watch: {
    search: {
      handler(search: string) {
        this.filteredCharacters = filterPeople(
          this.favorites,
          this.gender,
          search
        );
        this.page = 1;
      },
    },
    favorites: {
      immediate: true,
      handler(value: People[]) {
        this.filteredCharacters = value;
      },
    },
  },
  computed: {
    ...mapGetters({
      characters: "getCharacters",
      favorites: "getFavorites",
    }),
    getPaginatedItems() {
      const paginatedPeople = paginateArray(
        this.filteredCharacters,
        this.page,
        this.pageSize
      );

      return { paginatedPeople, total: this.$data.filteredCharacters.length };
    },
  },
  methods: {
    checkIsFavorite(name: string) {
      return !!this.favorites.find(
        (character: People) => character.name === name
      );
    },
    handleGenderChange(gender: Gender) {
      this.filteredCharacters = filterPeople(
        this.favorites,
        gender,
        this.search
      );
      this.gender = gender;
      this.page = 1;
    },
  },
});
</script>

<style lang="scss" scoped>
.card-wrapper {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  max-width: 1440px;
  padding: 40px;
  margin-top: 100px;

  @media screen and (max-width: 1024px) {
    padding: 10px;
    justify-content: center;
  }

  &__title {
    font-size: 34px;

    @media screen and (max-width: 768px) {
      font-size: 18px;
    }
  }
}
</style>
