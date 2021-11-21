<template>
  <div class="filter">
    <input
      class="filter__input"
      type="text"
      :value="value"
      @input="handleInput"
    />
    <div class="filter__gender gender">
      <div
        class="gender__title active"
        v-for="gender in genders"
        :key="gender.id"
        @click="setGender(gender.value)"
      >
        <Icon :icon="gender.iconClass" :class="isIconActive(gender.value)" />
        <p :class="isIconActive(gender.value)">{{ gender.label }}</p>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import Vue, { PropType } from "vue";
import Icon from "@/shared/Icon.vue";
import { Gender, People } from "@/models";

export default Vue.extend({
  name: "CharactersFilter",
  components: { Icon },
  props: {
    characters: {
      type: Array as PropType<Array<People>>,
      required: true,
    },
    value: {
      type: String,
      default: "",
    },
    filter: {
      type: String as PropType<Gender>,
      default: Gender.ALL,
    },
  },
  data() {
    return {
      genders: [
        {
          id: 0,
          label: "Female",
          iconClass: "mdi-gender-female",
          value: Gender.FEMALE,
        },
        {
          id: 1,
          label: "Male",
          iconClass: "mdi-gender-male",
          value: Gender.MALE,
        },
        {
          id: 2,
          label: "All",
          iconClass: "mdi-gender-male-female",
          value: Gender.ALL,
        },
      ],
      timeout: 0,
    };
  },
  methods: {
    isIconActive(gender: Gender) {
      return this.filter === gender ? "active" : "";
    },
    setGender(gender: Gender) {
      this.$emit("change", gender);
    },
    handleInput({ target }: { target: HTMLInputElement }) {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      this.timeout = setTimeout(() => {
        this.$emit("input", target.value);
      }, 500);
    },
  },
});
</script>

<style lang="scss" scoped>
.filter {
  position: absolute;
  top: 120px;
  min-width: 210px;

  &__input {
    all: unset;
    width: 100%;
    background: var(--secondary);
    padding: 6px;
    border: 1px solid var(--primary);
    color: var(--primary);
    &:focus {
      box-shadow: var(--primary) 0px 0px 8px;
    }
  }

  &__gender {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .gender {
      margin-top: 10px;

      &__title {
        display: flex;
        align-items: center;
        cursor: pointer;

        p {
          color: white;
        }

        span {
          margin: 10px;
          cursor: pointer;
          color: white;
        }

        .active {
          color: var(--primary);
        }
      }
    }
  }
}
</style>