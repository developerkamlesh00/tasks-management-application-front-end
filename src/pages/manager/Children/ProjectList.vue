<template>
    
    <h1 style="text-align: center;">Projects Assigned</h1>
    <div class="table-responsive text-nowrap table-content table-attributes">
    <table
      id="dtHorizontalVerticalExample"
      class="table table-bordered table-sm"
      cellspacing="0"
      width="100%">
      <thead>
        <tr>
          <th scope="col">No.</th>
          <th scope="col">Title</th>
          <th scope="col">Desciption</th>
          <th scope="col">Assigned Date</th>
          <th scope="col">Estimated Deadline</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="projectList in projectLists" :key="projectList.id">
          <th scope="row">{{ projectList.id }}</th>
          <router-link :to="'/manager/projects/'+projectList.id"><td>{{ projectList.title }}</td></router-link>
          <td>{{ projectList.description }}</td>
          <td>{{ projectList.assigned_at }}</td>
          <td>{{ projectList.estimated_deadline }}</td>
          <td>{{ projectList.completed_at }}</td>  
        </tr>
      </tbody>
    </table>
    </div>
</template>

<script>
import {mapActions} from 'vuex';
import { mapGetters } from 'vuex';
export default{

    computed:{
       
       ...mapGetters(['projectLists'])
   
},mounted(){
        this.$store.dispatch("getProjects")
      },

    methods:{
      ...mapActions(['getProjects', 'getWorkers', 'reviewTasks']),

      

    }
    
}

</script>

<style scoped>

a{
  text-decoration: none;
  color: black;
  
}

.table-attributes{
  height: 500px;
  width:1000px
}

</style>