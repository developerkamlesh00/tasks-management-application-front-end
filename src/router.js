import { createRouter, createWebHistory } from "vue-router";

import HomePage from "./pages/HomePage.vue";
import AboutPage from "./pages/AboutPage.vue";
import AuthLogin from "./pages/auth/AuthLogin.vue";

//director compo
import OrganizationRegister from "./pages/director/OrganizationRegister.vue";
import DirectorDashboard from "./pages/director/DirectorDashboard.vue";
//end director compo
import UserDashboard from "./pages/UserDashboard.vue";
import NotFound from "./pages/NotFound.vue";

const routes = [
  { path: "/", name: "home", component: HomePage },
  { path: "/about", name: "about", component: AboutPage },
  { path: "/login", name: "login", component: AuthLogin },
  { path: "/director", 
    name: "director", 
    component: DirectorDashboard,
    beforeEnter: (to, from, next) => {
      if(this.$store.getters.token && this.$store.getters.token){
        next();
      }
      console.log(to, from);
  },
  },
  { path: "/orgregister", name: "register", component: OrganizationRegister },
  {
    path: "/dashboard/:user_type",
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
