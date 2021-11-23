<template>
  <div class="paginator" v-if="total > 1">
    <button
      class="paginator__arrow"
      @click="goPreviousPage"
      :disabled="value === 1"
    >
      <Icon icon="mdi-arrow-left" />
    </button>
    <div
      v-for="(number, index) in paginator"
      class="paginator__page"
      :key="index"
    >
      <button v-if="number === dots">&#8230;</button>
      <button v-else @click="goToPage(number)">{{ number }}</button>
    </div>
    <button
      class="paginator__arrow"
      @click="goNextPage"
      :disabled="value === lastPage"
    >
      <Icon icon="mdi-arrow-right" />
    </button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Icon from "./Icon.vue";
import { paginationRange, DOTS } from "../helpers";

export default Vue.extend({
  name: "Paginator",
  components: {
    Icon,
  },
  props: {
    value: {
      type: Number,
      required: true,
      default: 1,
    },
    pageSize: {
      type: Number,
      required: true,
      default: 10,
    },
    total: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  data() {
    return {
      dots: DOTS,
    };
  },
  computed: {
    paginator() {
      return paginationRange(this.value, this.pageSize, this.total);
    },
    lastPage() {
      return Math.ceil(this.total / this.pageSize);
    },
  },
  methods: {
    goNextPage() {
      this.$emit("input", this.$props.value + 1);
    },
    goPreviousPage() {
      this.$emit("input", this.$props.value - 1);
    },
    goToPage(page: number) {
      this.$emit("input", page);
    },
  },
});
</script>

<style lang="scss" scoped>
.paginator {
  display: flex;
  margin: 20px 0;
  bottom: 120px;

  button {
    cursor: pointer;
    border: 1px solid var(--primary);
    color: var(--primary);
    background: var(--secondary);
    outline: none;
    border-radius: 30px;
    padding: 5px;
    margin: 0 5px;
  }

  &__page {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__arrow {
    span {
      font-size: 14px;
      color: var(--primary);
    }
  }
}
</style>