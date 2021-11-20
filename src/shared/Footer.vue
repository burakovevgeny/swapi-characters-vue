<template>
  <footer class="footer">
    <a :href="link">
      <icon icon="mdi-github" class="footer__icon" />
    </a>
  </footer>
</template>

<script lang="ts">
import Vue from "vue";
import Icon from "./Icon.vue";

export default Vue.extend({
  name: "Footer",
  components: {
    Icon,
  },
  data() {
    return {
      link: "https://github.com/burakovevgeny/swapi-characters-vue",
    };
  },
});
</script>

<style lang="scss" scoped>
.footer {
  width: 100%;
  height: 80px;
  display: flex;
  padding: 24px 40px;
  justify-content: center;
  box-shadow: 0px -5px 5px var(--primary);
  margin-top: 20px;

  &__icon {
    color: var(--primary);
  }
}
</style>