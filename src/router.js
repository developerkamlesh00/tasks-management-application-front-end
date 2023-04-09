import { createRouter, createWebHistory } from "vue-router";
import store from './store/index.js';

import HomePage from "./pages/HomePage.vue";
import AboutPage from "./pages/AboutPage.vue";
import AuthLogin from "./pages/auth/AuthLogin.vue";

//director compo
import OrganizationRegister from "./pages/director/OrganizationRegister.vue";
import DirectorDashboard from "./pages/director/DirectorDashboard.vue";
//end director compo

//manager compo
import ProjectList from "./pages/manager/Children/ProjectList.vue";
import WorkerList from "./pages/manager/Children/WorkerList.vue";
import SingleProject from "./pages/manager/Children/SingleProject.vue"

//end manager compo

import AdminDashboard from "./pages/admin/AdminDashboard.vue";
import ManagerDashboard from "./pages/manager/ManagerDashboard.vue";
import WorkerView from "./pages/worker/WorkerView.vue";

//import UserDashboard from "./pages/UserDashboard.vue";
import NotFound from "./pages/NotFound.vue";

// Testing
import SideBar from './components/ui/SideBar.vue'

const routes = [
  { path: "/", name: "home", component: HomePage },
  { path: "/test", name: "test", component: SideBar },
  { path: "/about", name: "about", component: AboutPage },
  { path: "/login", name: "login", component: AuthLogin },
  { path: "/logout", name: "logout", redirect: '/login'},
  {
    path: "/admin",
    name: "admin",
    component: AdminDashboard,
    beforeEnter: (_, _1, next) => {
      if(store.getters.role == 'admin' && store.getters.isAuthenticated){
        next();
      }else{
        next('/login');
      }
    },
  },
  {
    path: "/director",
    name: "director",
    component: DirectorDashboard,
    beforeEnter: (_, _1, next) => {
      if(store.getters.role == 'director' && store.getters.isAuthenticated){
        next();
      }else{
        next('/login');
      }
    },
  },
  { path: "/orgregister", name: "register", component: OrganizationRegister },
  
  //Manager ROute Starts
  {
    path: "/manager",
    name: "manager",
    component: ManagerDashboard,
    beforeEnter: (_, _1, next) => {
      if(store.getters.role == 'manager' && store.getters.isAuthenticated){
        next();
      }else{
        next('/login');
      }
    },
    children:[
      {
        path:'projects',
        component: ProjectList,
        
      },
      {
        path: 'projects/:id',
        component: SingleProject
      },

      {
        path: 'workers',
        component:WorkerList
      }
    ]
  },
  {
    path: "/worker",
    name: "worker",
    component: WorkerView,
    // beforeEnter: (_, _1, next) => {
    //   if(store.getters.role == 'worker' && store.getters.isAuthenticated){
    //     next();
    //   }else{
    //     next('/login');
    //   }
    // },
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
