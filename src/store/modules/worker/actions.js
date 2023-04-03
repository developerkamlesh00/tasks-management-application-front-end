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
      updateTaskStatus({ commit }, payload) {
        console.log("Actions", payload);
        commit("updateTaskStatus", payload);
        return;
      },
};




