<template>
  <form id="form" @submit.prevent="submitForm" autocomplete="off">
    <div class="input-conteiner">
      <div class="item-input">
        <fieldset :class="{ isvalid: v$.name.$error }">
          <input
            type="text"
            name="name"
            placeholder="Your name"
            class="input"
            v-model="user.name"
          />
          <legend :class="{ error: v$.name.$error }">Name</legend>
        </fieldset>
        <span :class="{ error: v$.name.$error }">{{
          v$.name.$error ? v$.name.$errors[0].$message : ""
        }}</span>
      </div>
      <div class="item-input">
        <fieldset :class="{ isvalid: v$.email.$error || requiredError }">
          <input
            type="email"
            name="email"
            placeholder="Email"
            class="input"
            minLength="2"
            maxLength="100"
            v-model="user.email"
          />
          <legend :class="{ error: v$.email.$error || requiredError }">
            Email
          </legend>
        </fieldset>
        <span :class="{ error: v$.email.$error || requiredError }"
          >{{ v$.email.$error ? v$.email.$errors[0].$message : ""
          }}{{ requiredError ? requiredError : "" }}</span
        >
      </div>
      <div class="item-input">
        <fieldset :class="{ isvalid: v$.phone.$error || requiredError }">
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            class="input"
            v-model="user.phone"
          />
          <legend :class="{ error: v$.phone.$error || requiredError }">
            Phone
          </legend>
        </fieldset>
        <span :class="{ error: v$.phone.$error || requiredError }">{{
          requiredError ? requiredError : "+38XXXXXXXXXX"
        }}</span>
      </div>
    </div>
    <div class="radio">
      <h4>Select your position</h4>
      <add-input-radio
        v-for="item in radioButonns"
        :key="item.id"
        :name="item.name"
        :id="item.id"
        @clickRadio="clickRadio"
      ></add-input-radio>
    </div>
    <div class="fileLoading">
      <div class="fileLoading__cnt fileLoading">
        <label
          for="input-file"
          class="fileLoading__label-one"
          :class="{ isvalid: v$.photo.$error }"
          >Upload<input
            type="file"
            id="input-file"
            accept=".png, .jpg, .jpeg"
            @change="handleFileUpload($event)"
        /></label>
        <label
          for="input-file"
          class="fileLoading__label-two"
          :class="{ isvalid: v$.photo.$error }"
        >
          {{ user.photo ? user.photo.name : "Upload your photo" }}</label
        >
      </div>
      <span>{{ v$.photo.$error ? v$.photo.$errors[0].$message : "" }}</span>
    </div>
    <add-button
      title="Sign up"
      :type="'submit'"
      :disabled="!flagButton"
    ></add-button>
  </form>
</template>

<script>
import axios from "axios";
import AddButton from "../../AddButton.vue";
import AddInputRadio from "./AddInputRadio.vue";
import { computed, inject, reactive, ref } from "@vue/runtime-core";
import useVuelidate from "@vuelidate/core";
import {
  required,
  email,
  maxLength,
  minLength,
  helpers,
} from "@vuelidate/validators";
import { useStore } from "vuex";
export default {
  setup(props, context) {
    const store = useStore();
    const requiredError = ref(null);
    const number = helpers.regex(/^[+]{0,1}380([0-9]{9})$/);
    const user = reactive({
      name: "",
      email: "",
      phone: "",
      position_id: 4,
      photo: "",
    });
    const radioButonns = ref();
    const flagButton = computed(() => {
      if (
        user.name !== "" &&
        user.email !== "" &&
        user.phone !== "" &&
        user.photo !== ""
      ) {
        return true;
      } else {
        return false;
      }
    });
    // проверка валидности информации
    const rules = computed(() => {
      return {
        name: { required, minLength: minLength(2), maxLength: maxLength(60) },
        email: {
          required,
          email,
          minLength: minLength(2),
          maxLength: maxLength(100),
        },
        phone: { required, number },
        position_id: { required, minLength: minLength(1) },
        photo: { required },
      };
    });
    // сюда записывается невалидность или валидность пароля
    const v$ = useVuelidate(rules, user);
    // радио баттон добавление к юзеру
    function clickRadio(value) {
      user.positions_id = value;
    }
    // проверка валидности формы
    async function submitForm() {
      try {
        const data = await v$.value.$validate();
        console.log(data);
        if (data) {
          console.log(user);
          const token = await axios.get(
            "https://frontend-test-assignment-api.abz.agency/api/v1/token"
          );
          const { data } = await axios({
            method: "post",
            url: "https://frontend-test-assignment-api.abz.agency/api/v1/users",
            data: user,
            headers: {
              "Content-Type": "multipart/form-data",
              Token: token.data.token,
            },
          });
          await store.dispatch("getUsersStart");
          store.commit("succesUser");
          setTimeout(() => {
            store.commit("succesUser");
          }, 2000);
          console.log(data);
          user.name = "";
          user.email = "";
          user.phone = "";
          user.photo = "";
        }
      } catch (error) {
        if (error.response.status == 409) {
          requiredError.value = error.response.data.message;
          console.log(requiredError.value);
        } else if (error.response.status == 401) {
          console.log(error.response.data.message);
        } else if (error.response.status == 422) {
          console.log(error.response.data.message);
        }
        console.log(error.response);
      }
    }
    // загрузка файла
    function handleFileUpload($event) {
      const target = $event.target.files[0];
      if (target && target.size <= 5000000) {
        user.photo = target;
      }
    }
    // загрузка радио баттонов
    (async function loadRadioCheck() {
      const { data } = await axios.get(
        "https://frontend-test-assignment-api.abz.agency/api/v1/positions"
      );
      radioButonns.value = data.positions;
    })();
    return {
      v$,
      radioButonns,
      user,
      handleFileUpload,
      submitForm,
      clickRadio,
      flagButton,
      requiredError,
    };
  },
  components: { AddButton, AddInputRadio },
};
</script>

<style>
</style>