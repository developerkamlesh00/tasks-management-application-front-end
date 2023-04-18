<template>
  
  <div class="container">
    <div class="user-statistics-wrapper">
      <user-statistics></user-statistics>
    </div>
    <div class="recent-users-wrapper">
      <recent-users></recent-users>
    </div>
    <div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.user-statistics-wrapper {
  flex-basis: 55%;
  margin-right: 20px;
  padding-top: 0px;
}

.recent-users-wrapper {
  flex-basis: 40%;
}


</style>

<script>
import UserStatistics from './UserStatistics.vue';
import RecentUsers from './RecentUsers.vue';

export default {
  components: {
    UserStatistics,
    RecentUsers,
  },
};
</script>
