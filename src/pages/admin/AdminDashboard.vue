<template>
  <main>
    <div class="admin-view">
      <h1 class="admin-dashboard">Admin Dashboard</h1>
      <div class="card-container">
        <BaseCard :expanded="true" class="expanded-card">
          <div class="left-column">
            <BaseButton class="left-button" @click="toggleOrganizations">Show Organizations</BaseButton>
            <BaseButton class="left-button" @click="toggleUsers">Show Users</BaseButton>
          </div>
          <div class="right-column">

        
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


              <!-- Show users if showUsers is true -->
              <div v-if="showUsers">
                <h2 class="users-header">Users</h2>
                <div class="table-container">
                  <table>
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role Id</th>
                        <th>Organization Id</th>
                      </tr>
                    </thead>
                    <tbody>


                      <!-- Loop through displayedUsers to show users in the table -->
                      <tr v-for="(user) in displayedUsers" :key="user.id">
                        <td>{{ user.id }}</td>
                        <td>{{ user.name }}</td>
                        <td>{{ user.email }}</td>
                        <td>{{ user.role_id }}</td>
                        <td>{{ user.organization_id }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>


                <!-- Show pagination buttons -->
                <div class="pagination-container">
                  <button class="prev-btn" :disabled="page === 1" @click="page--">&lt;</button>
                  <button v-for="pageNumber in pages" :key="pageNumber" :class="{active: pageNumber === page}" @click="page = pageNumber">{{ pageNumber }}</button>
                  <button class="next-btn" :disabled="page === pageCount" @click="page++">&gt;</button>
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
      showUsers: false,
      // Arrays to store fetched organizations and users data
      organizations: [],
      users: [],
      // Pagination variables
      page: 1,
      perPage: 10,
      // Error message variable
      errorMessage: ''
    }
  },


  methods: {
    // Toggle the display of organizations and fetch data from API
    toggleOrganizations() {
      this.showOrganizations = !this.showOrganizations;
      if (this.showOrganizations) {
        this.showUsers = false;

        axios.get('http://127.0.0.1:8001/api/admin/organizations')
          .then(response => {
            this.organizations = response.data;
          })
          .catch(error => {
            console.log(error);
            this.errorMessage = 'Failed to fetch organizations. Please try again later.';
          });
      }
    },


    // Toggle the display of users and fetch data from API
    toggleUsers() {
      this.showUsers = !this.showUsers;
      if (this.showUsers) {
        this.showOrganizations = false;

        axios.get('http://127.0.0.1:8001/api/admin/users')
          .then(response => {
            this.users = response.data;
          })
          .catch(error => {
            console.log(error);
            this.errorMessage = 'Failed to fetch users. Please try again later.';
          });
      }
    },
  },


  computed: {
    // Calculate the number of pages needed for pagination
    pageCount() {
      return Math.ceil(this.users.length / this.perPage)
    },
    // Generate an array of page numbers for pagination
    pages() {
      let pages = []
      for (let i = 1; i <= this.pageCount; i++) {
        pages.push(i)
      }
      return pages
    },

    
    // Slice the users array based on the current page and perPage value for pagination
    displayedUsers() {
      const start = (this.page - 1) * this.perPage
      const end = start + this.perPage
      return this.users.slice(start, end)
    }
  }
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
