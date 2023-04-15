export default {
  
    getBoards(state) {
      return state.boards;
    },
    getStatus(state) {
      return state.status;
    },
    getStatusId(state) {
      return state.statusId;
    },
    getTasks(state) {
      return state.tasks;
    },
    getTaskByIds(state,task_ids){
      return state.tasks.filter((t)=>task_ids.includes(t.id))[0];
    },
    getRows(state){
      return state.rows;
    },
    getComments(state){
      return state.comments;
    },
    getProjects(state){
      return state.projects;
    },
    getTasksPerProject(state){
      return state.tasks_per_project;
    },
    getProjectTasks(state){
      return state.project_tasks
    },
    getCounts(state){
      return {
        total_tasks_assigned:state.total_tasks_assigned,
        completed_tasks:state.completed_tasks,
        overdue_tasks:state.overdue_tasks,
        reviews_submitted:state.reviews_submitted,
        reviews_passed:state.reviews_passed,
        pending:state.pending,
      }
    },
    message(state){
      return state.message;
    },
    showMessage(state){
      return state.showMessage;
    },
};
