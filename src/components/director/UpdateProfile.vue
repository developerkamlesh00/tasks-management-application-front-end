<template>
  <base-dialog 
        :show="viewForm"
        title="Edit Profile Details"
        @close="handleProject"
  >
    <form @submit.prevent="updateUser">
      <div class="form-control">
        <label for="name">Name</label>
        <input type="text" id="name" v-model.trim="name" />
      </div>
      <div class="form-control">
        <label for="email">E-Mail</label>
        <input type="email" id="email" v-model.trim="email" />
      </div>

      <p v-if="!formIsValid">
        Please enter a valid information for update like name and email.
      </p>
      <p v-for="err in error" :key="err" class="text-danger">
        {{ err }}
      </p>
      <base-button id="btnregister">Update Profile</base-button>
    </form>
  </base-dialog>
  <div id="container">
    <div class="d-flex aligns-items-center justify-content-center card mx-auto linear_blue" v-if="getUser">
        <div class="row" style="padding: 3rem;">
            <div class="col-4">
              <img src="../../assets/usericon.png" width="200" height="200" alt="profile">
            </div>
            <div class="col-8 ps-4" style="padding-top: 1rem;">
              <h3>Your Name : {{ getUser.name }}</h3>
              <h5 class="card-title"><p><strong>E-mail :</strong> {{ getUser.email }}</p></h5>
              <p class="card-text">Registration Date : {{ getUser.created_at.slice(0,10) }}</p>
              <button class="btn buttoncolor" @click="openProfile(getUser)">Update Profile Details</button>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import BaseButton from '../ui/BaseButton.vue';
import axios from 'axios';

export default {
  components: { BaseButton },
  data() {
    return {
      viewForm : false,
      formIsValid: true,

      id : '',
      name: '',
      email :'',
      error:[],
    };
  },

    methods:{
        ...mapActions('director',['fetchUserDetails']),

        async fetchUser() {
            await this.fetchUserDetails();
        },
        openProfile(user){
          this.error = []
            this.viewForm = true;
            this.id = user.id;
            this.name = user.name;
            this.email = user.email;
        },
        handleProject(){
            this.viewForm = false;
            this.name = '';
            this.email = '';
            this.id = '';
        },
        updateUser(){
            this.error = []
            const actionData ={
                id: this.id,
                name : this.name,
                email : this.email,
            }
            // console.log(actionData);
            axios.post(`http://localhost:8000/api/director/updateuser/${this.id}`, actionData )
            .then(response =>{
                this.fetchUser();
                this.viewForm = false;
                this.name = '',
                this.email = '',
                this.id = '',
                console.log(response);
            }).catch(err =>{
                this.error.push(err.response.data.message);
                console.log(err);

            })
        },
    },
    computed:{
        ...mapGetters('director',['getUser']),
        getUserDetails(){
            const user = this.getUser;
            console.log(user);
            return user;
        }
    },
    async mounted(){
        await this.fetchUser();
    }

}
</script>


<style scoped>
.buttoncolor{
  color: white;
  background-color: #9e5fcb;
}
#btnregister{
  border-radius: 30px;
}
.card{
    width: 80%;
    margin-top: 2rem;
}
form {
  margin: 1rem;
  margin-top: -1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.error-message {
  color: red;
  font-size: 16px;
  margin-top: 20px;
}

.linear_blue{
background: radial-gradient(circle, rgba(252,248,255,1) 0%, hwb(302 90% 0%) 100%);
}
</style>

