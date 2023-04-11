import { createStore } from 'vuex';

//import { projects, users } from './modules/manager/projList.js'

import axios from 'axios';

import directorModule from './modules/director/index.js';
//import managerModule from './modules/manager/index.js';
import workerModule from './modules/worker/index.js';
import adminModule from './modules/admin/index.js';
import authModule from './modules/auth/index.js';


const store = createStore({
  modules: {
    director: directorModule,
    //manager: managerModule,
    worker: workerModule,
    admin : adminModule,
    auth : authModule,
  },

  state(){
    return{
      projs: [],
      workers: [],
      project: [],
      worker:[]
    }
  },

  getters:{
    projectLists(state){
      return state.projs
    },
    workerLists(state){
      return state.workers
    },

    singleProject(state){
      return state.project[0]
    }

  },

  mutations:{
    getProjects(state, payload){
      state.projs = payload.value
    },

    getUsers(state, payload){
      state.workers = payload.value

    }
  },

  actions:{

    async getProjects(context){
      
      
      const ManagerId = localStorage.getItem("userId")
      //console.log(ManagerId)      
      await axios.get(`http://localhost:8000/api/project?manager=${ManagerId}`)
      .then(function (response) {
      // handle success
      context.state.projs = response.data
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
   
  },

  async getWorkers(context){
      
      
    const ManagerId = localStorage.getItem("userId")
    //console.log(ManagerId)  
    
    await axios.get(`http://localhost:8000/api/worker?manager=${ManagerId}`)
    .then(function (response) {
    // handle success
    context.state.workers = response.data
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });
 
},

async getProject(context, payload){ //
      
  await axios.get(`http://localhost:8000/api/single_project?id=${payload.value}`)
  .then(function (response) {
  // handle success
  //console.log(response)
  context.state.project =response.data

})
.catch(function (error) {
  // handle error
  console.log(error);
})
.finally(function () {
  // always executed
});

},

async getTasks(){ //
      
  await axios.get(`http://localhost:8000/api/tasks`)
  .then(function (response) {
  // handle success
  console.log(response)
  

})
.catch(function (error) {
  // handle error
  console.log(error);
})
.finally(function () {
  // always executed
});

}






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