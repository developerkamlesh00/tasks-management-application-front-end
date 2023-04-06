export default {
  addNewBoard(state, payload) {
    return state.boards.push(payload);
  },
  // updateTaskStatus(state, payload) {
  //   console.log("Mutations");

  //   // const task = state.tasks.filter((t) => {
  //   //     console.log(t.id,task_id)
  //   //     t.id == task_id;
  //   // })[0];
  //   // console.log(state.tasks)
  //   console.log(task);
  //   //   task.status_id=status_id
  //   return;
  // },
  setData(state) {
    state.tasks.forEach((task) => {
      let obj = {
        id: task.id,
        assigned: new Date(task.assigned_at),
        deadline: new Date(task.estimated_deadline),
      };
      state.tasks_assigned_deadline.push(obj);
      const isCompleted = task.status_id == 4;
      const current_time = new Date();
      if (isCompleted && task.completed_at) {
        state.completed_tasks += 1;
        obj = { id: task.id, timestamp: new Date(task.completed_at) };
        state.tasks_completed.push(obj);
      } else if (obj.deadline > current_time) {
        state.overdue_tasks += 1;
        const time_elapsed = obj.deadline - obj.assigned;
        const new_obj = { id: task.id, time_elapsed };
        state.tasks_with_passed_deadlines.push(new_obj);
      }

      // if(task.status_id==4 && task.completed_at){
      //   state.completed_tasks+=1;
      //   let obj={"id":task.id,"timestamp":new Date(task.completed_at)}
      //   state.tasks_completed.push(obj);
      // }
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
      task.review_passed === 1
        ? state.reviews_passed++
        : state.reviews_submitted++;
    });

    state.reviews_submitted += state.reviews_passed;

    console.log("total_tasks_assigned", state.total_tasks_assigned);
    console.log("completed_tasks", state.completed_tasks);
    console.log("overdue_tasks", state.overdue_tasks);
    console.log("tasks_completed", state.tasks_completed);
    console.log("tasks_assigned_deadline", state.tasks_assigned_deadline);
    console.log(
      "tasks_with_passed_deadlines",
      state.tasks_with_passed_deadlines
    );
    console.log("tasks_per_project", state.tasks_per_project);
    console.log("state.reviews_submitted", state.reviews_submitted);
    console.log("state.reviews_passed", state.reviews_passed);
  },
  setTasks(state, { tasks }) {
    console.log("Setting Tasks");
    state.tasks = tasks;
    console.log(tasks);
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
      console.log("state.rows", state.rows);
    }
    //   for(let i=0;i<state.total_tasks_assigned;i++){
    //     const t=state.tasks[i];
    //   state.rows.push([t.id,t.title,t.description,t.assigned_at,t.estimated_deadline,state.status[t.status_id]])
    // }
    return state.rows;
  },

};

function formatDate(date) {
  date = new Date(date);
  var year = date.getFullYear(),
      month = date.getMonth() + 1, // months are zero indexed
      day = date.getDate(),
      hour = date.getHours(),
      minute = date.getMinutes(),
      // second = date.getSeconds(),
      hourFormatted = hour % 12 || 12, // hour returned in 24 hour format
      minuteFormatted = minute < 10 ? "0" + minute : minute,
      morning = hour < 12 ? "am" : "pm";

  return month + "/" + day + "/" + year + " " + hourFormatted + ":" +
      minuteFormatted + morning;
}