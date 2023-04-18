<template>
  <div>
    <base-dialog
    :show="viewForm"
    :title= "messagetitle"
    @close="handleDialog"
    >{{ message }}
    </base-dialog>
    <base-card>
      <form @submit.prevent="loginUser">
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
        <p v-if="error" class="text-danger">
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

      viewForm: false,
      message : '',
      messagetitle: '',
    };
  },
  methods: {
    handleDialog() {
      this.viewForm = false;
      this.message = '';
      this.messagetitle = '';
    },
    async loginUser() {
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
        if(error.response.status == 429){
          this.viewForm = true;
          this.message = 'You are trying to login more than 4 attempt in a minute. Please try after some time.';
          this.messagetitle = 'Too Many Requests';
        }
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
</style>
