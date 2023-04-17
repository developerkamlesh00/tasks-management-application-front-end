import { createStore } from 'vuex';
//import axios from 'axios';


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
  },
});


export default store;