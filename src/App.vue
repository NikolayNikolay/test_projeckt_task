<template>
  <div class="wrapper">
    <the-header></the-header>
    <the-main></the-main>
  </div>
</template>
<script>
import TheHeader from "./components/TheHeader.vue";
import TheMain from "./components/main/TheMain.vue";

export default {
  setup() {},
  components: { TheHeader, TheMain },
};
</script>

<style lang="scss">
</style>
