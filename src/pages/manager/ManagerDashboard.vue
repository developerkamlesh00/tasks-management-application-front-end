<template>
   
    <div class="super">
        <div class="parent">
            <button type="button" class="btn btn-primary" @click="displayProjects">Projects</button>
            <button type="button" class="btn btn-primary" @click="displayWorkers">Workers</button>
            <button type="button" class="btn btn-primary" @click="reviewTasks">Tasks to be Reviewed</button>
            
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
import { mapActions } from 'vuex';

export default{
    data(){
        return{
            showDashboard:true
        }
    },
    
    
    methods:{
       displayProjects(){
        this.$router.push('/manager/projects')
        this.showDashboard=false
       },

       
       displayWorkers(){
        this.$router.push('/manager/workers')
        this.showDashboard=false
       },

       reviewTasks(){
        this.$router.push('/manager/review_tasks')
        this.showDashboard=false
       }
    },

    watch: {
        ...mapActions(['getProjects', 'getWorkers', 'reviewTasks']),
    
        '$route' (to) {
     
        let too = to.fullPath
      

        if(too ==='/manager/projects'){
           
            this.$store.dispatch("getProjects")

        }
        else if(too ==='/manager/workers'){
            //console.log("users")
            this.$store.dispatch("getWorkers")
        }

        else if(too==='/manager/review_tasks'){
            this.$store.dispatch("reviewTasks")
        }
      
    }
  }
    
}

</script>

<style scoped>
.super{
    display: flex;
    height: 575px;
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