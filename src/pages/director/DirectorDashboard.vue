<template>
  <base-card id="cardmain">
    <div class="row">
      <base-card id="card" class="card1">
        <div class="col-3" >
          <base-button link :to="{ name: 'vieworganization', params: { add: 'vieworganization' }}">View Organization Details</base-button>
          <base-button link :to="{ name: 'managerworker', params: { add: 'addmanager' }}">Create Manager & Worker</base-button>
          <base-button link :to="{ name: 'project', params: { add: 'addproject' }}">Create Project</base-button>
          <base-button link :to="{ name: 'viewproject', params: { add: 'viewproject' }}">View Projects</base-button>
          <base-button link :to="{ name: 'viewmanagers', params: { add: 'viewmanagers' }}">View Managers</base-button>
          <base-button link :to="{ name: 'viewworkers', params: { add: 'viewworkers' }}">View Workers</base-button>
          <base-button link :to="{ name: 'viewsummary', params: { add: 'viewsummary' }}">View Summary</base-button>
          <base-button link :to="{ name: 'updateprofile', params: { add: 'updateprofile' }}">Update Profile</base-button>
        </div>
      </base-card>
      <base-card id="card1">
        <div class="col-9" style="width:100%">
            <router-view v-slot="{ Component }">
              <component :is="Component" />
            </router-view>
        </div>
      </base-card>
    </div>
  </base-card>
</template>

<style scoped>
#cardmain{
  max-width: 78rem;
}
#card {
  max-width: 18rem;
}
#card1 {
  max-width: 57rem;
}
button,
a {
  border-radius: 10px;
  margin: 0.2rem;
  width: 250px;
}
</style>
