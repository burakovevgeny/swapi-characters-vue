<template>
  <Layout>
    <CharactersFilter
      v-model="search"
      :characters="characters"
      :filter="gender"
      @change="handleGenderChange"
    />
    <WrapperAsyncRequest :status="status">
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
    </WrapperAsyncRequest>
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
import WrapperAsyncRequest from "@/shared/WrapperAsyncRequest.vue";
import CharactersFilter from "@/shared/Filter.vue";
import Paginator from "@/shared/Paginator.vue";
import Card from "@/shared/Card.vue";
import { mapGetters } from "vuex";
import { Gender, People } from "@/models";
import { filterPeople, paginateArray } from "@/helpers";

export default Vue.extend({
  name: "Main",
  components: {
    Layout,
    WrapperAsyncRequest,
    CharactersFilter,
    Card,
    Paginator,
  },
  data() {
    return {
      filteredCharacters: [] as People[],
      search: "",
      gender: Gender.ALL,
      page: 1,
      pageSize: 10,
    };
  },
  mounted() {
    this.filteredCharacters = this.characters;
  },
  watch: {
    characters: {
      handler(value: People[]) {
        this.filteredCharacters = value;
      },
    },
    search: {
      handler(search: string) {
        this.filteredCharacters = filterPeople(
          this.characters,
          this.gender,
          search
        );
        this.page = 1;
      },
    },
  },
  computed: {
    ...mapGetters({
      status: "getStatus",
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
        this.characters,
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
  justify-content: space-between;
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
