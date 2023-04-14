<template>
    <div>
    <h1 style="text-align: center;">WorkerList</h1>
<div id="dtHorizontalVerticalExample"
      class="table table-bordered table-sm table-attributes"
      cellspacing="0"
      width="100%">
<table class="table" >
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
        <router-link :to="'/manager/workers/'+ workerList.id"><td>{{workerList.name}}</td></router-link>
        <td>{{workerList.email}}</td>
        <td>{{workerList.organization_id}}</td>
    </tr>
  </tbody>
</table>

        </div>
      </div>

</template>

<script>
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';
export default{
computed:
{
    ...mapGetters(['workerLists'])
},
mounted(){
    this.$store.dispatch("getWorkers")
  },

methods:{
  ...mapActions['getWorkers'],
 
 
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
  width:1000px;
  overflow: scroll;
}
</style>