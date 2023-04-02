<template>
  <the-header></the-header>
  <main>
    <router-view></router-view>
  </main>
  <the-footer></the-footer>
</template>

<script>

import TheHeader from './components/navigation/TheHeader.vue';
import TheFooter from './components/navigation/TheFooter.vue';

export default {
  components:{
    TheHeader,
    TheFooter
  },
  created() {
    this.$store.dispatch('tryLogin');
  },
}
</script>

<style>

</style>
