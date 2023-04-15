<template>
  <div>
    <base-card id="card">
    <h2 class="header">Organization Registration Form</h2><br>
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="org_name">Organization Name</label>
          <input type="text" id="org_name" v-model.trim="org_name" />
        </div>
        <div class="form-control">
          <label for="org_email">Organization E-Mail</label>
          <input type="email" id="org_email" v-model.trim="org_email" />
        </div>
        <div class="form-control">
          <label for="name">Your Name</label>
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
          Please enter a valid information for registration like email and
          password (must be at least 6 characters long).
        </p>
        <div v-if="error">
          <p v-for="err in error" :key="err" class="text-danger">
            {{ err }}
          </p>
        </div>
        <div id="success" v-if="successful" class="p-3 mb-2 text-white">
          {{ successful }}
        </div>
        <base-button id="btnregister">Register Organization</base-button>
      </form>
    </base-card>
  </div>
</template>

<script>
import axios from "axios";
import router from "../../router";

export default {
  data() {
    return {
      org_email: "",
      org_name: "",
      name: "",
      email: "",
      password: "",
      formIsValid: true,
      successful: null,
      error: [],
    };
  },
  methods: {
    async submitForm() {
      this.formIsValid = true;
      if (
        this.email === "" ||
        !this.email.includes("@") ||
        this.password.length < 6 ||
        this.name === "" ||
        this.org_email === "" ||
        this.org_name === ""
      ) {
        this.formIsValid = false;
        return;
      }

      const actionPayload = {
        org_name: this.org_name,
        org_email: this.org_email,
        name: this.name,
        email: this.email,
        password: this.password,
      };

      await axios
        .post("http://localhost:8000/api/orgregister", actionPayload)
        .then(function (response) {
          console.log(response.status);
          router.replace("/login");
        })
        .catch((err) => {
          console.log(err);
          for (let er in err.response.data) {
            this.error.push(err.response.data[er][0]);
          }
        });
      // if (result.token) {
      //   this.successful = "Organization Successfully Register";
      //   this.org_name = "";
      //   this.org_email = "";
      //   this.name = "";
      //   this.email = null;
      //   (this.password = null), (this.formIsValid = true);
      //   this.error = null;
      // }
    },

    handleError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
.header {
    font-size: 2rem;
    font-weight: bold;
    margin-top: 10px;
    margin-bottom: -10px;
    color: #333;
    text-align: center;
}
#card {
  max-width: 60rem;
}
#btnregister {
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
