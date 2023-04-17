<template>
  <div class="container">
    <h2 class="header">Organizations</h2>
    <div class="search-container">
      <input type="text" placeholder="Search organization by name or email" v-model="searchTerm" @input="searchOrganization">
      <button class="reset-button" @click="resetSearch">Reset</button>
    </div>
    <div class="card-list">
      <BaseCard v-for="org in filteredOrganizations" :key="org.id" class="card-item">
        <h3>{{ org.org_name }}</h3>
        <p><strong>E-mail:</strong> {{ org.org_email }}</p>
        <div class="bar-container">
          <div class="completed-bar" :style="{ width: org.projects_completed/org.total_projects*100 + '%' }"></div>
          <div class="remaining-bar" :style="{ width: (org.total_projects-org.projects_completed)/org.total_projects*100 + '%' }"></div>
        </div>
        <p class="project-status"><strong>Projects Completed:</strong> {{ org.projects_completed }} / {{ org.total_projects }}</p>
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
      searchTerm: '',
      organizations: [],
      errorMessage: ''
    }
  },
  
  mounted() {
    this.toggleOrganizations();
  },
  
  computed: {
    filteredOrganizations() {
      if (this.searchTerm) {
        return this.organizations.filter(org => {
          const name = org.org_name.toLowerCase();
          const email = org.org_email.toLowerCase();
          const term = this.searchTerm.toLowerCase();
          return name.includes(term) || email.includes(term);
        });
      } else {
        return this.organizations;
      }
    }
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
    },

    searchOrganization() {
      // Trigger filteredOrganizations to update
    },

    resetSearch() {
      this.searchTerm = '';
      this.toggleOrganizations();
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  font-size: 2rem;
    font-weight: bold;
    margin-bottom: 10px;
    color: #333;
    text-align: center;
  animation: color-change 5s infinite;
}

@keyframes color-change {
  0% {
    color: #4CAF50;
  }
  50% {
    color: #f44336;
  }
  100% {
    color: #4CAF50;
  }
}


.reset-button {
  padding: 10px 20px;
  background-color: #dd0c99;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
}

.reset-button:hover {
  background-color: #e74c3c;
  cursor: pointer;
}
.search-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

input[type="text"] {
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border: 2px solid #ccc;
  border-radius: 5px;
}

button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
}

.card-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.card-item {
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.card-item:hover {
  transform: translateY(-10px);
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.3);
}

h3 {
  font-size: 24px;
  margin-bottom: 10px;
}

.bar-container {
  height: 20px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 10px;
}

.completed-bar {
  height: 100%;
  background-color: rgb(235, 106, 209);
}

.remaining-bar {
  height: 100%;
  background-color: #f44336;
}

.completed-bar, .remaining-bar {
  height: 100%;
  transition: width 0.3s ease-in-out;
}

.project-status {
  margin-top: 10px;
  font-size: 16px;
}

.error-message {
  color: red;
  font-size: 16px;
  margin-top: 20px;
}
</style>


