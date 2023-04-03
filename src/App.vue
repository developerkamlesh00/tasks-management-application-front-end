<template>
 <the-header></the-header>
  <main>
    
    <!-- <Table ></Table>
  <ExportButton :handle-export="handleExport" /> -->
    <router-view></router-view>
  </main>
  <the-footer></the-footer>
</template>

<script>

import TheHeader from './components/navigation/TheHeader.vue';
import TheFooter from './components/navigation/TheFooter.vue';
// import TheFooter from './components/navigation/TheFooter.vue';
// import Table from './components/Table.vue'
// import ExportButton from './components/ExportButton.vue'

export default {
  components:{
    TheHeader,
    TheFooter,
    // Table,
    // ExportButton
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
 
}

</style>
