import { createRouter, createWebHistory } from "vue-router";
import store from "./store/index.js";

import HomePage from "./pages/HomePage.vue";
import AboutPage from "./pages/AboutPage.vue";
import AuthLogin from "./pages/auth/AuthLogin.vue";
// import UpdateProfile from "./pages/auth/UpdateProfile.vue";

//import Admin components
import AdminDashboard from "./pages/admin/AdminDashboard.vue";
import ShowOrganizations from "./components/admin/ShowOrganizations.vue"
import ShowDirectors from "./components/admin/ShowDirectors.vue"
import ShowManagers from "./components/admin/ShowManagers.vue"
import ShowWorkers from "./components/admin/ShowWorkers.vue"


//director compo
import OrganizationRegister from "./pages/director/OrganizationRegister.vue";
import DirectorDashboard from "./pages/director/DirectorDashboard.vue";
import CreateManagerWorker from "./components/director/CreateManagerWorker.vue";
import CreateProject from "./components/director/CreateProject.vue";
import ViewProjects from "./pages/director/ViewProjects.vue";
//end director compo


import ManagerDashboard from "./pages/manager/ManagerDashboard.vue";
import WorkerView from "./pages/worker/WorkerView.vue";
import KanbanBoard from "./pages/worker/KanbanBoard.vue";
import TasksTable from "./pages/worker/TasksTable.vue";
import TaskDetails from "./pages/worker/TaskDetails.vue";
import WorkStatistics from "./pages/worker/WorkSummary.vue";

//import UserDashboard from "./pages/UserDashboard.vue";
import NotFound from "./pages/NotFound.vue";

// Testing
import SideBar from "./components/ui/SideBar.vue";

const routes = [
  { path: "/", name: "home", component: HomePage },
  { path: "/test", name: "test", component: SideBar },
  { path: "/about", name: "about", component: AboutPage },
  // { path: "/updateprofile", name: "updateprofile", component: UpdateProfile},
  { path: "/login", name: "login", component: AuthLogin },
  { path: "/logout", name: "logout", redirect: "/login" },
  {
    path: "/admin",
    name: "admin",
    component: AdminDashboard,
    children: [
      { path: 'organizations', name: "showOrganizations", component: ShowOrganizations },
      { path: 'directors', name: "showDirectors", component: ShowDirectors },
      { path: 'managers', name: "showManagers", component: ShowManagers },
      { path: 'workers', name: "showWorkers", component: ShowWorkers },
    ],
    // beforeEnter: (_, _1, next) => {
    //   if(store.getters.role == 'admin' && store.getters.isAuthenticated){
    //     next();
    //   }else{
    //     next('/login');
    //   }
    // },
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
    // beforeEnter: (_, _1, next) => {
    //   if (store.getters.role == "director" && store.getters.isAuthenticated) {
    //     next();
    //   } else {
    //     next("/login");
    //   }
    // },
  },
  { path: "/orgregister", name: "register", component: OrganizationRegister },
  {
    path: "/manager",
    name: "manager",
    component: ManagerDashboard,
    beforeEnter: (_, _1, next) => {
      if (store.getters.role == "manager" && store.getters.isAuthenticated) {
        next();
      } else {
        next("/login");
      }
    },
  },
  {
    path: "/worker",
    name: "worker",
    component: WorkerView,
    children: [
      {
        path: "",
        name: "taskTable",
        component: TasksTable,
      },
      {
        path: "tasks",
        component: TasksTable,
      },
      {
        path: "task/:id([0-9]+)",
        props: true,
        component: TaskDetails,
      },
      {
        path: "progress",
        component: 
        WorkStatistics,
      },
      {
        path: "dashboard",
        component: 
        KanbanBoard,
      },
      // {
      //   path: "/:notFound(.*)",
      //   component: 
      //   TasksTable,
      // },
    ],
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
