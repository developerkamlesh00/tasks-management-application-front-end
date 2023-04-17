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
.bgLight{
  /* light */
  background: linear-gradient(60deg, rgb(101, 84, 192), rgb(249, 156, 219)) 0% 0% / auto repeat scroll padding-box border-box rgb(101, 84, 192);
};
.bgDark{
  /* dark */
  background: linear-gradient(60deg, rgb(82, 67, 170), rgb(237, 80, 180)) 0% 0% / auto repeat scroll padding-box border-box rgb(82, 67, 170);
};

.pink{
  color:rgb(101, 84, 192);
  background-color: rgb(249, 156, 219);
  
}

.blue{
  color:rgb(249, 156, 219);
  background-color: rgb(101, 84, 192);
}
.color_pink{
  color:rgb(101, 84, 192);
  background-color: rgb(249, 156, 219);
  
}

.color_blue{
  color:rgb(249, 156, 219);
  background-color: rgb(101, 84, 192);
}

.blue:hover{
  color:rgb(101, 84, 192);
  background-color: rgb(249, 156, 219);
}

.pink:hover{
  color:rgb(249, 156, 219);
  background-color: rgb(101, 84, 192);
}


.card1 {
    background-image: linear-gradient(135deg,
            hsl(311deg 100% 86%) 0%,
            hsl(311deg 100% 88%) 9%,
            hsl(311deg 100% 90%) 19%,
            hsl(311deg 100% 91%) 31%,
            hsl(311deg 100% 93%) 45%,
            hsl(311deg 100% 94%) 59%,
            hsl(311deg 100% 96%) 73%,
            hsl(311deg 100% 97%) 84%,
            hsl(311deg 100% 99%) 93%,
            hsl(0deg 0% 100%) 100%);
}

.card2 {
    background-image: linear-gradient(135deg,
            hsl(278deg 100% 88%) 0%,
            hsl(278deg 100% 88%) 5%,
            hsl(278deg 100% 89%) 11%,
            hsl(278deg 100% 90%) 16%,
            hsl(278deg 100% 90%) 21%,
            hsl(278deg 100% 91%) 26%,
            hsl(279deg 100% 92%) 32%,
            hsl(279deg 100% 92%) 37%,
            hsl(279deg 100% 93%) 42%,
            hsl(279deg 100% 94%) 47%,
            hsl(279deg 100% 94%) 53%,
            hsl(279deg 100% 95%) 58%,
            hsl(279deg 100% 96%) 63%,
            hsl(280deg 100% 96%) 68%,
            hsl(280deg 100% 97%) 74%,
            hsl(280deg 100% 97%) 79%,
            hsl(280deg 100% 98%) 84%,
            hsl(280deg 100% 99%) 89%,
            hsl(280deg 100% 99%) 95%,
            hsl(0deg 0% 100%) 100%);
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
