export default {

    // for loading spinner
    isLoading(state) {
      return state.isLoading;
    },
    // As of now, there are 4 boards - todo, doing, review and completed
    getBoards(state) {
      return state.boards;
    },
    // Tasks status object mapping int -> str like 1 -> ToDo,...
    getStatus(state) {
      return state.status;
    },
    // Tasks status object mapping str -> int like ToDo -> 1,...
    getStatusId(state) {
      return state.statusId;
    },
    // All worker tasks (i.e assigned to him/her)
    getTasks(state) {
      return state.tasks;
    },
    // Not used
    // getTaskByIds(state,task_ids){
    //   return state.tasks.filter((t)=>task_ids.includes(t.id))[0];
    // },

    // For searching converted task object to array
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
    // For various data values used in visualization and in Task Tab 
    getCounts(state){
      return {
        total_tasks_assigned:state.total_tasks_assigned,
        completed_tasks:state.completed_tasks,
        todo:state.todo,
        doing:state.doing,
        overdue_tasks:state.overdue_tasks,
        reviews_submitted:state.reviews_submitted,
        reviews_passed:state.reviews_passed,
        pending:state.pending,
      }
    },

    // For alert messages when setting are changed
    message(state){
      return state.message;
    },
    showMessage(state){
      return state.showMessage;
    },
};
