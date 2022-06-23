import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    usersArr: null,
    button: false,
    succesRegister: false,
  },
  getters: {
    flagButton(state) {
      return state.button;
    },
    usersArr(state) {
      return state.usersArr;
    },
    succesRegister(state) {
      return state.succesRegister;
    },
  },
  mutations: {
    succesUser(state) {
      state.succesRegister = !state.succesRegister;
    },
    addUsers(state, data) {
      state.usersArr = data;
    },
  },
  actions: {
    async getUsersStart({ commit }) {
      try {
        console.log("essss");
        const { data } = await axios.get(
          `https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=6`
        );
        commit("addUsers", data.users);
      } catch (error) {
        console.log(error);
      }
    },
    async getUsersPage({ commit, state }, payload) {
      try {
        const { data } = await axios.get(
          `https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${payload.numberPage}&count=6`
        );
        commit("addUsers", data.users);
        if (data.page == data.total_pages) {
          state.button = true;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  modules: {},
});
