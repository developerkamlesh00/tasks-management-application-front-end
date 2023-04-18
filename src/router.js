import { createRouter, createWebHistory } from "vue-router";
import store from "./store/index.js";

import HomePage from "./pages/HomePage.vue";
import AboutPage from "./pages/AboutPage.vue";
import AuthLogin from "./pages/auth/AuthLogin.vue";
import ForgotPassword from "./pages/auth/ForgotPassword.vue";
import ResetPassword from './pages/auth/ResetPassword.vue';
// import UpdateProfile from "./pages/auth/UpdateProfile.vue";

//director component
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
//end director component

//import Admin components
import AdminDashboard from "./pages/admin/AdminDashboard.vue";
import ShowOrganizations from "./components/admin/ShowOrganizations.vue";
import ShowDirectors from "./components/admin/ShowDirectors.vue";
import ShowManagers from "./components/admin/ShowManagers.vue";
import ShowWorkers from "./components/admin/ShowWorkers.vue";
import adminStatistics from "./components/admin/AdminStatistics.vue"


//Manager components start
import ManagerDashboard from "./pages/manager/ManagerDashboard.vue";
import ProjectList from "./pages/manager/Children/ProjectList.vue";
import WorkerList from "./pages/manager/Children/WorkerList.vue";
import SingleProject from "./pages/manager/Children/SingleProject.vue"
import SingleWorker from "./pages/manager/Children/SingleWorker.vue";
import ReviewTasks from "./pages/manager/Children/ReviewTasks.vue";
import MyProfile from "./pages/manager/Children/MyProfile.vue";
//Manager Components end

// Worker Pages
import WorkerView from "./pages/worker/WorkerView.vue";
import KanbanBoard from "./pages/worker/KanbanBoard.vue";
import TasksTable from "./pages/worker/TasksTable.vue";
import TaskDetails from "./pages/worker/TaskDetails.vue";
// import WorkStatistics from "./pages/worker/WorkSummary.vue";
import InfographicsPage from "./pages/worker/InfographicsPage.vue";
import ProjectsPage from "./pages/worker/ProjectsPage.vue";
import MyManagers from "./pages/worker/MyManagers.vue";
import DashboardSettings from "./pages/worker/DashboardSettings.vue";

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
        path: "",
        name: "adminStatistics",
        component: adminStatistics,
      },
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
  
  //Manager Routing Start
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
        path:'',
        component: MyProfile,
        
      },
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
      },
      {
        path: 'workers/:id',
        component:SingleWorker
      },
      {
        path: 'review_tasks',
        component:ReviewTasks
      },
      
      
    ]
  },
//Manager Routing Ends
  {
    path: "/worker",
    component: WorkerView,
    children: [
      {
        path:"",
        name: "worker",
        redirect: "/worker/dashboard",
      },
      {
        path: "dashboard",
        name: "dashboard",
        component: KanbanBoard,
      },
      {
        path: "tasks",
        name: "tasksTable",
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
        name: "progress",
        component: InfographicsPage,
      },
      {
        path: "projects",
        name: "projects",
        component: ProjectsPage,
      },
      {
        path: "settings",
        name: "settings",
        component: DashboardSettings,
      },
      {
        path: "mymanagers",
        name: "mymanagers",
        component: MyManagers,
      },
    ],
    
    beforeEnter: (_, _1, next) => {
      if(store.getters.role == 'worker' && store.getters.isAuthenticated){
        next();
      }else{
        next('/login');
      }
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
