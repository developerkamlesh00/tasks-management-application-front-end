<template>
  <main>
    <div class="admin-view">
      <h1 class="admin-dashboard">Admin Dashboard</h1>
      <div class="card-container">
        <BaseCard :expanded="true" class="expanded-card">
          <div class="left-column">
            <BaseButton class="left-button" @click="toggleOrganizations">
              {{ showOrganizations ? 'Hide Organizations' : 'Show Organizations' }}
            </BaseButton>
            <BaseButton class="left-button" @click="toggleDirectors">
              {{ showDirectors ? 'Hide Directors' : 'Show Directors' }}
            </BaseButton>
            <BaseButton class="left-button" @click="toggleManagers">
              {{ showManagers ? 'Hide Managers' : 'Show Managers' }}
            </BaseButton>
            <BaseButton class="left-button" @click="toggleWorkers">
              {{ showWorkers ? 'Hide Workers' : 'Show Workers' }}
            </BaseButton>
          </div>
          <div class="right-column">
           
            <div class="no-data" v-if="!showOrganizations && !showDirectors && !showManagers && !showWorkers">
              <p>Click Any Button.</p>
            </div>
              <!-- Show organizations if showOrganizations is true -->
              <div v-if="showOrganizations">
                <h2 class="organizations-header">Organizations</h2>
                <div class="card-list">
                  <BaseCard v-for="org in organizations" :key="org.id" class="card-item">
                    <h3>{{ org.org_name }}</h3>
                    <p><strong>E-mail:</strong> {{ org.org_email }}</p>
                    <p><strong>Total Projects:</strong> {{ org.total_projects }}</p>
                    <p><strong>Projects Completed:</strong> {{ org.projects_completed }}</p>
                  </BaseCard>
                </div>
              </div>


              <!-- Show Director if showDirectors is true -->
              <div v-if="showDirectors">
                <h2 class="users-header">Directors List</h2>
                <div class="table-container">
                  <table>
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Organization Id</th>
                      </tr>
                    </thead>

                    <tbody v-if="displayedDirectors.length > 0">
                      <!-- Loop through displayedDirectors to show Director in the table -->
                      <tr v-for="(directors,index) in displayedDirectors" :key="index">
                        <td>{{ index + 1}}</td>
                        <td>{{ directors.name }}</td>
                        <td>{{ directors.email }}</td>
                        <td>{{ directors.organization_id }}</td>
                      </tr>
                    </tbody>
                    <tbody v-else>
                      <tr>
                        <td colspan="4" class="no-data">No data available</td>
                      </tr>
                    </tbody>
                  </table>
                </div>


                <!-- Directors pagination -->
                <div class="pagination-container">
                  <button class="prev-btn" :disabled="directorPage === 1" @click="directorPage--">&lt;</button>
                  <button v-for="pageNumber in pageCount" :key="pageNumber" :class="{active: pageNumber === directorPage}" @click="directorPage = pageNumber">{{ pageNumber }}</button>
                  <button class="next-btn" :disabled="directorPage === pageCount || pageCount === 0" @click="directorPage++">&gt;</button>
                </div>
              </div>

              <!-- Show Manager if showManagers is true -->
              <div v-if="showManagers">
                <h2 class="users-header">Managers List</h2>
                <div class="table-container">
                  <table>
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Organization Id</th>
                      </tr>
                    </thead>

                    <tbody v-if="displayedManagers.length > 0">
                      <!-- Loop through displayedManagers to show manager in the table -->
                      <tr v-for="(managers,index) in displayedManagers" :key="index">
                        <td>{{ index + 1 }}</td>
                        <td>{{ managers.name }}</td>
                        <td>{{ managers.email }}</td>
                        <td>{{ managers.organization_id }}</td>
                      </tr>
                    </tbody>
                    <tbody v-else>
                      <tr>
                        <td colspan="4" class="no-data">No data available</td>
                      </tr>
                    </tbody>
                  </table>
                </div>


                <!-- Managers pagination -->
                <div class="pagination-container">
                  <button class="prev-btn" :disabled="managerPage === 1" @click="managerPage--">&lt;</button>
                  <button v-for="pageNumber in pageCount" :key="pageNumber" :class="{active: pageNumber === managerPage}" @click="managerPage = pageNumber">{{ pageNumber }}</button>
                  <button class="next-btn" :disabled="managerPage === pageCount || pageCount === 0" @click="managerPage++">&gt;</button>
                </div>
              </div>

               <!-- Show Workers if showWorkers is true -->
               <div v-if="showWorkers">
                <h2 class="users-header">Workers List</h2>
                <div class="table-container">
                  <table>
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Organization Id</th>
                      </tr>
                    </thead>

                    <tbody v-if="displayedWorkers.length > 0">
                      <!-- Loop through displayedWorkers to show Workers in the table -->
                      <tr v-for="(workers,index) in displayedWorkers" :key="index">
                        <td>{{ index + 1 }}</td>
                        <td>{{ workers.name }}</td>
                        <td>{{ workers.email }}</td>
                        <td>{{ workers.organization_id }}</td>
                      </tr>
                    </tbody>
                    <tbody v-else>
                      <tr>
                        <td colspan="4" class="no-data">No data available</td>
                      </tr>
                    </tbody>
                  </table>
                </div>


                <!-- Workers pagination -->
                <div class="pagination-container">
                <button class="prev-btn" :disabled="workerPage === 1" @click="workerPage--">&lt;</button>
                <button v-for="pageNumber in pageCount" :key="pageNumber" :class="{active: pageNumber === workerPage}" @click="workerPage = pageNumber">{{ pageNumber }}</button>
                <button class="next-btn" :disabled="workerPage === pageCount || pageCount === 0" @click="workerPage++">&gt;</button>
              </div>
              </div>
              
              <!-- Show error message if errorMessage is truthy -->
              <div v-if="errorMessage" class="error-message">
                {{ errorMessage }}
              </div>
            </div>
        </BaseCard>
      </div>
    </div>
  </main>
