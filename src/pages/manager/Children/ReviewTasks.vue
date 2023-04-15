<template>

  <h1 style="text-align: center;">Tasks To be Reviewed</h1>

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
    this.$store.dispatch('getReviewTasks')
    
  },

methods:{
    ...mapActions(['getReviewTasks', 'doApproveTask', 'doRejectTask']),
    
    approveTask(reviewTaskList){
    
      this.$store.dispatch('doApproveTask', {
        id:reviewTaskList.id,
      })

      this.$store.dispatch('updateProjectTasks', {value:reviewTaskList.project_id})
      this.$store.dispatch('getReviewTasks')
      

/*
      
      this.$store.dispatch('editTask', {
          id:task.id,
      })
      
      
      
      */ 
    },
    
    
    rejectTask(reviewTaskList){
      this.$store.dispatch('doRejectTask', {
        id:reviewTaskList.id,
      })
      //this.$store.dispatch('updateProjectTasks', {value:reviewTaskList.project_id})
      this.$store.dispatch('getReviewTasks')
    }
},
    

computed:{
    ...mapGetters(['reviewTaskLists']),
}

}

</script>

<style scoped>
.table-attributes{
  height: 500px;
  width:1000px;

}

</style>