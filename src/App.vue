<template>
  <div class="body">  
    <the-header></the-header>
  <main>
    <router-view v-slot="{Component}">
      <transition name="slide">
      <component :is="Component" />
      </transition>

    </router-view>
  </main>
</div>

</template>

<script>

import TheHeader from './components/navigation/TheHeader.vue';
import TheFooter from './components/navigation/TheFooter.vue';

export default {
  components:{
    TheHeader,
    TheFooter
  }

  
}
</script>

<style>
/*
.fade-button-enter-from,
.fade-button-leave-to{
opacity: 0;
}

.fade-button-enter-active{
transition:opacity 0.5s ease-in;
}

.fade-button-leave-active{
  transition: opacity 0.5s ease-out;
}

.route-leave-active{
  animation: slide-scale 0.5s ease-out;
}

.body{
  width: 100%;
  min-height: 100vh;
}
*/

.slide-enter-active,
.slide-leave-active {
  transition: all 1s ease-in-out;
}
.slide-enter-to {
  position: absolute;
  right: 0;
}
.slide-enter-from {
  position: absolute;
  right: -100%;
}
.slide-leave-to {
  position: absolute;
  left: -100%;
}
.slide-leave-from {
  position: absolute;
  left: 0;
}

/*.wrapper {
  width: 100%;
  min-height: 100vh;
}*/
</style>
