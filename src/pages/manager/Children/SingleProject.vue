<template>

    <div class="card-wrap">
               
       <div v-if="singleProject">
          <h1 class="header">Title</h1>
          <h2 style="font-family: 'Alkatra', cursive; text-align:center;">{{ singleProject.title }}</h2>
          <h2 class="header">Description</h2>
          <h3 style="text-align: center; font-family: 'Alkatra', cursive;">{{ singleProject.description }}</h3>
          <h3 class="header">Date Assigned: <span style="font-family: 'Alkatra', cursive;" v-if="singleProject.assigned_at">{{ singleProject.assigned_at.substr(0,10)  }}</span></h3>
          <h3 class="header">Deadline:<span style="font-family: 'Alkatra', cursive;" v-if="singleProject.estimated_deadline">{{ singleProject.estimated_deadline.substr(0,10) }}</span></h3>
          <h3 class="header">Date Completed : <span style="font-family: 'Alkatra', cursive;" v-if="singleProject.completed_at">{{ singleProject.completed_at.substr(0,10) }}</span></h3>
          <h3 class="header">Tasks Completed:<span style="font-family: 'Alkatra', cursive;">{{ singleProject.tasks_completed }}/{{ singleProject.total_tasks }}</span></h3>         
        </div>        
    </div> 

    <button @click="showTasks" type="button" class="btn btn-primary custom custom-button">Show Tasks</button>
    <!--Create Task Modal Starts-->
    <button type="button" class="btn btn-primary custom custom-button" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap" @click="createTask">Create Task</button>

<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Add a new Task</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      
      <div class="modal-body">
        <form @submit.prevent="addTask">
          <div class="alert alert-success" v-if="getIsSuccess === 1">The form has been submitted successfully</div>
          <div class="alert alert-danger" v-else-if="getIsSuccess === 0">The form has not been submitted</div>
          <div class="mb-3">
            <label for="task-title" class="col-form-label">title</label>
            <input type="text" class="form-control" id="task-title" v-model.trim="title" @blur="validateInput" />
            <p v-if="titleValidity==='invalid'" style="color: red;">Please enter a title</p>
          </div>
          <div class="mb-3">
            <label for="task-description" class="col-form-label">description</label>
            <textarea class="form-control" id="task-description" v-model.trim="description" @blur="validateInput" />
            <p v-if="descriptionValidity==='invalid'" style="color: red;">Please enter a description</p>
          </div>
            
        
            <div class="mb-3">
            <label for="worker-id" class="col-form-label">Worker id</label>
            <select class="form-select" aria-label="Default select example" v-model="workerId" @blur="validateInput">
              <option v-for="getAllWorkerName in getAllWorkerNames" :key="getAllWorkerName.id" :value="getAllWorkerName.id" >
                {{ getAllWorkerName.name }}
              </option>
            </select>
            <p v-if="workerIdValidity==='invalid'" style="color: red;">Please assign worker</p>
          </div>

          <div class="mb-3">
            <label for="assigned-date" class="col-form-label">Assigned Date</label>
            <input type="date" class="form-control" id="assigned-date" v-model="assignedDate" @blur="validateInput">
            <p v-if="assignedDateValidity==='invalid'" style="color: red;">Please assign a Date</p>
          </div>

          <div class="mb-3">
          <label for="estimated-deadline" class="col-form-label">Estimated Deadline</label>
          <input type="date" class="form-control" id="estimated-deadline" v-model="estimated_deadline" @blur="validateInput">
          <p v-if="estimated_deadlineValidity==='invalid'" style="color: red;">Please assign a Date</p>
          </div>
          <button type="submit" class="btn btn-primary">Add Task</button>
        </form>
        
      </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="close">Close</button>
        
        </div>
      </div>
    </div>
  </div>
<!--Create Task Modal ends-->

