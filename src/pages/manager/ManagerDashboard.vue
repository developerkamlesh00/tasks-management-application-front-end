<template>
   
    <div class="super">
        <div class="parent">
           <button @click="displayProjects">Projects</button>
           <button @click="displayWorkers">Workers</button>
            
        </div>
        <div class="child">
            <router-view></router-view>

          
        </div>
    </div>

</template>

<script>
import { mapActions } from 'vuex';

export default{

    
    
    methods:{
       displayProjects(){
        this.$router.push('/manager/projects')
       },

       
       displayWorkers(){
        this.$router.push('/manager/workers')
       }
    },

    watch: {
        ...mapActions(['getProjects', 'getWorkers']),
    
        '$route' (to) {
     
        let too = to.fullPath
      

        if(too ==='/manager/projects'){
           
            this.$store.dispatch("getProjects")

        }
        else if(too ==='/manager/workers'){
            //console.log("users")
            this.$store.dispatch("getWorkers")
        }
      
    }
  }
    
}

</script>

<style scoped>
.super{

    border: 2px solid red;
    min-height: 576px;
    display: flex;
}

.parent{
border: 2px solid goldenrod;
flex: 1;
display: flex;
flex-direction: column;
align-items: center;
}


.child{
    border: 2px solid goldenrod;
    flex:4;
}

button{
  width: fit-content;
  background-color: #40d476;
  color: #fff;
  padding: 15px;
  border-radius: 10px;
  border: none;
  width: 300px;
  margin-top: 10px;
  font-weight: bold;
}
</style>