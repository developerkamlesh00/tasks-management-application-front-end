import formatDate from '../../../utils/formatDate.js'

export default {
  setLoading(state){
    state.isLoading=true;
  },
  unsetLoading(state){
    state.isLoading=false;
  },
  setMessage(state,data){
    state.message=data;
    state.showMessage=true;
   },
  unsetMessage(state){
    state.message='';
    state.showMessage=false;
   },
  setComments(state,data){
    state.comments=data;
  },
  setProjects(state,data){
    state.projects=data;
  },
  setProjectTasks(state,data){
    state.project_tasks=data;
  },
  setData(state) {
    state.todo=0
    state.doing=0
    state.pending=0;
    state.overdue_tasks=0;
    state.reviews_submitted=0;
    state.reviews_passed=0;
    state.completed_tasks=0;

    state.tasks_per_project={}; //{project_id:[{completed:task.id},pending:{}]}
    state.tasks_with_passed_deadlines=[]

    state.tasks.forEach((task) => {
      let obj = {
        id: task.id,
        assigned: new Date(task.assigned_at),
        deadline: new Date(task.estimated_deadline),
      };
      const isCompleted = task.status_id == 4;
      const current_time = new Date();
      // console.log(obj.deadline,current_time)
      if (isCompleted) {
        state.completed_tasks += 1;
      } else if (obj.deadline < current_time) {
        state.overdue_tasks += 1;
        const time_elapsed = obj.deadline - obj.assigned;
        const new_obj = { id: task.id,title:task.title, time_elapsed };
        state.tasks_with_passed_deadlines.push(new_obj);
      }
      if(task.status_id==1){
        state.todo+=1;
      }else if(task.status_id==2){
        state.doing+=1;
      }
      if (task.project_id in state.tasks_per_project) {
        isCompleted
          ? state.tasks_per_project[task.project_id]["completed"].push(task.id)
          : state.tasks_per_project[task.project_id]["pending"].push(task.id);
      } else {
        state.tasks_per_project[task.project_id] = {};
        state.tasks_per_project[task.project_id]["completed"] = [];
        state.tasks_per_project[task.project_id]["pending"] = [];
        isCompleted
          ? state.tasks_per_project[task.project_id]["completed"].push(task.id)
          : state.tasks_per_project[task.project_id]["pending"].push(task.id);
      }
      
      state.reviews_passed=state.completed_tasks;
      state.pending=state.total_tasks_assigned-state.completed_tasks;
      task.status_id===3?state.reviews_submitted++:'';
    });

    // console.log("total_tasks_assigned", state.total_tasks_assigned);
    // console.log("completed_tasks", state.completed_tasks);
    // console.log("overdue_tasks", state.overdue_tasks);
    // console.log("tasks_completed", state.tasks_completed);
    // console.log("tasks_assigned_deadline", state.tasks_assigned_deadline);
    // console.log(
    //   "tasks_with_passed_deadlines",
    //   state.tasks_with_passed_deadlines
    // );
    // console.log("tasks_per_project", state.tasks_per_project);
    // console.log("state.reviews_submitted", state.reviews_submitted);
    // console.log("state.reviews_passed", state.reviews_passed);
  },
  setTasks(state, { tasks }) {
    state.tasks = tasks;
    state.total_tasks_assigned = tasks.length;
    return;
  },
  setRows(state) {
    state.rows = [];
    if (state.tasks.length>0) {
      state.tasks.forEach((t) =>
        state.rows.push([
          t.id,
          t.title,
          t.description,
          formatDate(t.assigned_at),
          formatDate(t.estimated_deadline),
          state.status[t.status_id],
        ])
      );
    }
    return state.rows;
  },

};

