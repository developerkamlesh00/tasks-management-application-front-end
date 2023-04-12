<template>
    <button @click="handleExportClick">Export Data</button>
  </template>
  
  <script>
  export default {
    name: 'ExportButton',
    props: {
      handleExport: Function,
    },
    methods: {
      handleExportClick() {
        this.handleExport()
      },
    },
  }
  </script>
  