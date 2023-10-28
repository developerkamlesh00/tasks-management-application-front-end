<template>

    <div class="card-wrap">
      <div v-if="singleWorker">
        <h1 style="text-align: center; font-family:'Bebas Neue', cursive;">Name: <span style="font-family: 'Alkatra', cursive;">{{singleWorker.name}}</span></h1>
        <h3 style="text-align: center; font-family:'Bebas Neue', cursive;">Email: <span style="font-family: 'Alkatra', cursive;">{{ singleWorker.email}}</span></h3>
      </div>     
    </div>

    <button @click="showAssignedTasks" type="button" class="btn btn-primary custom-button" >Show Assigned Tasks</button>
    <div class="table-container">
    <table class="managers-table" v-show="displayTasks">
  <thead>
    <tr>
      <th scope="col">id</th>
      <th scope="col">title</th>
      <th scope="col">description</th>
      <th scope="col">deadline</th>
      <th scope="col">Project Id</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="assignedTaskList in assignedTaskLists" v-bind:key="assignedTaskList.id ">
        <th scope="row">{{assignedTaskList.id}}</th>
        <!--<router-link :to="'/manager/projects/'+taskList.id"></router-link>-->
        <td>{{assignedTaskList.title}}</td>
        <td>{{assignedTaskList.description}}</td>
        <td>{{assignedTaskList.estimated_deadline.substr(0,10)}}</td>
        <td>{{ assignedTaskList.project_id }}</td>
       
      </tr>
  </tbody>
</table>
</div>

</template>


<script>
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';



export default{
 data(){
  return {
    displayTasks:false

  }
 
 },
  mounted() {
    const url = this.$router.currentRoute.value.fullPath
    const pathLength=this.$router.currentRoute.value.fullPath.length-1
    const lastNumber = url.lastIndexOf("/")
    const id = url.substr(lastNumber+1, pathLength)
    this.$store.dispatch('manager/getWorker', {value:id})
  },

methods:{
    ...mapActions('manager',['getWorker', 'getAssignedTasks']),

    mounted(){
    const url = this.$router.currentRoute.value.fullPath
    const pathLength=this.$router.currentRoute.value.fullPath.length-1
    const lastNumber = url.lastIndexOf("/")
    //console.log(lastNumber)
    const id = url.substr(lastNumber+1, pathLength)
    //console.log(url[pathLength])
    this.$store.dispatch('manager/getWorker', {
        value:id
      }) 
    },
   // hiddenModal={() => console.log('closed')},
    showAssignedTasks(){
    const url = this.$router.currentRoute.value.fullPath
    const pathLength=this.$router.currentRoute.value.fullPath.length-1
    const lastNumber = url.lastIndexOf("/")
    //console.log(lastNumber)
    const id = url.substr(lastNumber+1, pathLength)
        this.$store.dispatch('manager/getAssignedTasks', {value:id}) 
        this.displayTasks=!this.displayTasks
    }

},

computed:{
    ...mapGetters('manager',['singleWorker', 'assignedTaskLists']),
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

.custom-button{
  width: fit-content;
  background-color: pink;
  color: #fff;
  padding: 15px;
  margin-top: 10px;
  margin-bottom: 20px;
  font-weight: bold;
}

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