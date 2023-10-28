import axios from "axios";
export default {
    async getProjects(context){
       
        const ManagerId = localStorage.getItem("userId")
        console.log(ManagerId) 
        
        await axios.get(`http://localhost:8000/api/project?manager=${ManagerId}`)
        .then(function (response) {
        // handle success
        console.log(response)
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
  
  async getProject(context, payload){ 
        
    //const ManagerId = localStorage.getItem("userId");
    
    await axios.get(`http://localhost:8000/api/single_project?id=${payload.value}`)
    .then(function (response) {
    // handle success
    //console.log(response)
    
    context.state.project=response.data 
  
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });

  },
  async updateProjectTasks(context, payload){ //
        
    await axios.put(`http://localhost:8000/api/update_project_tasks?id=${payload.value}`)
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
  
  },
  
  async getWorker(context, payload){ 
    
    await axios.get(`http://localhost:8000/api/single_worker?id=${payload.value}`)
    .then(function (response) {
    // handle success
          context.state.worker =response.data   
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });
  
  },
  
  async getAssignedTasks(context, payload){ //
    await axios.get(`http://localhost:8000/api/assigned_tasks?id=${payload.value}`)
    .then(function (response) {
    // handle success
    //console.log(payload.value)
    //console.log(response)
    context.state.assignedTasks =response.data
    
  
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });
  
  },
  
  async getTasks(context, payload){ 
  
    await axios.get(`http://localhost:8000/api/tasks?id=${payload.value}`)
    .then(function (response) {
    // handle success
    console.log(response)
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
  async getModifiedTasks(context, payload){ //
  
    await axios.get(`http://localhost:8000/api/modified_tasks?id=${payload.value}`)
    .then(function (response) {
    // handle success
    console.log(response)
    context.state.modifiedTasks =response.data
    
  
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });
  
  }
  ,
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
      //console.log(payload)
      console.log(response);
      context.state.isSuccess = 1
    })
    .catch(function (error) {
      console.log(payload)
      console.log(error);
      context.state.isSuccess = 0
    }).finally(function () {
      // always executed
      setTimeout(()=>{
        context.state.isSuccess=2
      },3000)
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
      //console.log(payload)
      console.log(response);
      context.state.isSuccess = 1
    })
    .catch(function (error) {
      console.log(payload)
      console.log(error);
      context.state.isSuccess = 0
    }).finally(function () {
      // always executed
      setTimeout(()=>{
        context.state.isSuccess=2
      },3000)
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
  },
  
  
  async getReviewTasks(context){ //
    const ManagerId = localStorage.getItem("userId")
    await axios.get(`http://localhost:8000/api/review_tasks?id=${ManagerId}`)
    .then(function (response) {
    // handle success
    //console.log(response)
    context.state.reviewTasks=response.data
    console.log(context.state.reviewTasks)
    
  
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });
  
  },
  
  async doApproveTask(context,payload){
    console.log(payload.id)
    await axios.put('http://localhost:8000/api/approve_task', {
      id:payload.id,
      projId:payload.projId
    })
    .then(function (response) {
      //console.log(payload)
      console.log(response);
    })
    .catch(function (error) {
      //console.log(payload)
      console.log(error);
    });
  },
  
  async doRejectTask(context,payload){
    console.log(payload.id)
    await axios.put('http://localhost:8000/api/reject_task', {
      id:payload.id,
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
  
  async getWorkerNames(context){ //
    const ManagerId = localStorage.getItem("userId")
    await axios.get(`http://localhost:8000/api/worker_names?id=${ManagerId}`)
  .then(function (response) {
    // handle success
    console.log(response)
    context.state.workerNames=response.data
    //console.log(context.state.workerNames)
  
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });
  
  },
  async toggleVisibility(context,payload){
    console.log(payload.id)
    await axios.put('http://localhost:8000/api/toggle_visibility', {
      id:payload.id
    })
    .then(function (response) {
      //console.log(payload)
      console.log(response);
      response.data = context.visible
    })
    .catch(function (error) {
      //console.log(payload)
      console.log(error);
    });
  },
};