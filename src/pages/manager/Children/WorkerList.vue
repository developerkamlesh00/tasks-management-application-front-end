<template>
    
    <h1 style="text-align: center; font-family: 'Bebas Neue', cursive;" >WorkerList</h1>

    <div class="table-responsive text-nowrap table-content table-attributes">

<table id="dtHorizontalVerticalExample"
      class="table table-bordered table-sm"
      cellspacing="0"
      width="100%">
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
a{
  text-decoration: none;
  color: black;  
}

.table-attributes{
  height: 500px;
  width:1000px;
  
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
</style>