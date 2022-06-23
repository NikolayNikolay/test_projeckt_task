<template>
  <main class="main">
    <the-test></the-test>
    <the-users></the-users>
    <the-form-working></the-form-working>
  </main>
</template>

<script>
import TheTest from "./TheTest.vue";
import TheUsers from "./users/TheUsers.vue";
import TheFormWorking from "./form/TheFormWorking.vue";
export default {
  components: { TheTest, TheUsers, TheFormWorking },
};
</script>

<style>
</style>