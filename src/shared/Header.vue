<template>
  <header class="header">
    <router-link
      v-for="nav in menu"
      class="header__title"
      :to="nav.to"
      :key="nav.to"
    >
      <icon :icon="nav.icon" :class="checkActiveStyle(nav.to)" />
    </router-link>
  </header>
</template>

<script lang="ts">
import Vue from "vue";
import Icon from "./Icon.vue";
import { Navigation } from "@/models";

export default Vue.extend({
  name: "Header",
  components: {
    Icon,
  },
  data() {
    return {
      menu: [
        {
          icon: "mdi-home",
          to: Navigation.MAIN,
        },
        {
          icon: "mdi-cards-heart",
          to: Navigation.FAVORITE,
        },
      ],
    };
  },
  methods: {
    checkActiveStyle(location: string) {
      const pathname = this.$route.path;
      const activeRoute = pathname.split("/").includes(location.slice(1));
      return `header__icon ${activeRoute ? "header__icon_active" : ""}`;
    },
  },
});
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  min-height: 100px;
  display: flex;
  padding: 24px 40px;
  justify-content: space-between;
  box-shadow: 0px 5px 5px var(--primary);
  margin-bottom: 20px;

  &__title {
    font-size: 18px;
    height: 100%;
    display: flex;
    align-items: center;
    color: var(--primary);
  }

  &__icon {
    &_active {
      color: var(--primary);
    }
  }
}
</style>