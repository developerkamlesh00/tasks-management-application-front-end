<template>
  <div class="container">
    <h2 class="header">Organizations</h2>
    <div class="card-list">
      <BaseCard v-for="org in organizations" :key="org.id" class="card-item">
        <h3>{{ org.org_name }}</h3>
        <p><strong>E-mail:</strong> {{ org.org_email }}</p>
        <p><strong>Total Projects:</strong> {{ org.total_projects }}</p>
        <p><strong>Projects Completed:</strong> {{ org.projects_completed }}</p>
      </BaseCard>
    </div>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script>
import BaseCard from '../ui/BaseCard.vue';
import axios from 'axios';

export default {
  components: {
    BaseCard
  },

  data() {
    return {
      organizations: [],
      errorMessage: ''
    }
  },
  mounted() {
    this.toggleOrganizations();
  },

  methods: {
    toggleOrganizations() {
      axios.get('http://127.0.0.1:8000/api/admin/organizations')
        .then(response => {
          this.organizations = response.data;
        })
        .catch(error => {
          console.log(error);
          this.errorMessage = 'Failed to fetch organizations. Please try again later.';
        });
    }
  },
};
</script>

<style scoped>
.container {
  margin-left: 20px;
}

.header {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
  text-align: center;
}

.card-list {
  display: flex;
  flex-wrap: wrap;
}

.card-item {
  flex: 1 0 21rem;
  margin: 1rem;
}

.error-message {
  color: red;
  margin-top: 10px;
}
</style>
