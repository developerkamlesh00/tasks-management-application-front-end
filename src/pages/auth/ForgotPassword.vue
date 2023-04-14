<template>
  <div>
    <base-dialog
        :show="viewForm"
        :title= "title"
        @close="handleDialog"
    >{{ message }}
    </base-dialog>
    <base-card>
      <form @submit.prevent="submitForm">
        <h3 style="text-align: center; padding-bottom: 10px">
          Forgot Password
        </h3>
        <div class="form-control">
          <label for="email">E-Mail</label>
          <input type="email" id="email" v-model.trim="email" />
        </div>
        <p v-if="error">
          {{ error }}
        </p>
        <base-button class="btn btn-primary btn-block" id="forgot"
          >Submit</base-button
        >
      </form>
    </base-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      error: null,

      viewForm: false,
      messagetitle:'',
      message:'',
    };
  },
  methods: {
    handleDialog(){
        this.title = ""
        this.message = ""
        this.viewForm = false
    },
    async submitForm() {
      if(!this.email){
        this.viewForm = true;
        this.title = "Enter Email"
        this.message = "Please provide email address";
        return;
      }
      const actionData = { email: this.email };
      const response = await axios.post(
        "http://localhost:8000/api/forgot",
        actionData
      ).then(response =>{
            console.log(response);
            this.title = "reset link send"
            this.message = response.data.message + ", check your Email Inbox";
            this.viewForm = true;
            //this.$router.push('/login');
      }).catch(err =>{
            console.log(err);
            this.viewForm = true;
            this.title = "User Not Found"
            this.message = "User not found please check user email address"
      });
      console.log(response);
    },
  },
};
</script>

<style scoped>
#btnlogin {
  border-radius: 30px;
}
form {
  margin: 1rem;
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
</style>
