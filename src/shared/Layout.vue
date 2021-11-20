<template>
  <div class="layout">
    <Header />
    <slot />
    <Footer />
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import Footer from "@/shared/Footer.vue";
import Header from "@/shared/Header.vue";

export default Vue.extend({
  name: "Layout",
  components: { Header, Footer },
});
</script>

<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: relative;
}
</style>