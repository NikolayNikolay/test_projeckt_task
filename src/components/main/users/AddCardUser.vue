<template>
  <div class="shell-card">
    <div class="card">
      <div class="card__image">
        <img :src="photo" alt="user" @error="setAltImg" />
      </div>
      <ul class="card__info-list">
        <li class="card__item card__user-name">
          <p class="card__link">{{ name }}</p>
          <span>{{ name }}</span>
        </li>
        <li class="card__item">
          <p class="card__link">{{ position }}</p>
          <span>{{ position }}</span>
        </li>
        <li class="card__item">
          <a href="#" class="card__link"> {{ email }} </a
          ><span>{{ email }}</span>
        </li>
        <li class="card__item">
          <a href="#" class="card__link">{{ phone }} </a
          ><span>{{ phone }} </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { computed, onMounted, ref, toRefs, watch } from "@vue/runtime-core";
import image from "../../../img/photoNo.png";
export default {
  props: {
    email: String,
    photo: {
      type: String,
      required: false,
      default: image,
    },
    phone: String,
    name: String,
    position: String,
  },
  setup(props) {
    // подгрузка локальной картнки
    function setAltImg(event) {
      event.target.src = image;
      console.log(event.target.src);
    }
    return {
      setAltImg,
    };
  },
};
</script>

<style>
</style>