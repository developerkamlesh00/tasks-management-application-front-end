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
        <h3 style="text-align: center; padding-bottom: 10px">Reset Password</h3>
        <div class="form-control">
          <label for="password">Password</label>
          <input type="password" id="password" v-model.trim="password" />
        </div>
        <div class="form-control">
          <label for="confirm">Confirm Password</label>
          <input type="password" id="confirm" v-model.trim="conpassword" />
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
      password: "",
      conpassword: "",

      viewForm: false,
      messagetitle:'',
      message:'',
      status : false,
    };
  },
  methods: {
    handleDialog(){
        this.title = ""
        this.message = ""
        this.viewForm = false
        if(this.status){
          this.$router.push('/login');
        }
    },
    async submitForm() {
        if(this.password==='' && this.conpassword === ''){
            this.viewForm = true
            this.title = "Enter Password"
            this.message = "Please Provide Password empty field can support"
        }
        else if(this.password === this.conpassword){
            const actionData = {
              password: this.password,
              token: this.$route.params.ref,
            };
            console.log(actionData);
            const response = await axios.post(
              "http://localhost:8000/api/resetpassword",
              actionData
            ).then(response =>{
                this.status = true;
                this.viewForm =true;
                this.message = response.data.message;
                this.title = "Successfull"
            }).catch(err =>{
                this.status = false;
                console.log(err);
                this.viewForm = true;
                this.message = "Your Token link is expire please regenerate";
                this.title = "Token Expire";
            });
            console.log(response);
        }
        else{
            this.status = false;
            this.viewForm = true
            this.title = "Password Doesn't Match"
            this.message = "Password Doesn't Match please check your confirm password with you enter password"
        }
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
