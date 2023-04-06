export default {
  
    getBoards(state) {
      return state.boards;
    },
    getStatus(state) {
      return state.status;
    },
    getTasks(state) {
      return state.tasks;
    },
    getTaskById(state,task_id){
      return state.tasks.filter((t)=>t.id===task_id)[0];
    },
    getTaskByIds(state,task_ids){
      return state.tasks.filter((t)=>task_ids.includes(t.id))[0];
    },
    getRows(state){
      return state.rows;
    },
    getTasksPerProject(state){
      return state.tasks_per_project;
    },
    getCounts(state){
      return {
        total_tasks_assigned:state.total_tasks_assigned,
        completed_tasks:state.completed_tasks,
        overdue_tasks:state.overdue_tasks,
        reviews_submitted:state.reviews_submitted,
        reviews_passed:state.reviews_passed,
      }
    }
};
