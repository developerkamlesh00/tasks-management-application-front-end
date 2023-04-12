<template>
  <base-card id="card">
    <div class="row">
      <div class="col-3">
        <base-button link :to="{ name: 'managerworker', params: { add: 'addmanager' }}">Create Manager & Worker</base-button>
        <base-button link :to="{ name: 'project', params: { add: 'addproject' }}">Create Project</base-button>
        <base-button link :to="{ name: 'viewproject', params: { add: 'viewproject' }}">View Projects</base-button>
        <base-button link :to="{ name: 'viewmanagers', params: { add: 'viewmanagers' }}">View Managers</base-button>
        <base-button link :to="{ name: 'viewworkers', params: { add: 'viewworkers' }}">View Workers</base-button>
        <base-button link :to="{ name: 'viewsummary', params: { add: 'viewsummary' }}">View Summary</base-button>
        <base-button link :to="{ name: 'temp', params: { add: 'temp' }}">Creat User temp</base-button>
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
