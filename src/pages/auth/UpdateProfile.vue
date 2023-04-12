<template>
  <div>
    <base-card id="card">
      <form @submit.prevent="updateProfile">
        <div class="form-control">
          <label for="name">Your Name</label>
          <input type="text" id="name" v-model.trim="yourname" />
        </div>
        <div class="form-control">
          <label for="email">E-Mail</label>
          <input type="email" id="email" v-model.trim="youremail" />
        </div>
        <!-- 
        <span class="form-control">
          <input type="checkbox" id="backend" checked @change="setFilter" />
        </span> -->

        <div>
          <input
            type="checkbox"
            id="checkbox"
            v-model.trim="passcheck"
          />
          <label for="checkbox">If You Want to Change Passowrd</label>
        </div>

        <div class="form-control" v-if="passcheck">
          <label for="password">Password</label>
          <input type="password" id="password" v-model.trim="yourpassword" />
        </div>
        <p v-if="!formIsValid">
          Please enter a valid information like email and password (must be at
          least 6 characters long).
        </p>
        <div v-if="error">
          <p v-for="err in error" :key="err" class="text-danger">
            {{ err }}
          </p>
        </div>
        <div id="success" v-if="successful" class="p-3 mb-2 text-white">
          {{ successful }}
        </div>
        <base-button id="updatebtn">Update Profile</base-button>
      </form>
    </base-card>
  </div>
</template>

<script>
import axios from "axios";
import router from "../../router";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      yourname: "",
      youremail: "",
      yourpassword: "",
      passcheck: false,
      formIsValid: true,
      successful: null,
      error: [],
    };
  },
  methods: {
    async updateProfile() {
      this.formIsValid = true;
      if (
        this.youremail === "" ||
        !this.youremail.includes("@") ||
        this.yourpassword.length < 6 ||
        this.yourname === ""
      ) {
        this.formIsValid = false;
        return;
      }

      const actionPayload = {
        name: this.yourname,
        email: this.youremail,
        password: this.yourpassword,
      };

      await axios
        .post("http://localhost:8000/api/updateprofile", actionPayload)
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
    },
  },
  async mounted() {
    this.yourname = this.name;
    this.youremail = this.email;
  },
  computed: {
    ...mapGetters(["name", "email"]),
  },
};
</script>

<style scoped>
#card {
  max-width: 60rem;
}
#updatebtn {
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
