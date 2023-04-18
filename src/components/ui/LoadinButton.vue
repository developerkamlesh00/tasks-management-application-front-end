<template>
    <button :class="{ 'is-loading': isLoading }" :disabled="isLoading" @click="handleClick">
      <span v-if="isLoading">
        <i class="fa fa-spinner fa-spin"></i> Loading...
      </span>
      <span v-else>
        {{ label }}
      </span>
    </button>
  </template>
  
  <script>
  export default {
    props: {
      label: String,
      isLoading: {
        type: Boolean,
        default: false,
      },
    },
    methods: {
      handleClick() {
        if (!this.isLoading) {
          this.$emit('click')
        }
      },
    },
  }
  </script>
  
  <style scoped>
  button {
    position: relative;
    display: inline-block;
    padding: 12px 24px;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
  }
  
  button.is-loading {
    opacity: 0.6;
    cursor: not-allowed;
    pointer-events: none;
  }
  
  .fa-spinner {
    margin-right: 8px;
  }
  </style>
  