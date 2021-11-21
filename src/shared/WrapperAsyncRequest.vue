<template>
  <div v-if="isLoading" class="async-wrapper">
    <h2 class="async-wrapper__title" v-if="isError">
      OOOPS, TRY LETTER, JEDI!
    </h2>
    <LoadingSpinner v-else />
  </div>
  <div v-else>
    <slot />
  </div>
</template>

<script lang='ts'>
import { APIStatus } from "@/models";
import Vue, { PropType } from "vue";
import LoadingSpinner from "@/shared/LoadingSpinner.vue";

export default Vue.extend({
  name: "WrapperAsyncRequest",
  components: {
    LoadingSpinner,
  },
  props: {
    status: {
      type: String as PropType<APIStatus>,
      required: true,
      validator: (value) => {
        return Object.values(APIStatus).includes(value);
      },
    },
  },
  computed: {
    isLoading() {
      return this.status !== APIStatus.Success;
    },
    isError() {
      return this.status === APIStatus.Error;
    },
  },
});
</script>

<style lang="scss" scoped>
.async-wrapper {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  &__title {
    color: var(--primary);
    font-size: 34px;

    @media screen and (max-width: 768px) {
      font-size: 18px;
    }
  }
}
</style>