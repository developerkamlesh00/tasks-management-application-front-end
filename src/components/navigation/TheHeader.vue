<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container-fluid">
      <div class="navbar-brand image">
        <div class="navbar-item home me-2">
          <router-link to="/">Task Management</router-link>
        </div>
        <!-- <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Simbolo_konoha.svg/1200px-Simbolo_konoha.svg.png"
        /> -->
      </div>
      <div class="d-flex flex-row-reverse">
    
        <div class="navbar-item me-2" v-if="isAuthenticated">
          <router-link to="#">{{ name }}</router-link>
        </div>
        <div class="navbar-item me-2" v-if="isAuthenticated">
          <router-link :to="route" @click="routeChange">Dashboard</router-link>
        </div>
        <div class="navbar-item login me-2" v-if="!isAuthenticated">
          <router-link to="/login">Login</router-link>
        </div>
        <div class="navbar-item Logout me-2" v-else>
          <router-link to="/logout" @click="logout">Logout</router-link>
        </div>
        <div class="navbar-item about me-2">
          <router-link to="/about">About US</router-link>
        </div>
        <div class="navbar-item home me-2">
          <router-link to="/">Home</router-link>
        </div>

      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
import store from "../../store/index";

export default {
  data(){
    return{
      route : ""
    }
  },
  methods: {
    logout() {
      store.dispatch("logout");
    },
    routeChange(){
      this.route = "/" +this.role;
    }
  },
  computed: {
    ...mapGetters(["isAuthenticated","name","role"]),
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Alkatra:wght@500&family=Happy+Monkey&display=swap");
.navbar {
  /* justify-content: space-around; */
  background: linear-gradient(to bottom, #358a97, #117e9f);
  height: 70px;
  font-family: "Alkatra", cursive;
}

a {
  text-decoration: none;
  color: whitesmoke;
  font-weight: bolder;
  font-size: larger;
  padding: 10px 15px;
}

a:hover,
a:active,
a.router-link-active {
  color: #5b4b57;
  background-color: #f6f1f5;
  border-radius: 10px;
}
img {
  height: 50px;
  width: 55px;
  /* margin-left: 40px; */
}
</style>
