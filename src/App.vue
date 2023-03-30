<template>
  <the-header></the-header>
  <main>
    <router-view/>
  </main>
</template>

<script>

import TheHeader from './components/navigation/TheHeader.vue';
// import TheFooter from './components/navigation/TheFooter.vue';

export default {
  components:{
    TheHeader,
    // TheFooter
  }
}
</script>

<style>

</style>
