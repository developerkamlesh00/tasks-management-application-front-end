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


  async updateTaskStatus({ dispatch }, payload) {
    await axios.post(
      `http://localhost:8000/api/update_status/task/${payload.task_id}/status/${payload.status_id}`
    )
    dispatch('fetchWorkerTasks')
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
        }
      })

    }catch(error){
      console.log(error)
    }
    return;
  },

};
