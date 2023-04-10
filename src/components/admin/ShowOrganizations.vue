<template>
  <div class="container">
    <h2 class="header">Organizations</h2>
    <div class="search-container">
      <input type="text" placeholder="Search organization by name or email" v-model="searchTerm" @input="searchOrganization">
      <button @click="resetSearch">Reset</button>
    </div>
    <div class="card-list">
      <BaseCard v-for="org in filteredOrganizations" :key="org.id" class="card-item">
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
      axios.get('http://127.0.0.1:8001/api/admin/organizations')
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


.search-container {
    margin-bottom: 10px;
    padding: 10px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.search-container input[type="text"] {
    width: 60%;
    padding: 8px;
    margin-right: 10px;
    margin-bottom: 0;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}

.search-container select,
.search-container button {
    margin-bottom: 0;
    margin-left: 10px;
    padding: 8px;
    background-color: #4CAF50;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.search-container select:hover,
.search-container button:hover {
    background-color: #3e8e41;
}
</style>

<!-- <template>
  <div class="container">
      <h2 class="header">Workers List</h2>
      <div class="search-container">
          <input type="text" placeholder="Search worker by name" v-model="searchTerm" @input="searchWorker">
          <select v-model="selectedOrgId">
              <option value="">Filter by organization ID</option>
              <option v-for="orgId in orgIds" :key="orgId" :value="orgId">{{ orgId }}</option>
          </select>
          <button @click="filterWorkers">Filter</button>
          <button @click="resetSearch">Reset</button>
      </div>
      <div class="table-container">
          <table class="workers-table">
              <thead>
                  <tr>
                      <th>Id</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Organization Id</th>
                      <th>Delete</th>
                  </tr>
              </thead>

              <tbody>
                  Loop through filteredWorkers to show Worker in the table
                  <tr v-for="(worker,index) in filteredWorkers" :key="worker.id">
                      <td>{{ index + 1 }}</td>
                      <td>{{ worker.name }}</td>
                      <td>{{ worker.email }}</td>
                      <td>{{ worker.organization_id }}</td>
                      <td class="delete-cell">
                          <button @click="deleteWorker(worker.id)">Delete</button>
                      </td>
                  </tr>
                  <tr v-if="filteredWorkers.length === 0">
                      <td colspan="5" style="text-align: center;">No Worker present.</td>
                  </tr>
              </tbody>
          </table>

      </div>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template> -->


<!-- <script>
import axios from 'axios';

export default {
  data() {
    return {
        workers: [],
      errorMessage: '',
      searchTerm: '',
      selectedOrgId: '',
    };
  },
  mounted() {
    this.toggleWorkers();
  },
  computed: {
    orgIds() {
      return [...new Set(this.workers.map((worker) => worker.organization_id))];
    },
    filteredWorkers() {
      let filteredWorkers = this.workers;
      if (this.searchTerm.trim()) {
        const searchTerm = this.searchTerm.toLowerCase();
        filteredWorkers = filteredWorkers.filter((worker) =>
        worker.name.toLowerCase().includes(searchTerm)
        );
      }
      if (this.selectedOrgId !== '') {
        filteredWorkers = filteredWorkers.filter(
          (worker) => worker.organization_id === this.selectedOrgId
        );
      }
      return filteredWorkers;
    },
  },
  methods: {
    toggleWorkers() {
      axios
        .get('http://127.0.0.1:8001/api/admin/workers')
        .then((response) => {
          this.workers = response.data;
        })
        .catch((error) => {
          console.log(error);
          this.errorMessage =
            'Failed to fetch workers. Please try again later.';
        });
    },
    deleteWorker(workerId) {
      console.log(workerId);
      Call the delete API endpoint here
      if (confirm('Are you sure you want to delete this worker?')) {
        axios
          .post(`http://127.0.0.1:8001/api/admin/users/${workerId}`)
          .then((response) => {
            const index = this.workers.findIndex(
              (worker) => worker.id === workerId
            );
            if (index > -1) {
              this.workers.splice(index, 1);
            }
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
            this.errorMessage =
              'Failed to delete worker. Please try again later.';
          });
      }
    },
    resetSearch() {
      this.searchTerm = '';
      this.selectedOrgId = '';
      this.toggleWorkers();
    },
  },
};
</script> -->
