<template>
  <base-card id="card">
    <div class="row">
      <div class="col-3">
        <base-button link :to="{ name: 'managerworker', params: { add: 'addmanager' }}">Create Manager & Worker</base-button>
        <base-button link :to="{ name: 'project', params: { add: 'addproject' }}">Create Project</base-button>
      </div>
      <div class="col-9">
        <router-view v-slot="{ Component }">
          <component :is="Component" />
        </router-view>
      </div>
    </div>
  </base-card>
</template>

<style scoped>
#card {
  max-width: 70rem;
}
button,
a {
  border-radius: 10px;
  margin: 0.2rem;
  width: 250px;
}
</style>