<!--Show Data table starts-->
  <div class="table-container">
    <table class="managers-table" v-show="displayTasks">
  <thead>
    <tr>
      <th scope="col">Id</th>
      <th scope="col">Title</th>
      <th scope="col">Description</th>
      <th scope="col">Worker Id</th>
      <th scope="col">Assigned Date</th>
      <th scope="col">Deadline</th>
      <th scope="col">Edit</th>
      <th scope="col">Delete</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="taskList in taskLists" v-bind:key="taskList.id">
        <th scope="row">{{taskList.id}}</th>
        <!--<router-link :to="'/manager/projects/'+taskList.id"></router-link>-->
        <td>{{taskList.title}}</td>
        <td>{{taskList.description}}</td>
        <td>{{taskList.worker_id}}</td>
        <td v-if="taskList.assigned_at">{{taskList.assigned_at.substr(0,10)}}</td>
        <td v-if="taskList.assigned_at">{{taskList.estimated_deadline.substr(0,10)}}</td>
        <td><button type="button" class="btn btn-light" data-bs-toggle="modal" v-bind:data-bs-target="'#exampleModal-' + taskList.id" data-bs-whatever="@getbootstrap" @click="getOldData(taskList)">✏️</button>
          <div class="modal fade" v-bind:id="'exampleModal-' + taskList.id" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
         <div class="modal-dialog">
    
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Edit the Task</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      
      <div class="modal-body">
      <form @submit.prevent="editTask(taskList)">
          <div class="alert alert-success" v-if="getIsSuccess === 1">The form has been submitted successfully</div>
          <div class="alert alert-danger" v-else-if="getIsSuccess === 0">The form has not been submitted</div>
          <div class="mb-3">
            <label for="task-title" class="col-form-label">title</label>
            <input type="text" class="form-control" id="task-title" v-model="title" @blur="validateInput">
            <p v-if="titleValidity==='invalid'" style="color: red;">Please enter a title</p>
           </div>
          <div class="mb-3">
            <label for="task-description" class="col-form-label">description</label>
            <textarea class="form-control" id="task-description" v-model="description" @blur="validateInput"></textarea>
            <p v-if="descriptionValidity==='invalid'" style="color: red;" >Please enter a description</p>
          </div>
          <div class="mb-3">
            <label for="worker-id" class="col-form-label">Worker name</label>
            <select class="form-select" aria-label="Default select example" v-model="workerId" @blur="validateInput">
              <option v-for="getAllWorkerName in getAllWorkerNames" :key="getAllWorkerName.id" :value="getAllWorkerName.id" >
                {{ getAllWorkerName.name }}
              </option>
            </select> 
            <p v-if="workerIdValidity==='invalid'" style="color: red;">Please enter a valid worker</p>
           </div>

          <div class="mb-3">
          <label for="assigned-date" class="col-form-label">Assigned Date</label>
          <input type="date" class="form-control" id="assigned-date" v-model="assignedDate" @blur="validateInput">
          <p v-if="assignedDateValidity==='invalid'" style="color: red;">Please enter a valid worker</p>
          </div>
          
          <div class="mb-3">
          <label for="estimated-deadline" class="col-form-label">Estimated Deadline</label>
          <input type="date" class="form-control" id="estimated-deadline" v-model="estimated_deadline" @blur="validateInput">
          <p v-if="estimated_deadlineValidity==='invalid'" style="color: red;">Please enter a deadline</p>
          </div>
          <button type="submit" class="btn btn-primary">Edit Task</button>
        </form>
        
       </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="close">Close</button>
        
        </div>
      </div>
    </div>
  </div>
        </td>
        <td> <button type="button" class="btn btn-light" @click="delTask(taskList.id)">🗑️</button></td>     
      </tr>
  </tbody>
</table>

</div>
<!--Show Data table ends-->

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
    workerId: '',
    assignedDate:'',
    estimated_deadline:'',

    //Validation
    titleValidity: 'pending',
    descriptionValidity: 'pending',
    workerIdValidity: 'pending',
    assignedDateValidity:'pending',
    estimated_deadlineValidity:'pending',

  }
 
 },

  mounted() {
    //let managerId = localStorage.getItem("userId")
    this.$store.dispatch("manager/getProjects")

    const url = this.$router.currentRoute.value.fullPath
    const pathLength=this.$router.currentRoute.value.fullPath.length-1
    const lastNumber = url.lastIndexOf("/")
    const id = url.substr(lastNumber+1, pathLength)
    
    this.$store.dispatch('manager/getProject', {value:id})
    this.$store.dispatch('manager/updateProjectTasks', {value:id}) 
    this.$store.dispatch('manager/getWorkerNames')   
  },

