<template>
    <div>
    <h1>WorkerList</h1>
<table class="table">
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
        <td>{{workerList.name}}</td>
        <td>{{workerList.email}}</td>
        <td>{{workerList.organization_id}}</td>
    </tr>
  </tbody>
</table>

        </div>

</template>

<script>
import { mapGetters } from 'vuex';
export default{
computed:
{
    ...mapGetters(['workerLists'])
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