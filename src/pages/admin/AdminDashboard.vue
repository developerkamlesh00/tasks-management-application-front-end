<template>
  <div class="admin-view">
    <h1 class="admin-dashboard">Admin Dashboard</h1>
    <base-card id="card">
      <div class="row">
        <div class="col-3">
          <base-button link="" :to="'/admin'">Admin Dashboard</base-button>
          <base-button link="" :to="'/admin/organizations'">Show Organizations</base-button>
          <base-button link="" :to="'/admin/directors'">Show Directors</base-button>
          <base-button link="" :to="'/admin/managers'">Show Managers</base-button>
          <base-button link="" :to="'/admin/workers'">Show Workers</base-button>
        </div>
        <div class="col-9">
          <router-view v-slot="{ Component }">
            <component :is="Component" />
          </router-view>
        </div>
      </div>
    </base-card>
  </div>
</template>

<style scoped>
#card {
  max-width: 85rem;
}

button,
a {
  border-radius: 10px;
  margin: 0.2rem;
  width: 250px;
}

.admin-view {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.admin-dashboard {
  font-size: 3rem;
  margin-top: 20px;
  padding: 20px;
  color: #fff;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

.base-card {
  background-color: #fff;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
}

.row {
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
}

.col-3 {
  flex: 0 0 25%;
  max-width: 25%;
  padding-right: 15px;
  padding-left: 15px;
}

.col-9 {
  flex: 0 0 75%;
  max-width: 75%;
  padding-right: 15px;
  padding-left: 15px;
}

.base-button {
  background-color: #fff;
  border: 2px solid #f06d6d;
  color: #f06d6d;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 15px 30px;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  transition: all 0.3s ease;
  width: 100%;
}

.base-button:hover {
  background-color: #f06d6d;
  color: #fff;
}

@media (max-width: 767px) {
  .col-3 {
    flex: 0 0 100%;
    max-width: 100%;
    margin-bottom: 20px;
  }

  .col-9 {
    flex: 0 0 100%;
    max-width: 100%;
  }
}
</style>
