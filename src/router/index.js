import { createRouter, createWebHistory,createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/:id",
    name: "ForShow",
    component: () => import(/* webpackChunkName: "ForShow" */ '../views/forShow.vue')
  },

  {
    path: "/setPage",
    name: "Home",
    component: Home,
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
