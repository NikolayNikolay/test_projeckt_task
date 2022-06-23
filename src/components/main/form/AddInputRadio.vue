<template>
  <label :for="id" class="radio__label">
    <input
      :id="id"
      class="radio__input"
      type="radio"
      name="radio"
      @click="getId(id)"
      checked
    />
    <label :for="id" class="castom-radio"></label>
    <span class="checkbox__text">{{ name }}</span>
  </label>
</template>

<script>
export default {
  emits: ["clickRadio"],
  props: { id: Number, name: String },
  setup(props, { emit }) {
    function getId(id) {
      emit("clickRadio", id);
    }
    return {
      getId,
    };
  },
};
</script>

<style>
</style>