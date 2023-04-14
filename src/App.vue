<template>
  <div class="body">  
    <the-header></the-header>
    <div class="p-1">
      <router-view v-slot="{Component}">
        <!-- <BaseChart/> -->
        <!-- <transition name="slide"> -->
          <component :is="Component" />
        <!-- </transition> -->
      </router-view>
    </div>
    <the-footer></the-footer>
</div>

</template>

<script>
// import BaseChart from './components/ui/BaseChart.vue'
import TheHeader from './components/navigation/TheHeader.vue';
import TheFooter from './components/navigation/TheFooter.vue';
// import TheFooter from './components/navigation/TheFooter.vue';
// import Table from './components/Table.vue'
// import ExportButton from './components/ExportButton.vue'

export default {
  components:{
    TheHeader,
    TheFooter,
  },
  created() {
    this.$store.dispatch('tryLogin');
  },
    
}
</script>

<style>
.pointer {cursor: pointer;}
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
*/
.body{
  background: linear-gradient(60deg, rgb(101, 84, 192), rgb(249, 156, 219)) 0% 0% / auto repeat scroll padding-box border-box rgb(101, 84, 192);
}

.pink{
  color:rgb(101, 84, 192);
  background-color: rgb(249, 156, 219);
  font-weight: 700px;
  
}

.blue{
  color:rgb(249, 156, 219);
  background-color: rgb(101, 84, 192);
  font-weight: 700px;
}

.blue:hover{
  color:rgb(101, 84, 192);
  background-color: rgb(249, 156, 219);
  font-weight: 700px;
}

.pink:hover{
  color:rgb(249, 156, 219);
  background-color: rgb(101, 84, 192);
  font-weight: 700px;

}
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
