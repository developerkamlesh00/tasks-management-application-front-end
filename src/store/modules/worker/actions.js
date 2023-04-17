import axios from "axios";
export default {


   setMessage(state,data){
    state.commit('setMessage',data);
   },
   unsetMessage(state){
    state.commit('unsetMessage')
   },

  async fetchWorkerProjects(state) {
    state.commit('setLoading')
    const worker_id = localStorage.getItem("userId");
    const projects=await axios.get(
      `http://localhost:8000/api/worker/${worker_id}/project`
    )    
    console.log('Projects',projects.data)
    state.commit('setProjects',projects.data);
    state.commit('unsetLoading')
    return;
  },
  
  async fetchProjectAllTasks(state,payload) {
    state.commit('setLoading')
    console.log(`http://localhost:8000/api/project/${payload.project_id}/tasks`)
    const tasks=await axios.get(
      `http://localhost:8000/api/project/${payload.project_id}/tasks`
    )    
    console.log('All Projects Tasks',tasks.data)
    state.commit('unsetLoading')
    state.commit('setProjectTasks',tasks.data);
    return;
  },
  
  async fetchProjectWorkerTasks(state,payload) {
    state.commit('setLoading')
    const worker_id = localStorage.getItem("userId");
    console.log(`http://localhost:8000/api/worker/${worker_id}/project/${payload.project_id}/tasks`)
    const tasks=await axios.get(
      `http://localhost:8000/api/worker/${worker_id}/project/${payload.project_id}/tasks`
      )    
      console.log('Worker Projects Tasks',tasks.data)
      state.commit('unsetLoading')
      state.commit('setProjectTasks',tasks.data);
      return;
    },
    
    async fetchTaskComments(state, payload) {
    state.commit('setLoading')
    const comments=await axios.get(
      `http://localhost:8000/api/task/${payload.task_id}/comments`
      )    
      console.log(comments)
      state.commit('unsetLoading')
      state.commit('setComments',comments.data);
      return;
    },
    
    async updateTaskStatus({ dispatch }, payload) {
      await axios.post(
        `http://localhost:8000/api/update_status/task/${payload.task_id}/status/${payload.status_id}`
        )
        dispatch('fetchWorkerTasks',{isFirstRequest:true})
        return;
      },
      
    async fetchWorkerTasks(state,payload={isFirstRequest:false}) {
    state.commit('setLoading')
    console.log("Fetching Tasks");
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
