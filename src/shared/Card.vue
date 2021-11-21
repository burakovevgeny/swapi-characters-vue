<template>
  <div class="card">
    <img class="card__avatar" alt="avatar" :src="fullURL" />
    <div class="card__wrapper wrapper">
      <p class="wrapper__title">{{ name }}</p>
      <p class="wrapper__title">{{ planet }}</p>
      <Icon :icon="checkIsFavorite" @click="handleClickToFavoriteIcon" />
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import Icon from "@/shared/Icon.vue";
import { mapActions } from "vuex";

export default Vue.extend({
  name: "Card",
  components: { Icon },
  props: {
    id: {
      type: String,
      required: true,
    },
    planet: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    favorite: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  data() {
    return {
      fullURL: `${process.env.VUE_APP_URL_HOSTNAME}/${this.id}.jpg`,
    };
  },
  methods: {
    ...mapActions({
      addToFavorite: "addToFavorite",
      removeFromFavorite: "removeFromFavorite",
    }),
    handleClickToFavoriteIcon() {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.favorite ? this.removeFromFavorite(this.id) : this.addToFavorite(this.id)
    },
  },
  computed: {
    checkIsFavorite() {
      return this.favorite ? "mdi-account-heart" : "mdi-account-heart-outline";
    },
  },
});
</script>

<style lang="scss" scoped>
.card {
  width: 300px;
  height: 150px;
  box-shadow: var(--primary) 0px 0px 8px;
  margin: 10px;
  display: flex;

      @media screen and (max-width: 768px) {
        margin: 10px 0px;
        width: 280px;
    }

  &__avatar {
    max-width: 150px;
    max-height: 100%;
    object-fit: cover;
    margin-right: 10px;
  }

  &__wrapper {
    width: 100%;
    height: 100%;
  }

  .wrapper {
    padding: 10px 0px;
    span {
      cursor: pointer;
      color: var(--primary);
    }

    &__title {
      color: var(--primary);
      font-size: 16px;
      &:first-child {
        margin-bottom: 10px;
      }
    }
  }
}
</style>