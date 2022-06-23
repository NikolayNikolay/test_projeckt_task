<template>
  <div class="working" id="user">
    <div class="working__container">
      <h2 class="working__title">Working with GET request</h2>
      <div class="working__people-card">
        <add-loader v-if="flagLoad"></add-loader>
        <add-card-user
          v-for="item in usersArr"
          :key="item.id"
          :name="item.name"
          :phone="item.phone"
          :photo="item.photo"
          :email="item.email"
          :position="item.position"
          v-else
        ></add-card-user>
      </div>
      <router-link :to="{ name: 'user', params: { userVisivle: nextList } }">
        <add-button
          class="test__button"
          title="Show more"
          @clickButton="getUsers"
          :disabled="flagButton"
        ></add-button>
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import AddCardUser from "./AddCardUser.vue";
import AddButton from "../../AddButton.vue";
import AddLoader from "../../AddLoader.vue";
import { reactive, ref } from "@vue/reactivity";
import { useRoute, useRouter } from "vue-router";
import { computed, provide } from "@vue/runtime-core";
import { useStore } from "vuex";
export default {
  setup() {
    // это переменная для использования vueX
    const store = useStore();
    // это переменная для ипользования route
    const router = useRouter();
    const nextList = ref(1);
    const usersArr = ref();
    const flagLoad = ref(false);
    // первая загрузка
    (async function () {
      flagLoad.value = true;
      router.push("/");
      await store.dispatch("getUsersStart");
      flagLoad.value = false;
    })();
    //загрузка по нажатию кнопки
    async function getUsers() {
      try {
        nextList.value++;
        flagLoad.value = true;
        await store.dispatch("getUsersPage", { numberPage: nextList.value });
        flagLoad.value = false;
      } catch (error) {
        console.log(error);
      }
    }
    return {
      nextList,
      usersArr: computed(() => store.getters.usersArr),
      getUsers,
      flagLoad,
      flagButton: computed(() => store.getters.flagButton),
    };
  },
  components: {
    AddCardUser,
    AddButton,
    AddLoader,
  },
};
</script>

<style>
</style>