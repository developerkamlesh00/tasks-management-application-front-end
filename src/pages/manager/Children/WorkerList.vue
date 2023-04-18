<template>
    
    <h1 class="header" style="font-family: 'Bebas Neue', cursive;" >WorkerList</h1>

    <div class="table-container">

<table class="managers-table">
  <thead>
    <tr>
      <th scope="col">id</th>
      <th scope="col">name</th>
      <th scope="col">email</th>
      <th scope="col">org_id</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="workerList in workerLists" v-bind:key="workerList.id ">
        <th scope="row">{{workerList.id}}</th>
        <td class="enter"><router-link :to="'/manager/workers/'+ workerList.id">{{workerList.name}}</router-link></td>
        <td>{{workerList.email}}</td>
        <td>{{workerList.organization_id}}</td>
    </tr>
  </tbody>
</table>
</div>
        
      

</template>

<script>
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';
export default{
computed:
{
    ...mapGetters('manager',['workerLists'])
},
mounted(){
    this.$store.dispatch("manager/getWorkers")
  },

methods:{
  ...mapActions('manager',['getWorkers']),
 
 
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
}
a{
  text-decoration: none;
  color: black;  
}


.enter:hover{
  background-color: lightcoral;
  cursor: pointer;

}
.enter:hover a{
  color: aliceblue;
  font-weight: bold;
}
a:hover{
  color:aliceblue;
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
  border-collapse: separate;
  font-size: 16px;
  width: 100%;
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