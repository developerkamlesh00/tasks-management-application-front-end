<template>
    <div class="container p-5">
      <h2>Settings</h2>
      <hr/>
      <label class="form-label d-inline">Board Background Color:</label>
      <input type="color" v-model="boardColor" class="m-2 form-input">
      <br/>
      <label class="form-label d-inline">Card Theme Color:</label>
      <input type="color" v-model="cardColor" class="m-2 form-input">
      <hr/>
      <button @click="saveSettings" class="btn container-fluid blue">Save Settings</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        boardColor: '#313131',
        cardColor: '#007bff',
      }
    },
    methods: {
      saveSettings() {
        localStorage.setItem('boardColor', this.boardColor);
        localStorage.setItem('cardColor', this.cardColor);
      },
    },
    mounted() {
      const boardColor = localStorage.getItem('boardColor');
      const cardColor = localStorage.getItem('cardColor');
      if (boardColor) {
        this.boardColor = boardColor;
      }
      if (cardColor) {
        this.cardColor = cardColor;
      }
    },
  }
  </script>
  
  <style scoped>
  label {
    display: block;
    margin-bottom: 10px;
  }
  button {
    margin-top: 20px;
  }
  </style>
  