</template>

<script>
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseCard from '@/components/ui/BaseCard.vue';
import axios from 'axios';

export default {
  components: {
    BaseButton,
    BaseCard,
  },

  data() {
    return {
      // Boolean flags to show or hide organizations and users
      showOrganizations: false,
      showDirectors: false,
      showManagers: false,
      showWorkers: false,
      // Arrays to store fetched organizations and users data
      organizations: [],
      directors: [],
      managers: [],
      workers: [],

      // Pagination variables
      page: 1,
      perPage: 10,
      directorPage:1,
      managerPage: 1,
      workerPage:1,
      totalItems: 0,   
      // Error message variable
      errorMessage: ''
    }
  },

  methods: {
    // Toggle the display of organizations and fetch data from API
    toggleOrganizations() {
      this.showOrganizations = !this.showOrganizations;
      if (this.showOrganizations) {
        this.showDirectors = false;
        this.showManagers = false;
        this.showWorkers = false;
        this.activeTab = 'organizations';
        axios.get('http://127.0.0.1:8001/api/admin/organizations')
          .then(response => {
            this.organizations = response.data;
          })
          .catch(error => {
            console.log(error);
            this.errorMessage = 'Failed to fetch organizations. Please try again later.';
          });
          // this.$router.push('/admin/organizations');
      }
    },


    // Toggle the display of users and fetch data from API
    toggleDirectors() {
      this.showDirectors = !this.showDirectors;
      if (this.showDirectors) {
        this.showOrganizations = false;
        this.showManagers = false;
        this.showWorkers = false;
        this.activeTab = 'directors';
        // this.totalItems = this.directors.length;

        axios.get('http://127.0.0.1:8001/api/admin/directors')
          .then(response => {
            this.directors = response.data;
            this.totalItems = this.directors.length;
          })
          .catch(error => {
            console.log(error);
            this.errorMessage = 'Failed to fetch directors. Please try again later.';
          });
      }else{
        this.totalItems = this.directors.length;
      }
      // this.$router.push('/admin/directors');
      // console.log(this.totalItems);
    },

    toggleManagers() {
      this.showManagers = !this.showManagers;
      if (this.showManagers) {
        this.showOrganizations = false;
        this.showDirectors = false;
        this.showWorkers = false;
        this.activeTab = 'managers';
        // this.totalItems = this.managers.length;

        axios.get('http://127.0.0.1:8001/api/admin/managers')
          .then(response => {
            this.managers = response.data;
            this.totalItems = this.managers.length;

          })
          .catch(error => {
            console.log(error);
            this.errorMessage = 'Failed to fetch managers. Please try again later.';
          });
      }else{
        this.totalItems = this.managers.length;

      }
      // console.log(this.totalItems);
    },

    toggleWorkers() {
      this.showWorkers = !this.showWorkers;
      if (this.showWorkers) {
        this.showOrganizations = false;
        this.showDirectors = false;
        this.showManagers = false;
        this.activeTab = 'workers';
        axios.get('http://127.0.0.1:8001/api/admin/workers')
          .then(response => {
            this.workers = response.data;
            this.totalItems = this.workers.length;
            // console.log('Workers fetched:',  this.totalItems);
          })
          .catch(error => {
            console.log(error);
            this.errorMessage = 'Failed to fetch workers. Please try again later.';
          });
      }else{
        this.totalItems = this.workers.length;

      }
      // console.log(this.totalItems);
    },
  },

    computed: {
    pageCount() {
      let totalItems = 0;
      if (this.activeTab === 'directors') {
        totalItems = this.directors.length;
        // console.log(totalItems);
      } else if (this.activeTab === 'managers') {
        totalItems = this.managers.length;
        // console.log(totalItems);
      } else if (this.activeTab === 'workers') {
        totalItems = this.workers.length;
        // console.log(totalItems);
      }
      // console.log(Math.ceil(totalItems / this.perPage));
      return Math.ceil(totalItems / this.perPage);
    },
    displayedDirectors() {
      const startIndex = (this.directorPage - 1) * this.perPage;
      const endIndex = startIndex + this.perPage;
      return this.directors.slice(startIndex, endIndex);
    },
    displayedManagers() {
      const startIndex = (this.managerPage - 1) * this.perPage;
      const endIndex = startIndex + this.perPage;
      return this.managers.slice(startIndex, endIndex);
    },
    displayedWorkers() {
      const startIndex = (this.workerPage - 1) * this.perPage;
      const endIndex = startIndex + this.perPage;
      return this.workers.slice(startIndex, endIndex);
    },
  },

    watch: {
    directors: {
      handler() {
        if (this.activeTab === 'directors') {
          this.directorPage = 1;
        }
      },
      deep: true
    },
    managers: {
      handler() {
        if (this.activeTab === 'managers') {
          this.managerPage = 1;
        }
      },
      deep: true
    },
    workers: {
      handler() {
        if (this.activeTab === 'workers') {
          this.workerPage = 1;
        }
      },
      deep: true
    }
  },


};
</script>



