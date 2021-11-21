<template>
  <Layout>
    <CharactersFilter
      :characters="characters"
      :filter="gender"
      v-model="search"
      @change="handleGenderChange"
    />
    <WrapperAsyncRequest :status="status">
      <div class="card-wrapper">
        <div v-if="!filteredCharacters.length">
          <h2 class="card-wrapper__title">No data to display, Jedi!</h2>
        </div>
        <Card
          :id="filtered.id"
          :name="filtered.name"
          :planet="filtered.homeworld.name"
          :key="filtered.id"
          :favorite="checkIsFavorite(filtered.name)"
          v-for="filtered in filteredCharacters"
        />
      </div>
    </WrapperAsyncRequest>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import Layout from "@/shared/Layout.vue";
import WrapperAsyncRequest from "@/shared/WrapperAsyncRequest.vue";
import CharactersFilter from "@/shared/Filter.vue";
import Card from "@/shared/Card.vue";
import { mapGetters } from "vuex";
import { Gender, People } from "@/models";
import { filterPeople } from "@/helpers";

export default Vue.extend({
  name: "Main",
  components: { Layout, WrapperAsyncRequest, CharactersFilter, Card },
  data() {
    return {
      filteredCharacters: [] as People[],
      search: "",
      gender: Gender.ALL,
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
      },
    },
  },
  computed: {
    ...mapGetters({
      status: "getStatus",
      characters: "getCharacters",
      favorites: "getFavorites",
    }),
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
