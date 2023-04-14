<template>

    <div>
        <p>{{singleWorker}}</p>
    </div>

    <button @click="showAssignedTasks" type="button" class="btn btn-primary">Show Assigned Tasks</button>
    <table class="table" v-show="displayTasks">
  <thead>
    <tr>
      <th scope="col">id</th>
      <th scope="col">title</th>
      <th scope="col">description</th>
      <th scope="col">deadline</th>
      <th scope="col">edit</th>
      <th scope="col">delete</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="assignedTaskList in assignedTaskLists" v-bind:key="assignedTaskList.id ">
        <th scope="row">{{assignedTaskList.id}}</th>
        <!--<router-link :to="'/manager/projects/'+taskList.id"></router-link>-->
        <td>{{assignedTaskList.title}}</td>
        <td>{{assignedTaskList.description}}</td>
        <td>{{assignedTaskList.estimated_deadline}}</td>
        <td>{{ assignedTaskList.projectId }}</td>
        <td> <button type="button" class="btn btn-light" @click="delTask(taskList.id)">🗑️</button></td>
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
    displayTasks:false

  }
 
 },
  mounted() {
    //const newurl = this.$router.currentRoute.value.fullpath.lastIndexOf('/')
    //console.log(newurl)
    const url = this.$router.currentRoute.value.fullPath
    const pathLength=this.$router.currentRoute.value.fullPath.length-1
    const lastNumber = url.lastIndexOf("/")
    //console.log(lastNumber)
    const id = url.substr(lastNumber+1, pathLength)
    //console.log(id)
    
    //console.log(url[pathLength])
    this.$store.dispatch('getWorker', {value:id}) 
    
  },

methods:{
    ...mapActions(['getWorker', 'getAssignedTasks']),

    mounted(){
    const url = this.$router.currentRoute.value.fullPath
    const pathLength=this.$router.currentRoute.value.fullPath.length-1
    const lastNumber = url.lastIndexOf("/")
    //console.log(lastNumber)
    const id = url.substr(lastNumber+1, pathLength)
    //console.log(url[pathLength])
    this.$store.dispatch('getWorker', {value:id}) 
    },

    showAssignedTasks(){
    const url = this.$router.currentRoute.value.fullPath
    const pathLength=this.$router.currentRoute.value.fullPath.length-1
    const lastNumber = url.lastIndexOf("/")
    //console.log(lastNumber)
    const id = url.substr(lastNumber+1, pathLength)
        this.$store.dispatch('getAssignedTasks', {value:id}) 
        this.displayTasks=!this.displayTasks
    }

},

computed:{
    ...mapGetters(['singleWorker', 'assignedTaskLists']),
}

}
</script>