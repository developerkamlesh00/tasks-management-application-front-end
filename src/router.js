import { createRouter, createWebHistory } from "vue-router";

import HomePage from "./pages/HomePage.vue";
import AboutPage from "./pages/AboutPage.vue";
import LoginPage from "./pages/LoginPage.vue";
import RegisterPage from "./pages/RegisterPage.vue";
import UserDashboard from "./pages/UserDashboard.vue";
import NotFound from "./pages/NotFound.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomePage,
  },
  {
    path: "/about",
    name: "about",
    component: AboutPage,
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterPage,
  },
  {
    path: "/pages/dashboards/:user_type",
    name: "dashboard",
    props: true,
    component: UserDashboard,
    beforeEnter: (to, from, next) => {
      console.log("Users before enter");
      console.log(to, from);
      // check is user api_token is valid
      next();

      return false;
    },
  },
  {
    path: "/:notFound(.*)",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  // linkActiveClass: 'active',
});

export default router;
