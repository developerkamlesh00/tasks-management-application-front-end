import { createRouter, createWebHistory } from "vue-router";
import store from "./store/index.js";

import HomePage from "./pages/HomePage.vue";
import AboutPage from "./pages/AboutPage.vue";
import AuthLogin from "./pages/auth/AuthLogin.vue";
import ForgotPassword from "./pages/auth/ForgotPassword.vue";
import ResetPassword from './pages/auth/ResetPassword.vue';
// import UpdateProfile from "./pages/auth/UpdateProfile.vue";

//director compo
import OrganizationRegister from "./pages/director/OrganizationRegister.vue";
import DirectorDashboard from "./pages/director/DirectorDashboard.vue";
import CreateManagerWorker from "./components/director/CreateManagerWorker.vue";
import CreateProject from "./components/director/CreateProject.vue";
import ViewProjects from "./pages/director/ViewProjects.vue";
import ViewSummary from "./components/director/ViewSummary.vue";
import ViewManagers from "./components/director/ViewManagers.vue";
import ViewWorkers from "./components/director/ViewWorkers.vue";
import UpdateProfile from "./components/director/UpdateProfile.vue";
import ViewOrganization from "./components/director/ViewOrganizationDetails.vue";
//end director compo

//import Admin components
import AdminDashboard from "./pages/admin/AdminDashboard.vue";
import ShowOrganizations from "./components/admin/ShowOrganizations.vue";
import ShowDirectors from "./components/admin/ShowDirectors.vue";
import ShowManagers from "./components/admin/ShowManagers.vue";
import ShowWorkers from "./components/admin/ShowWorkers.vue";


import ManagerDashboard from "./pages/manager/ManagerDashboard.vue";
import WorkerView from "./pages/worker/WorkerView.vue";
import KanbanBoard from "./pages/worker/KanbanBoard.vue";
import TasksTable from "./pages/worker/TasksTable.vue";
import TaskDetails from "./pages/worker/TaskDetails.vue";
// import WorkStatistics from "./pages/worker/WorkSummary.vue";
import InfographicsPage from "./pages/worker/InfographicsPage.vue";
import DashboardSettings from "./pages/worker/DashboardSettings.vue";
import ProjectsPage from "./pages/worker/ProjectsPage.vue";
import MyManagers from "./pages/worker/MyManagers.vue";

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
  { path: "/forgot", name: "forgot", component: ForgotPassword },
  { path: "/reset/:ref", props: true ,name: "reset", component : ResetPassword},
  {
    path: "/admin",
    name: "admin",
    component: AdminDashboard,
    children: [
      {
        path: "organizations",
        name: "showOrganizations",
        component: ShowOrganizations,
      },
      { path: "directors", name: "showDirectors", component: ShowDirectors },
      { path: "managers", name: "showManagers", component: ShowManagers },
      { path: "workers", name: "showWorkers", component: ShowWorkers },
    ],
    beforeEnter: (_, _1, next) => {
      if (store.getters.role == "admin" && store.getters.isAuthenticated) {
        next();
      } else {
        next("/login");
      }
    },
  },
  {
    path: "/director",
    name: "director",
    component: DirectorDashboard,
    children: [
      { path: '',  component : ViewOrganization },
      { path: ":add", name: "managerworker", component: CreateManagerWorker },
      { path: ":add", name: "project", component: CreateProject },
      { path: ":add", name: "viewproject", component: ViewProjects },
      { path: ":add", name: "viewsummary", component: ViewSummary },
      { path: ":add", name: "viewmanagers", component: ViewManagers },
      { path: ":add", name: "viewworkers", component: ViewWorkers },
      { path: ":add", name: "vieworganization", component: ViewOrganization},
      { path: ":add", name: "updateprofile", component: UpdateProfile },
    ],
    beforeEnter: (_, _1, next) => {
      if (store.getters.role == "director" && store.getters.isAuthenticated) {
        next();
      } else {
        next("/login");
      }
    },
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
        name: "task_detail",
        props: true,
        component: TaskDetails,
      },
      {
        path: "progress",
        component: InfographicsPage,
      },
      {
        path: "projects",
        component: ProjectsPage,
      },
      {
        path: "dashboard",
        component: KanbanBoard,
      },
      {
        path: "settings",
        component: DashboardSettings,
      },
      {
        path: "mymanagers",
        component: MyManagers,
      },
      // {
      //   path: "/:notFound(.*)",
      //   component:
      //   TasksTable,
      // },
    ],
  },
  // beforeEnter: (_, _1, next) => {
  //   if(store.getters.role == 'worker' && store.getters.isAuthenticated){
  //     next();
  //   }else{
  //     next('/login');
  //   }
  // },
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
