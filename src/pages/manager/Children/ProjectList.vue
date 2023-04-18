<template>
    
    <h1 class="header" style="font-family: 'Bebas Neue', cursive;">Projects Assigned</h1>

    <div class="table-container">
    <table class="managers-table">
      <thead>
        <tr>
          <th scope="col">No.</th>
          <th scope="col">Title</th>
          <th scope="col">Desciption</th>
          <th scope="col">Assigned Date</th>
          <th scope="col">Estimated Deadline</th>
          <th scope="col">Completed Date</th>
          <th scope="col">Completed Tasks</th>
          <th scope="col">Total Tasks</th>
          <th scope="col">Worker Visibility</th>         
          
        </tr>
      </thead>
      <tbody>
        <tr v-for="projectList in projectLists" :key="projectList.id">
          
          <th scope="row">{{ projectList.id }}</th>
          <td class="enter"><router-link :to="'/manager/projects/'+projectList.id">{{ projectList.title }}</router-link></td>
          <td>{{ projectList.description }}</td>
          <td><p v-if="projectList.assigned_at">{{ projectList.assigned_at.substr(0,10) }}</p></td>
          <td><p v-if="projectList.estimated_deadline">{{ projectList.estimated_deadline.substr(0,10) }}</p></td>
          <td><p v-if="projectList.completed_at">{{ projectList.completed_at.substr(0,10) }}</p></td>  
          <td>{{ projectList.tasks_completed }}</td>  
          <td>{{ projectList.total_tasks }}</td>
           <td>
              <button v-if="projectList.workers_visibility" type="button" class="btn btn-light" @click="changeVisibility(projectList)">
              ON
            </button>
            <button v-else type="button" class="btn btn-light" @click="changeVisibility(projectList)">
              OFF
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    </div>
</template>

<script>
import {mapActions} from 'vuex';
import { mapGetters } from 'vuex';
export default{


    data(){
      return{
        visible:false
      }
      
    },

    computed:{
       
       ...mapGetters('manager',['projectLists', 'getVisible'])
   
},mounted(){
        this.$store.dispatch("manager/getProjects")
      },

    methods:{
      ...mapActions('manager',['getProjects', 'getWorkers', 'reviewTasks', 'toggleVisibility']),
      
      changeVisibility(projectList){
        
        this.$store.dispatch("manager/toggleVisibility",{id:projectList.id})
        this.$store.dispatch("manager/getProjects")
       
        
      }
    }
    
}

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Alkatra:wght@500&family=Bebas+Neue&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@500&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Crimson+Text:wght@600&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Crimson+Text:wght@700&display=swap');
a{
  text-decoration: none;
  color: black;
  
}
.enter:hover{
  background-color: lightcoral;
  cursor: pointer;
}
.enter:hover a{

  cursor: pointer;
  color: aliceblue;
  font-weight: bold;
}
a:hover{
  color:aliceblue
}

th{
  font-family: 'Crimson Text', serif;

}
td{
  font-family: 'Crimson Text', serif;
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

.header {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 10px;
  color: #2c3e50; /* updated color */
  text-align: center;
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
</style>