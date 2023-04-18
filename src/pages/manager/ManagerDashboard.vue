<template>
  <base-card id="cardmain">
    <div class="row">
        
        <base-card id="card" class="card1">
        <div class="col-3" >
            <router-link to="/manager/projects"><base-button>Projects</base-button></router-link>
            <router-link to="/manager/workers"><base-button>Workers</base-button></router-link>
            <router-link to="/manager/review_tasks"><base-button>Tasks to be Reviewed</base-button></router-link>
            <router-link to="/manager/"><base-button>My Profile</base-button></router-link>
        </div>
      </base-card>
      <base-card id="card1">
        <div class="col-9" style="width:100%">
            <router-view >
            </router-view>
        </div>
    </base-card>
    </div>
  </base-card>

</template>

<script>

export default{
    data(){
        return{
            showDashboard:true
        }
    },   
    
}

</script>

<style scoped>
#cardmain{
  max-width: 78rem;
  min-height:600px;
}
#card {
  max-width: 18rem;
  height: 600px;
  
}
#card1 {
  max-width: 57rem;
}
button,
a {
  border-radius: 10px;
  margin: 0.2rem;
  width: 250px;
}

</style>