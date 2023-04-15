<template>
   
    <div class="super">
        <div class="parent">
            <router-link to="/manager/projects"><button type="button" class="btn btn-primary">Projects</button></router-link>
            <router-link to="/manager/workers"><button type="button" class="btn btn-primary">Workers</button></router-link>
            <router-link to="/manager/review_tasks"><button type="button" class="btn btn-primary">Tasks to be Reviewed</button></router-link>
            
        </div>
        <div class="child">
            <router-view></router-view>
            <!--<div v-if="showDashboard">
            <div class="card text-center">
                <div class="card-header">
                    <h2>Welcome Back!!!</h2>
                </div>
            <div class="card-body card-body-length">

                
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeTbM5NZ1yHH1wx5fQcjA4f_Dwa6cxTn9JonthRTzO&s" style="height: 250px; width: 300px;">
                <h2 class="card-title">Check how the management is going</h2>
                <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
            </div>
            <div class="card-footer text-body-secondary">
                2 days ago
            </div>
        </div>
    </div>
          -->
    </div>
</div>

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
.super{
    display: flex;
    height: fit-content;
    
}

.parent{
flex: 1;
display: flex;
flex-direction: column;
align-items: center;
padding-top: 30px;
}


.child{
    flex:4;
    padding-top: 30px;
    padding-right: 30px;
    
    
}

button{
  width: fit-content;
  background-color: #40d476;
  color: #fff;
  padding: 15px;
  border-radius: 10px;
  border: none;
  min-width: 250px;
  margin-top: 10px;
  font-weight: bold;
}

.card-body-length{
    height:450px
}
</style>