<template>

<table class="table">
  <thead>
    <tr>
      <th scope="col">id</th>
      <th scope="col">title</th>
      <th scope="col">description</th>
      <th scope="col">approve</th>
      <th scope="col">reject</th>
    </tr>
  </thead>
  <tbody>
    
    <tr v-for="reviewTaskList in reviewTaskLists">
      <th scope="row">{{reviewTaskList.id}}</th>
      <td>{{reviewTaskList.title}}</td>
      <td>{{reviewTaskList.description}}</td>
      <td>{{reviewTaskList.project_id}}</td>
      <td>@mdo</td>
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

  }
 
 },

 
  mounted() {
    this.$store.dispatch('getReviewTasks')
    
  },

methods:{
    ...mapActions(['getReviewTasks']),
},
    

computed:{
    ...mapGetters(['reviewTaskLists']),
}

}

</script>