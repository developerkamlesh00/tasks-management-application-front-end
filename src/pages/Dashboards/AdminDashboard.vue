 
 <template>
    <div class="container mt-5">
      <h1 class="text-center mb-4">Admin Dashboard</h1>
      <div class="d-flex justify-content-between mb-4">
        <button class="btn btn-primary" @click="toggleOrganizations">Show Organizations</button>
        <button class="btn btn-primary" @click="toggleDirectors">Show Directors</button>
      </div>
      <div v-if="showOrganizations">
        <h2>Organization List</h2>
        <table class="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Director</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="organization in organizations" :key="organization.id">
              <td>{{ organization.name }}</td>
              <td>{{ organization.director }}</td>
              <td>
                <router-link class="btn btn-sm btn-primary" :to="'/organizations/' + organization.id + '/edit'">Edit</router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="showDirectors">
        <h2>Director List</h2>
        <table class="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="director in directors" :key="director.id">
              <td>{{ director.name }}</td>
              <td>{{ director.email }}</td>
              <td>
                <router-link class="btn btn-sm btn-primary" :to="'/directors/' + director.id + '/edit'">Edit</router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  //   import axios from 'axios'
  
  export default {
    data() {
      return {
        organizations: [
          { id: 1, name: 'Organization A', director: 'Director A' },
          { id: 2, name: 'Organization B', director: 'Director B' },
          { id: 3, name: 'Organization C', director: 'Director C' },
        ],
        directors: [
          { id: 1, name: 'Director A', email: 'directorA@example.com' },
          { id: 2, name: 'Director B', email: 'directorB@example.com' },
          { id: 3, name: 'Director C', email: 'directorC@example.com' },
        ],
        showOrganizations: false,
        showDirectors: false
      }
    },
    methods: {
      toggleOrganizations() {
        if (this.showOrganizations) {
          this.showOrganizations = false;
        } else {
          this.showOrganizations = true;
          this.showDirectors = false;
        }
      },
      toggleDirectors() {
        if (this.showDirectors) {
          this.showDirectors = false;
        } else {
          this.showDirectors = true;
          this.showOrganizations = false;
        }
      }
    }
    // mounted() {
    //   axios.get('/api/organizations').then(response => {
    //     this.organizations = response.data
    //   })
    //   axios.get('/api/directors').then(response => {
    //     this.directors = response.data
    //   })
    // }
  }
  </script>
  
  <style>
  /* Add any styling for the component here */
  </style>
  
  <style scoped>
  h1, h2 {
    font-weight: bold;
  }
  
  table {
    margin-top: 20px;
  }
  
  .btn {
    margin-top: 20px;
    margin-bottom: 10px;
  }
  
  </style>