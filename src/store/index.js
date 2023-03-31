import { createStore } from 'vuex';


import directorModule from './modules/director/index.js';
import managerModule from './modules/manager/index.js';
import workerModule from './modules/worker/index.js';
import adminModule from './modules/admin/index.js';
import authModule from './modules/auth/index.js';


const store = createStore({
  modules: {
    director: directorModule,
    manager: managerModule,
    worker: workerModule,
    admin : adminModule,
    auth : authModule,
  }
});

// const store = createStore({
    
//   state() {
//     return {
//       isLoggedIn: false
//     };
//   },
//   mutations: {
//     authenticate(state, loginStatus) {
//       state.isLoggedIn = loginStatus;
//     }
//   },
//   actions: {
//     login({ commit }) {
//       commit('authenticate', true);
//     },
//     logout({ commit }) {
//       commit('authenticate', false);
//       router.push({name:'login'})
//     }
//   },
//   getters: {
//     isAuthenticated(state) {
//       return state.isLoggedIn;
//     }
//   }
// });

export default store;