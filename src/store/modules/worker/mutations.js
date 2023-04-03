export default {
  addNewBoard(state, payload) {
    console.log(payload);
    return state.boards.push(payload);
  },
  updateTaskStatus(state, { task_id }) {
    console.log("Mutations");
    const task = state.tasks[task_id];
    // const task = state.tasks.filter((t) => {
    //     console.log(t.id,task_id)
    //     t.id == task_id;
    // })[0];
    // console.log(state.tasks)
    console.log(task);
    //   task.status_id=status_id
    return;
  },
};
