<template>
    <div id="container" v-if="singleWorker">
        <h1 class="header">Welcome Back {{ singleWorker.name }}!!!</h1>
        <div class="d-flex aligns-items-center justify-content-center card mx-auto linear_blue">
          <div class="row" style="padding: 3rem;">
              <div class="col-4 center">
                <img src="../../../assets/usericon.png" width="200" height="200" alt="profile">
              </div>
              <h5 class="card-title center" style="margin-top: 10px;"><p><strong>E-mail:</strong> {{ singleWorker.email }}</p></h5>
              <p class="card-text center">Registration Date: {{ singleWorker.created_at.slice(0,10) }}</p>
            </div>
        </div>      
    </div>
</template>
  
  <script>
  import { mapActions} from 'vuex';
  import { mapGetters } from 'vuex';

  
  export default {
   
    data() {
      return {

      };
    },
  
      methods:{
          ...mapActions('manager',['getWorker']),
  
      },

      computed:{
        ...mapGetters('manager',['singleWorker']),
      },

       mounted(){
        const id = localStorage.getItem("userId")
        this.$store.dispatch('manager/getWorker', {value:id}) 
      }
  
  }
  </script>
  
  
  <style scoped>
  .card{
      width: 80%;
      margin-top: 2rem;
  }
 
  .linear_blue{
  background: radial-gradient(circle, rgba(252,248,255,1) 0%, hwb(302 90% 0%) 100%);
  }

  .header {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 10px;
  color: #2c3e50; /* updated color */
  text-align: center;
}

.center{
  margin: 0 auto;
  text-align: center;
}

  </style>
  
  