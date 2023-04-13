import { createStore } from 'vuex';
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
      worker:[],
      tasks:[]
    }
  },

  getters:{
    projectLists(state){
      return state.projs
    },
    workerLists(state){
      return state.workers
    },
    taskLists(state){
      return state.tasks
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

async getTasks(context, payload){ //
      

  await axios.get(`http://localhost:8000/api/tasks?id=${payload.value}`)
  .then(function (response) {
  // handle success
  //console.log(response)
  context.state.tasks =response.data
  

})
.catch(function (error) {
  // handle error
  console.log(error);
})
.finally(function () {
  // always executed
});

},

async addTask(context,payload){
  await axios.post('http://localhost:8000/api/add_task', {
    title:payload.title,
    description:payload.description,
    workerId:payload.workerId,
    assignedDate:payload.assignedDate,
    estimatedDeadline:payload.estimatedDeadline,
    projectId:payload.projectId
  })
  .then(function (response) {
    console.log(payload)
    console.log(response);
  })
  .catch(function (error) {
    console.log(payload)
    console.log(error);
  });

},

async editTask(context,payload){
  await axios.put('http://localhost:8000/api/edit_task', {
    id:payload.id,
    title:payload.title,
    description:payload.description,
    workerId:payload.workerId,
    assignedDate:payload.assignedDate,
    estimatedDeadline:payload.estimatedDeadline,
    projectId:payload.projectId
  })
  .then(function (response) {
    console.log(payload)
    console.log(response);
  })
  .catch(function (error) {
    console.log(payload)
    console.log(error);
  });

},

async deleteTask(context, payload){
  
  await axios.delete(`http://localhost:8000/api/delete_task/${payload.id}`)
  .then(function(response){
    //console.log(payload.id)
    
    console.log(response);
  })
  .catch(function(error) {
    console.log(payload)
    console.log(error);
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