<template>

  <h1 class="header">Tasks To be Reviewed</h1>

<div class="table-container">
<table class="managers-table">
  <thead>
    <tr>
      <th scope="col">id</th>
      <th scope="col">title</th>
      <th scope="col">description</th>
      <th scope="col">project id</th>
      <th scope="col">approve</th>
      <th scope="col">reject</th>
    </tr>
  </thead>
  <tbody>
    
    <tr v-for="reviewTaskList in reviewTaskLists" v-bind:key="reviewTaskList.id">
      <th scope="row">{{reviewTaskList.id}}</th>
      <td>{{reviewTaskList.title}}</td>
      <td>{{reviewTaskList.description}}</td>
      <td>{{reviewTaskList.project_id}}</td>
      <td><button type="button" class="btn btn-light" @click="approveTask(reviewTaskList)">✔️</button></td>
      <td><button type="button" class="btn btn-light" @click="rejectTask(reviewTaskList)">❌</button></td>
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

  }
 
 },

 
  mounted() {
    this.$store.dispatch('manager/getReviewTasks')
    
  },

methods:{
    ...mapActions('manager',['getReviewTasks', 'doApproveTask', 'doRejectTask']),
    
    approveTask(reviewTaskList){
      this.$store.dispatch('manager/doApproveTask', {
        id:reviewTaskList.id,
        projId:reviewTaskList.project_id
      })

      this.$store.dispatch('manager/updateProjectTasks', {value:reviewTaskList.project_id})
      this.$store.dispatch('manager/getReviewTasks')
  
    },
    
    
    rejectTask(reviewTaskList){
      this.$store.dispatch('manager/doRejectTask', {
        id:reviewTaskList.id,
      })
      //this.$store.dispatch('updateProjectTasks', {value:reviewTaskList.project_id})
      this.$store.dispatch('manager/getReviewTasks')
    }
},
    

computed:{
    ...mapGetters('manager',['reviewTaskLists']),
}

}

</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Alkatra:wght@500&family=Bebas+Neue&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@500&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Crimson+Text:wght@600&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Crimson+Text:wght@700&display=swap');
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

th{
  font-family: 'Crimson Text', serif;

}
td{

  font-family: 'Crimson Text', serif;

}



</style>