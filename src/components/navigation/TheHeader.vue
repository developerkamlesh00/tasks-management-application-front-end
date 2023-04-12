<template>
  <nav class="navbar navbar-expand">
    <div class="container-fluid">
      <div class="navbar-brand">
        <div class="navbar-item home me-2">
          <router-link to="/">
            <img src="logo.png" alt="Task Management Logo" class="logo-img">
          </router-link>
        </div>
      </div>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse ms-auto" id="navbarNav">
        <div class="d-flex flex-row-reverse">
          <div class="navbar-item me-2" v-if="isAuthenticated">
            <router-link to="#" class="nav-link">{{ name }}</router-link>
          </div>
          <div class="navbar-item me-2" v-if="isAuthenticated">
            <router-link :to="route" @click="routeChange" class="nav-link"
              >Dashboard</router-link
            >
          </div>
          <div class="navbar-item login me-2" v-if="!isAuthenticated">
            <router-link to="/login" class="nav-link">Login</router-link>
          </div>
          <div class="navbar-item logout me-2" v-else>
            <router-link to="/logout" @click="logout" class="nav-link">Logout</router-link>
          </div>
          <div class="navbar-item about me-2">
            <router-link to="/about" class="nav-link">About Us</router-link>
          </div>
          <div class="navbar-item home me-2">
            <router-link to="/" class="nav-link">Home</router-link>
          </div>
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

/* Navbar styles */
.navbar {
  background: #358a97;
  height: 70px;
  font-family: "Alkatra", cursive;
}

.navbar-brand img {
  height: 50px;
  width: 55px;
}

.navbar-toggler {
  border-color: #ffffff;
}

.navbar-toggler-icon {
  background-color: #ffffff;
}

.navbar-collapse {
  justify-content: flex-end;
}

.navbar-item {
  display: flex;
  align-items: center;
  margin-left: 10px;
  margin-right: 10px;
}

.navbar-item a {
  text-decoration: none;
  color: #ffffff;
  font-weight: bold;
  font-size: 16px;
  padding: 10px 15px;
  border-radius: 10px;
  transition: background-color 0.3s ease;
}

.navbar-item a:hover,
.navbar-item a:active,
.navbar-item a.router-link-active {
  color: #5b4b57;
  background-color: #f6f1f5;
}

.navbar-item.home a {
  font-size: 18px;
}

.navbar-item.home a:hover,
.navbar-item.home a:active,
.navbar-item.home a.router-link-active {
  color: #358a97;
  background-color: #f6f1f5;
}

.navbar-item.login a,
.navbar-item.Logout a {
  font-size: 14px;
}

.navbar-item.about a {
  font-size: 16px;
}

.navbar-item.about a:hover,
.navbar-item.about a:active,
.navbar-item.about a.router-link-active {
  color: #5b4b57;
  background-color: #f6f1f5;
}

.navbar-item.username {
  color: #ffffff;
  font-size: 16px;
  margin-right: 10px;
}

/* Image styles */
.image {
  display: flex;
  align-items: center;
}

.image img {
  height: 50px;
  width: 55px;
  border-radius: 50%;
  margin-right: 10px;
}

/* Media query for small screens */
@media (max-width: 768px) {
  .navbar-item {
    margin: 0;
  }

  .navbar-item.username {
    display: none;
  }
}
</style>
