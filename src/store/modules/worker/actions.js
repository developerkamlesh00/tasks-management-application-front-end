import axios from "axios";
export default {
   setMessage(state,data){
    state.commit('setMessage',data);
   },
   unsetMessage(state){
    state.commit('unsetMessage')
   },

  //  Get all projects for which worker is doing its tasks  
  async fetchWorkerProjects(state) {
    state.commit('setLoading')
    const worker_id = localStorage.getItem("userId");
    const projects=await axios.get(
      `http://localhost:8000/api/worker/${worker_id}/project`
    )    
    state.commit('setProjects',projects.data);
    state.commit('unsetLoading')
    return;
  },
  
  // Get all tasks of one particular project
  async fetchProjectAllTasks(state,payload) {
    state.commit('setLoading')
    console.log(`http://localhost:8000/api/project/${payload.project_id}/tasks`)
    const tasks=await axios.get(
      `http://localhost:8000/api/project/${payload.project_id}/tasks`
    )    
    state.commit('unsetLoading')
    state.commit('setProjectTasks',tasks.data);
    return;
  },
  
  // Get only those task of a project that is assigned to this worker
  async fetchProjectWorkerTasks(state,payload) {
    state.commit('setLoading')
    const worker_id = localStorage.getItem("userId");
    console.log(`http://localhost:8000/api/worker/${worker_id}/project/${payload.project_id}/tasks`)
    const tasks=await axios.get(
      `http://localhost:8000/api/worker/${worker_id}/project/${payload.project_id}/tasks`
      )    
      state.commit('unsetLoading')
      state.commit('setProjectTasks',tasks.data);
      return;
    },
    
    // Get all comments of a particular task
    async fetchTaskComments(state, payload) {
    state.commit('setLoading')
    const comments=await axios.get(
      `http://localhost:8000/api/task/${payload.task_id}/comments`
      )    
      state.commit('unsetLoading')
      state.commit('setComments',comments.data);
      return;
    },
    
    // Used to update status of a task when task is drag and drop on another board/task-pane or when worker changes the task status using select (drop down) box
    async updateTaskStatus({ dispatch }, payload) {
      await axios.post(
        `http://localhost:8000/api/update_status/task/${payload.task_id}/status/${payload.status_id}`
        )
        dispatch('fetchWorkerTasks',{isFirstRequest:true})
        return;
      },
      
    // Get all task belonging to this worker
    // isFirstRequest indicates whether additional data like rows, etc need to be updated in vuex store or not. When making changes to Database set it to true in order to update the vuex state
    async fetchWorkerTasks(state,payload={isFirstRequest:false}) {
    state.commit('setLoading')
    const worker_id = localStorage.getItem("userId");
    try{
      await axios.get(
        `http://localhost:8000/api/worker/${worker_id}/tasks`
        ).then(function (res) {
          state.commit('setTasks',{tasks:res.data});
          if(payload && payload.isFirstRequest){
            state.commit('unsetLoading') 
            state.commit('setData');
            state.commit('setRows')
          }
        })
        
      }catch(error){
        console.log(error)
      }
    return;
  },

};
