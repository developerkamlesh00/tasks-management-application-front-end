<template>
 <the-header></the-header>
  <main>
    <router-view/>
  </main>
  <Table ></Table>
  <ExportButton :handle-export="handleExport" />
</template>

<script>

import TheHeader from './components/navigation/TheHeader.vue';
// import TheFooter from './components/navigation/TheFooter.vue';
import Table from './components/Table.vue'
import ExportButton from './components/ExportButton.vue'

export default {
  components:{
    TheHeader,
    Table,
    ExportButton,
    // TheFooter
  },
  name: 'App',
  methods: {
    handleExport() {
      // Your export logic goes here
      console.log('Export button clicked')
    },
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
 
}

</style>
