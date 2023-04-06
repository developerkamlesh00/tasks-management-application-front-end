<template>
  <form @submit.prevent="submitForm">
    <div class="form-control">
      <label for="role">Role</label>
      <select
        v-model="role"
        id="role"
        class="form-select"
        aria-label="Default select example"
      >
        <option selected value="3">Manager</option>
        <option value="4">Worker</option>
      </select>
    </div>
    <div class="form-control">
      <label for="name">Name</label>
      <input type="text" id="name" v-model.trim="name" />
    </div>
    <div class="form-control">
      <label for="email">E-Mail</label>
      <input type="email" id="email" v-model.trim="email" />
    </div>
    <div class="form-control">
      <label for="password">Password</label>
      <input type="password" id="password" v-model.trim="password" />
    </div>

    <p v-if="!formIsValid">
      Please enter a valid information for registration like email and password
      (must be at least 6 characters long).
    </p>
    <p v-if="error" class="text-danger">
      {{ error }}
    </p>

    <div id="success" v-if="successful" class="p-3 mb-2 text-white">{{ successful }}</div>
    <!-- <p v-if="successful" class="text-success">
      
    </p> -->
    <base-button id="btnregister">Register User</base-button>
  </form>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      role: null,
      formIsValid: true,
      error: null,
      successful:null,
    };
  },
  methods: {
    
    async submitForm() {
      this.successful = null;
      this.formIsValid = true;
      if (
        this.name === "" ||
        this.email === "" ||
        !this.email.includes("@") ||
        this.password.length < 6
      ) {
        this.formIsValid = false;
        return;
      }

      //console.log(this.$store.getters.organization);
      const actionPayload = {
        name: this.name,
        email: this.email,
        password: this.password,
        organization_id: this.$store.getters.organization,
        role_id: this.role,
      };


      try {
        let result = await axios
          .post("http://localhost:8000/api/director/register", actionPayload)
          .then(function (response) {
            if (response.status === 203) {
              const error = new Error("User Not Created");
              throw error;
            }
            console.log(response);

            return "Successfully Created";
          
          }).catch(err =>{
            this.error = err.response.data.email[0];
          });
        if(result){
          this.successful = result;
          this.name= "";
          this.email= "";
          this.password= "";
          this.role= null;
          this.formIsValid= true;
          this.error= null;
        }
      } catch (error) {
        this.error = "Something Wrong....";
      }
    },

    handleError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
#card {
  max-width: 60rem;
}
#success{
  background-color : #138922
}
#btnregister {
  border-radius: 30px;
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
</style>
