import { createRouter, createWebHistory } from "vue-router";
import store from './store/index.js';

import HomePage from "./pages/HomePage.vue";
import AboutPage from "./pages/AboutPage.vue";
import AuthLogin from "./pages/auth/AuthLogin.vue";
// import UpdateProfile from "./pages/auth/UpdateProfile.vue";

//director compo
import OrganizationRegister from "./pages/director/OrganizationRegister.vue";
import DirectorDashboard from "./pages/director/DirectorDashboard.vue";
import CreateManagerWorker from "./components/director/CreateManagerWorker.vue";
import CreateProject from "./components/director/CreateProject.vue";
import ViewProjects from "./pages/director/ViewProjects.vue";
//end director compo

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
  // { path: "/updateprofile", name: "updateprofile", component: UpdateProfile},
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
    children: [
      { path: ':add',name: "managerworker", component: CreateManagerWorker },
      { path: ':add',name: "project", component: CreateProject },
      { 
        path: ':add',name: "viewproject", component: ViewProjects
        // children: [
        //   { path: 'editproject',name: "editproject", component: CreateProject }
        // ]
      }
    ],
    beforeEnter: (_, _1, next) => {
      if(store.getters.role == 'director' && store.getters.isAuthenticated){
        next();
      }else{
        next('/login');
      }
    },
  },
  { path: "/orgregister", name: "register", component: OrganizationRegister },
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
