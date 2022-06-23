<template>
  <div class="test">
    <div class="test__container">
      <h1 class="test__title">Test assignment for front-end developer</h1>
      <p class="test__text">
        What defines a good front-end developer is one that has skilled
        knowledge of HTML, CSS, JS with a vast understanding of User design
        thinking as they'll be building web interfaces with accessibility in
        mind. They should also be excited to learn, as the world of Front-End
        Development keeps evolving.
      </p>
      <router-link :to="{ name: 'form', hash: '#form' }">
        <add-button
          @clickButton="scroll"
          title="Sign up"
          class="test__button"
        ></add-button>
      </router-link>
    </div>
  </div>
</template>

<script>
import AddButton from "../AddButton.vue";
export default {
  props: [],
  setup(props, context) {
    const scroll = () => {
      window.scrollTo(0, 0);
      console.log("esssss");
    };
    return {
      scroll,
    };
  },
  components: { AddButton },
};
</script>

<style>
</style>