methods:{
    ...mapActions('manager',['getProjects','getProject', 'getTasks', 'addTask', 'editTask', 'deleteTask', 'updateProjectTasks', 'getWorkerNames', 'singleTask']),

    showTasks(){
      this.displayTasks=!this.displayTasks
      const url = this.$router.currentRoute.value.fullPath
      const pathLength=this.$router.currentRoute.value.fullPath.length-1
      const lastNumber = url.lastIndexOf("/")
      const id = url.substr(lastNumber+1, pathLength)
      this.$store.dispatch('manager/getTasks', {value:id})

    },
    addTask(){
      const url = this.$router.currentRoute.value.fullPath
      const pathLength=this.$router.currentRoute.value.fullPath.length-1
      const lastNumber = url.lastIndexOf("/")    
      const id = url.substr(lastNumber+1, pathLength)
        if(this.assignedDate && this.estimated_deadline && this.workerId){
        this.$store.dispatch('manager/addTask', {
          title:this.title,
          description:this.description,
          workerId:this.workerId,
          assignedDate:this.assignedDate,
          estimatedDeadline:this.estimated_deadline,
          projectId:id
        }) 
      }    
        this.$store.dispatch('manager/getTasks',{value:url[pathLength]})   
      
    },
 
    getOldData(task){
      
      this.title=task.title
      this.description=task.description
      this.workerId = task.worker_id
      this.assignedDate=task.assigned_at.substr(0,10)
      this.estimated_deadline=task.estimated_deadline.substr(0,10)    
     
    },

    createTask(){
    
      this.title=''
      this.description=''
      this.workerId = ''
      this.assignedDate=''
      this.estimated_deadline=''

    },
    editTask(task){
      
      const url = this.$router.currentRoute.value.fullPath
      const pathLength=this.$router.currentRoute.value.fullPath.length-1
      const lastNumber = url.lastIndexOf("/")
      const id = url.substr(lastNumber+1, pathLength)
        this.$store.dispatch('manager/editTask', {
          id:task.id,
          title:this.title,
          description:this.description,
          workerId:this.workerId,
          assignedDate:this.assignedDate,
          estimatedDeadline:this.estimated_deadline,
          projectId:id
        })

        this.$store.dispatch('manager/getTasks',{value:url[pathLength]})

    },


     delTask(id){
  
      const url = this.$router.currentRoute.value.fullPath
      const pathLength=this.$router.currentRoute.value.fullPath.length-1
      const lastNumber = url.lastIndexOf("/")
    
      const projId = url.substr(lastNumber+1, pathLength)
      if(confirm("Are you sure you want to delete the Task?")){
      this.$store.dispatch('manager/deleteTask', {id:id})
      this.$store.dispatch('manager/getTasks',{value:projId})
      this.$store.dispatch('manager/updateProjectTasks', {value:projId})
    }
    },
  
    validateInput(){
      if(this.title === ''){
        this.titleValidity='invalid'
      }
      else{
        this.titleValidity='valid'
      }

      if(this.description === ''){
        this.descriptionValidity='invalid'
      }
      else{
        this.descriptionValidity='valid'
      }
      if(!this.workerId){
        this.workerIdValidity='invalid'
      }
      else{
        this.workerIdValidity='valid'
      }

      if(this.assignedDate === ''){
        this.assignedDateValidity='invalid'
      }
      else{
        this.assignedDateValidity='valid'
      }
      if(this.estimated_deadline === ''){
        this.estimated_deadlineValidity='invalid'
      }
      else{
        this.estimated_deadlineValidity='valid'
      }

    },

    close(){
      this.titleValidity='pending'
      this.descriptionValidity= 'pending'
      this.workerIdValidity= 'pending'
      this.assignedDateValidity='pending'
      this.estimated_deadlineValidity='pending'
    }
  

},

computed:{
    ...mapGetters('manager',['getProjectIdCollection','singleProject','taskLists', 'getAllWorkerNames','getIsSuccess','projectLists']),
}

}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Alkatra:wght@500&family=Bebas+Neue&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Alkatra:wght@500&family=Bebas+Neue&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Alkatra:wght@500&family=Bebas+Neue&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@500&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Crimson+Text:wght@600&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Crimson+Text:wght@700&display=swap');
.card-wrap {
  padding: 40px 30px;
  position: relative;
  overflow: hidden;
  background-color: whitesmoke;
  border-radius: 5px;
  /*-webkit-box-shadow: 0px 0px 12.75px 2.25px rgba(0, 0, 0, 0.05);*/
  box-shadow: 0px 0px 12.75px 2.25px rgba(0, 0, 0, 0.05);
  margin-bottom: 20px;
}

.header {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 10px;
  color: #2c3e50; /* updated color */
  text-align: center;
  font-family: 'Bebas Neue', cursive;
}
.table-container {
  margin-top: 20px;
  height: 500px;
  overflow: scroll;
  
}
.managers-table {
  width: 100%;
  border-collapse: separate;
  font-size: 16px;
}
.managers-table td {
  padding: 12px;
  border: 1px solid #ccc;
  text-align: left;
}
.managers-table th {
  padding: 12px;
  background-color: #ff84da; /* updated color */
  color: #fff;
  text-align: left;
}

.custom{
  margin-right: 20px;
  margin-bottom: 30px;
}

.custom-button{
  width: fit-content;
  background-color: pink;
  color: #fff;
  padding: 15px;
  margin-top: 10px;
  font-weight: bold;
}

th{
  font-family: 'Crimson Text', serif;
}
td{

  font-family: 'Crimson Text', serif;

}
</style>