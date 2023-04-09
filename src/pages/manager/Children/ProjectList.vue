<template>
    <div>
    <h1>ProjectList</h1>
    <table class="table">
  <thead>
    <tr>
      <th scope="col">id</th>
      <th scope="col">title</th>
      <th scope="col">description</th>
      <th scope="col">task</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="projectList in projectLists" v-bind:key="projectList.id ">
        <th scope="row">{{projectList.id}}</th>
        <router-link :to="'/manager/projects/'+projectList.id"><td>{{projectList.title}}</td></router-link>
        <td>{{projectList.description}}</td>
        <td>{{projectList.total_tasks}}</td>
    </tr>
  </tbody>
</table>
    </div>
</template>

<script>

import { mapGetters } from 'vuex';
export default{

    computed:{
       
       ...mapGetters(['projectLists'])
   
},

    methods:{
      
    }
    
}

</script>

<style scoped>
.super{

    border: 2px solid red;
    height: 576px;
    display: flex;
}

.parent{
border: 2px solid goldenrod;
flex: 1;
}

.child{
    border: 2px solid goldenrod;
    flex:4;
}
</style>