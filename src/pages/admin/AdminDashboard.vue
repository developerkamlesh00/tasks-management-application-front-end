<template>
  <div class="admin-view">
    <h1 class="admin-dashboard">Admin Dashboard</h1>
    <base-card id="card">
      <div class="row">
        <div class="col-3">
          <base-button link :to="{ name: 'admin' }">Admin Dashboard</base-button>
          <base-button link :to="{ name: 'showOrganizations' }">Show Organizations</base-button>
          <base-button link :to="{ name: 'showDirectors' }">Show Directors</base-button>
          <base-button link :to="{ name: 'showManagers' }">Show Managers</base-button>
          <base-button link :to="{ name: 'showWorkers' }">Show Workers</base-button>
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
  max-width: 70rem;
  padding: 2rem;
  margin: 2rem auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

button,
a {
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;
  width: 100%;
  font-size: 1.2rem;
  padding: 1rem 2rem;
  background-color: #fff;
  color: #555;
  border: 2px solid #555;
  transition: all 0.2s ease-in-out;
}

button:hover,
a:hover {
  background-color: #555;
  color: #fff;
  border: 2px solid #555;
  cursor: pointer;
}

.admin-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f9f9f9;
  min-height: 100vh;
}

.admin-dashboard {
  font-size: 3rem;
  margin-top: 2rem;
  padding: 2rem;
  text-align: center;
  color: #555;
  text-shadow: 2px 2px #fff;
  font-family: Arial, sans-serif;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  line-height: 1.2;
}

</style>
