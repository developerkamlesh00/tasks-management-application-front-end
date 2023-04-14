import axios from "axios";
export default {
  addBoard({ commit, state }, board_name) {
    //add new board entry in local storage
    const boards=JSON.parse(localStorage.getItem('boards'))||[];
    state.totalBoards+=1
    boards.push([state.totalBoards,board_name])
    localStorage.setItem('boards', JSON.stringify(boards));
    // update state.boards
    commit("addNewBoard", {
      id: state.totalBoards,
      name: board_name,
      can_edit: true,
    });
    return;
  },


  async fetchWorkerProjects(state) {
    const worker_id = localStorage.getItem("userId");
    const projects=await axios.get(
      `http://localhost:8000/api/worker/${worker_id}/project`
    )    
    console.log('Projects',projects.data)
    state.commit('setProjects',projects.data);
    return;
  },
  
  async fetchProjectAllTasks(state,payload) {
    console.log(`http://localhost:8000/api/project/${payload.project_id}/tasks`)
    const tasks=await axios.get(
      `http://localhost:8000/api/project/${payload.project_id}/tasks`
    )    
    console.log('All Projects Tasks',tasks.data)
    state.commit('setProjectTasks',tasks.data);
    return;
  },

  async fetchProjectWorkerTasks(state,payload) {
    const worker_id = localStorage.getItem("userId");
    console.log(`http://localhost:8000/api/worker/${worker_id}/project/${payload.project_id}/tasks`)
    const tasks=await axios.get(
      `http://localhost:8000/api/worker/${worker_id}/project/${payload.project_id}/tasks`
    )    
    console.log('Worker Projects Tasks',tasks.data)
    state.commit('setProjectTasks',tasks.data);
    return;
  },


  async fetchTaskComments(state, payload) {
    const comments=await axios.get(
      `http://localhost:8000/api/task/${payload.task_id}/comments`
    )    
    console.log(comments)
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

  async fetchWorkerTasks({ commit },payload={isFirstRequest:false}) {
    console.log("Fetching Tasks");
    const worker_id = localStorage.getItem("userId");
    try{
      await axios.get(
        `http://localhost:8000/api/worker/${worker_id}/tasks`
      ).then(function (res) {
        commit('setTasks',{tasks:res.data});
        if(payload && payload.isFirstRequest){
          commit('setData');
          commit('setRows')
        }
      })

    }catch(error){
      console.log(error)
    }
    return;
  },

};
