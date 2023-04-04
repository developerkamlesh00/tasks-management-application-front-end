import axios from "axios";
export default {
  addBoard({ commit, state }, board_name) {
    //add new board entry in DB
    // update state.boards
    commit("addNewBoard", {
      id: state.totalBoards + 1,
      name: board_name,
      can_edit: true,
    });
    state.totalBoards += 1;
    return;
  },
  async updateTaskStatus({ dispatch }, payload) {
    console.log("Actions", payload);
    await axios.post(
      `http://localhost:8000/api/update_status/task/${payload.task_id}/status/${payload.status_id}`
    )
    dispatch('fetchWorkerTasks')
    // commit("updateTaskStatus", payload);
    return;
  },

  async fetchWorkerTasks({ commit }) {
    console.log("Fetching");
    const worker_id = localStorage.getItem("userId");
    await axios.get(
      `http://localhost:8000/api/worker/${worker_id}/tasks`
    ).then(function (response) {
      console.log(response.data);
      commit('setTasks',{tasks:response.data});
    })
    return;
  },
};
