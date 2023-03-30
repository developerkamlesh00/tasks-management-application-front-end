<template>
  <Table ></Table>
  <ExportButton :handle-export="handleExport" />
</template>

<script>
import Table from './components/Table.vue'
import ExportButton from './components/ExportButton.vue'

export default {
  name: 'App',
  components: {
    Table,
    ExportButton,
  },
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
