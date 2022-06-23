import { createRouter, createWebHashHistory } from "vue-router";
import TheUsers from "../components/main/users/TheUsers.vue";
import TheFormWorking from "../components/main/form/TheFormWorking.vue";

const routes = [
  {
    path: "/form",
    name: "form",
    component: TheFormWorking,
  },
  {
    path: "/:userVisivle?",
    name: "user",
    component: TheUsers,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
      };
    } else if (to.name !== "user") {
      return { left: 0, top: 0, behavior: "smooth" };
    }
  },
});

export default router;
