<template>
  <button
    :type="button"
    @click="$emit('clickButton')"
    :class="class"
    :disabled="flagButton"
  >
    <span> {{ title }}</span>
  </button>
</template>

<script>
export default {
  emits: ["clickButton"],
  props: {
    button: {
      type: String,
      defoult: "button",
    },
    title: String,
    class: String,
    flagButton: {
      type: Boolean,
      defoult: false,
    },
  },
};
</script>

<style>
</style>