<style scoped>

.error-message {
  color: red;
  font-weight: bold;
  margin-top: 10px;
}

.organizations-header , .users-header {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
}

.table-container {
  height: 300px;
  overflow: auto;
}

.no-data {
  color: #999;
  font-size: 18px;
}

th, td {
  padding: 10px;
}

th {
  background-color: #f2f2f2;
}

tbody tr:nth-child(even) {
  background-color: #f2f2f2;
}

.active {
  background-color: #4CAF50;
  color: white;
}

.prev-btn, .next-btn {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 5px;
  cursor: pointer;
  border-radius: 5px;
}

.prev-btn:hover, .next-btn:hover {
  background-color: #ddd;
  color: black;
}

.prev-btn:disabled, .next-btn:disabled {
  background-color: #ddd;
  color: #aaa;
  cursor: default;
}

.card-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 20px 0;
}

.card-item {
  width: calc(50% - 10px);
  margin-bottom: 20px;
  border: 1px solid #ccc;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  padding: 20px;
}

.admin-view {
  display: flex;
  flex-direction: column;
  align-items: center;
}



.admin-dashboard {
  font-size: 3rem;
  margin-top: 20px;
  /* background-color: #333; */
  /* color: #fff; */
  padding: 20px;
}


.card-container {
  margin-top: 20px;
  width: 100%;
  max-width: 800px;
  padding: 20px;
}

.expanded-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.left-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 20px;
  /* Set the width of the left column to 50% */
  width: 50%;
}

.left-button {
  margin-bottom: 10px;
  /* Set the width of the left button to 100% */
  width: 100%;
}

.right-column {
  width: 100%;
}

.right-column div {
  margin-top: 20px;
}

@media screen and (min-width: 768px) {
  .card-container {
    margin-top: 0px;
    max-width: 1200px;
  }

  .expanded-card {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: flex-start;
    padding: 40px;
  }

  .left-column {
    margin-right: 50px;
    /* Set the width of the left column to auto */
    width: auto;
  }

  .left-button {
    margin-bottom: 10px;
    /* Set the width of the left button to 100% */
    width: 100%;
  }

  .right-column {
    width: 60%;
  }

  /* Increase card size based on screen size */
  .card-container {
    max-width: 90vw;
  }

  .expanded-card {
    max-width: 1200px;
  }
}
</style>
