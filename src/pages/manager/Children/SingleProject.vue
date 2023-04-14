<template>

    <div>
        <p>{{singleProject}}</p>
    </div>

    <button @click="showTasks" type="button" class="btn btn-primary">Show Tasks</button>
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap">Create Task</button>

<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Add a new Task</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      
      <div class="modal-body">
        <form @submit.prevent="addTask">
          <div class="mb-3">
            <label for="task-title" class="col-form-label">title</label>
            <input type="text" class="form-control" id="task-title" v-model="title">
          </div>
          <div class="mb-3">
            <label for="task-description" class="col-form-label">description</label>
            <textarea class="form-control" id="task-description" v-model="description"></textarea>
          </div>
          <div class="mb-3">
          <label for="worker-id" class="col-form-label">Worker id</label>
          <input type="number" class="form-control" v-model="workerId" id="worker-id">
          </div>

          <div class="mb-3">
          <label for="assigned-date" class="col-form-label">Assigned Date</label>
          <input type="text" class="form-control" id="assigned-date" v-model="assignedDate">
          </div>

          <div class="mb-3">
          <label for="estimated-deadline" class="col-form-label">Estimated Deadline</label>
          <input type="text" class="form-control" id="estimated-deadline" v-model="estimated_deadline">
          </div>
          <button type="submit" class="btn btn-primary">Add Task</button>
        </form>
        
      </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        
        </div>
      </div>
    </div>
  </div>
    <table class="table" v-show="displayTasks">
  <thead>
    <tr>
      <th scope="col">id</th>
      <th scope="col">title</th>
      <th scope="col">description</th>
      <th scope="col">worker id</th>
      <th scope="col">deadline</th>
      <th scope="col">edit</th>
      <th scope="col">delete</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="taskList in taskLists" v-bind:key="taskList.id">
        <th scope="row">{{taskList.id}}</th>
        <!--<router-link :to="'/manager/projects/'+taskList.id"></router-link>-->
        <td>{{taskList.title}}</td>
        <td>{{taskList.description}}</td>
        <td>{{taskList.worker_id}}</td>
        <td>{{taskList.estimated_deadline}}</td>
        <td><button type="button" class="btn btn-light" data-bs-toggle="modal" v-bind:data-bs-target="'#exampleModal-' + taskList.id" data-bs-whatever="@getbootstrap">✏️</button>
          <div class="modal fade" v-bind:id="'exampleModal-' + taskList.id" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
    
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Edit the Task</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      
      <div class="modal-body">
        <form @submit.prevent="editTask(taskList)">
          <div class="mb-3">
            <label for="task-title" class="col-form-label">title</label>
            <input type="text" class="form-control" id="task-title" v-model="newTitle">
          </div>
          <div class="mb-3">
            <label for="task-description" class="col-form-label">description</label>
            <textarea class="form-control" id="task-description" v-model="newDescription"></textarea>
          </div>
          <div class="mb-3">
          <label for="worker-id" class="col-form-label">Worker id</label>
          <input type="number" class="form-control" v-model="newWorkerId" id="worker-id">
          </div>

          <div class="mb-3">
          <label for="assigned-date" class="col-form-label">Assigned Date</label>
          <input type="text" class="form-control" id="assigned-date" v-model="newAssignedDate">
          </div>

          <div class="mb-3">
          <label for="estimated-deadline" class="col-form-label">Estimated Deadline</label>
          <input type="text" class="form-control" id="estimated-deadline" v-model="newEstimatedDeadline">
          </div>
          <button type="submit" class="btn btn-primary">Edit Task</button>
        </form>
        
      </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        
        </div>
      </div>
    </div>
  </div>
        </td>
        <td> <button type="button" class="btn btn-light" @click="delTask(taskList.id)">🗑️</button>
</td>     
      </tr>
  </tbody>
</table>


</template>


<script>
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';



export default{
 data(){
  return {
    displayTasks: false,
    //add task data
    title:'',
    description:'',
    workerId:'',
    assignedDate:'',
    estimated_deadline:'',

    //edit task data

    newTitle:'',
    newDescription:'',
    newWorkerId:'',
    newAssignedDate:'',
    newEstimatedDeadline:'',

  }
 
 },

 
  mounted() {
    const url = this.$router.currentRoute.value.fullPath
    const pathLength=this.$router.currentRoute.value.fullPath.length-1
    const lastNumber = url.lastIndexOf("/")
    //console.log(lastNumber)
    const id = url.substr(lastNumber+1, pathLength)
    //console.log(url[pathLength])
    this.$store.dispatch('getProject', {value:id}) 
    
  },

methods:{
    ...mapActions(['getProject', 'getTasks', 'addTask', 'editTask', 'deleteTask']),

    showTasks(){
      this.displayTasks=!this.displayTasks
      const url = this.$router.currentRoute.value.fullPath
    const pathLength=this.$router.currentRoute.value.fullPath.length-1
    const lastNumber = url.lastIndexOf("/")
    //console.log(lastNumber)
    const id = url.substr(lastNumber+1, pathLength)
      this.$store.dispatch('getTasks', {value:id})

    },
    addTask(){
      const url = this.$router.currentRoute.value.fullPath
    const pathLength=this.$router.currentRoute.value.fullPath.length-1
    const lastNumber = url.lastIndexOf("/")
    //console.log(lastNumber)
    const id = url.substr(lastNumber+1, pathLength)
        this.$store.dispatch('addTask', {
          title:this.title,
          description:this.description,
          workerId:this.workerId,
          assignedDate:this.assignedDate,
          estimatedDeadline:this.estimated_deadline,
          projectId:id
        })

        this.$store.dispatch('getTasks',{value:url[pathLength]})
    },
    editTask(task){
      //console.log(task.id)
      const url = this.$router.currentRoute.value.fullPath
    const pathLength=this.$router.currentRoute.value.fullPath.length-1
    const lastNumber = url.lastIndexOf("/")
    //console.log(lastNumber)
    const id = url.substr(lastNumber+1, pathLength)
        this.$store.dispatch('editTask', {
          id:task.id,
          title:this.newTitle,
          description:this.newDescription,
          workerId:this.newWorkerId,
          assignedDate:this.newAssignedDate,
          estimatedDeadline:this.newEstimatedDeadline,
          projectId:id
        })

        this.$store.dispatch('getTasks',{value:url[pathLength]})

    },


    delTask(id){
      const url = this.$router.currentRoute.value.fullPath
    const pathLength=this.$router.currentRoute.value.fullPath.length-1
    const lastNumber = url.lastIndexOf("/")
    //console.log(lastNumber)
    const projId = url.substr(lastNumber+1, pathLength)
      this.$store.dispatch('deleteTask', {id:id})

      this.$store.dispatch('getTasks',{value:projId})
    }

  
},

computed:{
    ...mapGetters(['singleProject', 'taskLists']),
}

}
</script>