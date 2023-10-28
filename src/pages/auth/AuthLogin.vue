<template>
  <div class="super">
    <base-card>
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="email">E-Mail</label>
          <input type="email" id="email" v-model.trim="email" />
        </div>
        <div class="form-control">
          <label for="password">Password</label>
          <input type="password" id="password" v-model.trim="password" />
        </div>
        <p v-if="!formIsValid">
          Please enter a valid email and password (must be at least 6 characters
          long).
        </p>
        <p v-if="error">
          {{ error }}
        </p>
        <p class="forgot-password text-right">
          <router-link to="forgot">Forgot Password?</router-link>
        </p>
        <base-button id="btnlogin">Login</base-button>
      </form>
    </base-card>
  </div>
</template>

<script>
// import { mapActions } from "vuex";
export default {
  data() {
    return {
      email: "",
      password: "",
      formIsValid: true,
      error: null,
    };
  },
  methods: {
    async submitForm() {
      this.formIsValid = true;
      if (
        this.email === "" ||
        !this.email.includes("@") ||
        this.password.length < 6
      ) {
        this.formIsValid = false;
        return;
      }

      const actionPayload = {
        email: this.email,
        password: this.password,
      };

      try{
        await this.$store.dispatch("login", actionPayload);
        //console.log(this.$store.getters.role);
        const redirectUrl = "/" + this.$store.getters.role;
        this.$router.replace(redirectUrl);

      }catch(error){
        this.error = "Failed to authenticate. Check your login data.";
      }

    },

    handleError() {
      this.error = null;
    },
  },
};

</script>

<style scoped>
#btnlogin{
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

.super{
  min-height: 530px;
}
</style>
