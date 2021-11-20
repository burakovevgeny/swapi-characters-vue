<template>
  <span class="icon mdi" :class="icon" />
</template>

<script lang='ts'>
import Vue from "vue";

export default Vue.extend({
  name: "Icon",
  props: {
    icon: {
      type: String,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.icon {
  color: white;
  font-size: 30px;
}
</style>