import tasks from "./tasks.js";
export default {
  namespaced: true,
  state() {
    return {
      totalBoards: 4,
      boards: [
        {
          id: 1,
          name: "ToDo",
          percentage: 0,
          can_edit: true,
        },
        {
          id: 2,
          name: "Doing",
          percentage: 25,
          can_edit: true,
        },
        {
          id: 3,
          name: "Review",
          percentage: 75,
          can_edit: true,
        },
        {
          id: 4,
          name: "Completed",
          percentage: 100,
          can_edit: true,
        },
      ],
      tasks: tasks,
    };
  },
  getters: {
    getBoards(state) {
      return state.boards;
    },
    getTasks(state) {
      return state.tasks;
    },
  },
  mutations: {
    addNewBoard(state, payload) {
      console.log(payload);
      return state.boards.push(payload);
    },
    updateTaskStatus(state, { task_id }) {
        console.log("Mutations");
        const task=state.tasks[task_id]
        // const task = state.tasks.filter((t) => {
        //     console.log(t.id,task_id)
        //     t.id == task_id;
        // })[0];
        // console.log(state.tasks)
        console.log(task);
    //   task.status_id=status_id
      return;
    },
  },
  actions: {
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
    updateTaskStatus({ commit }, payload) {
      console.log("Actions", payload);
      commit("updateTaskStatus", payload);
      return;
    },
  },
};
