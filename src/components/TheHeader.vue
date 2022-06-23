<template>
  <header class="header">
    <div class="header__container">
      <a href="#" class="header__logo"
        ><img src="../img/logo.png" alt="logo" />
        <div class="header__text-logo">TESTTASK</div></a
      >
      <div class="header__menu menu">
        <router-link :to="{ name: 'user', hash: '#user' }">
          <add-button title="User" class="menu__icon"></add-button>
        </router-link>
        <router-link :to="{ name: 'form', hash: '#form' }">
          <add-button title="Sign up" class="menu__icon"></add-button>
        </router-link>
      </div>
    </div>
  </header>
</template>

<script>
import AddButton from "./AddButton.vue";
export default {
  components: { AddButton },
};
</script>

<style>
</style>