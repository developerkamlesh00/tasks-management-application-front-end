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
}
</style>
