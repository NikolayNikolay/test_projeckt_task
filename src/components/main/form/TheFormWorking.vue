<template>
  <div class="form-working">
    <div class="form-working__container">
      <h2 class="form-working__title">
        {{
          succesRegister
            ? "User successfully registered"
            : "Working with POST request"
        }}
      </h2>
      <the-form v-if="!succesRegister"></the-form>
      <the-succes-img v-else></the-succes-img>
    </div>
  </div>
</template>

<script>
import TheForm from "./TheForm.vue";
import TheSuccesImg from "../TheSuccesImg";
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    return {
      succesRegister: computed(() => store.getters.succesRegister),
    };
  },
  components: { TheForm, TheSuccesImg },
};
</script>

<style>
</style>