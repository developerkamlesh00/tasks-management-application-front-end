<template>

  <h1 style="text-align: center;font-family: 'Bebas Neue', cursive;">Tasks To be Reviewed</h1>

<div class="table-responsive text-nowrap table-content table-attributes">
<table id="dtHorizontalVerticalExample"
      class="table table-bordered table-sm"
      cellspacing="0"
      width="100%">
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
      })

      this.$store.dispatch('manager/updateProjectTasks', {value:reviewTaskList.project_id})
      this.$store.dispatch('manager/getReviewTasks')
      

/*
      
      this.$store.dispatch('editTask', {
          id:task.id,
      })
      
      
      
      */ 
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


.table-attributes{
  height: 500px;
  width:1000px;

}

th{
  font-family: 'Crimson Text', serif;

}
td{

  font-family: 'Crimson Text', serif;


}

</style>