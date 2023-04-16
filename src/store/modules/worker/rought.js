
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
        : state.pending++;
      task.status_id===3?state.reviews_submitted++:'';
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

  <!-- Create new Board -->
  <!-- <div class="container">
      <input type="text" class="form-control w-75 me-2 d-inline" v-model="board_name" placeholder="Enter Board Name">
      <button class="btn btn-primary px-3" @click="createNewBoard()">+Add board</button>
  </div> -->

  
  createNewBoard() {
    if (this.board_name !== "") {
        this.addBoard(this.board_name)
        console.log('New board added!')
        this.boards = this.getBoards
    } else {
        alert('Board Name cannot be empty')
    }