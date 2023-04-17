<template>
  <div class="container">
      <h2 class="header">Director List</h2>
      <div class="search-container">
          <input type="text" placeholder="Search director by name" v-model="searchTerm" @input="searchDirector"
              @click="searchDirectors" />
          <select v-model="selectedOrgId">
              <option value="">Filter by organization ID</option>
              <option v-for="orgId in orgIds" :key="orgId" :value="orgId">
                  {{ orgId }}
              </option>
          </select>
          <button class="reset-button" @click="resetSearch">Reset</button>
      </div>
      <div class="table-container">
          <table class="directors-table">
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
                  <!-- Loop through the pageddirectors to show directors in the table -->
                  <tr v-for="(director, index) in pagedDirectors" :key="director.id">
                      <td>{{ index + 1 }}</td>
                      <td>{{ director.name }}</td>
                      <td>{{ director.email }}</td>
                      <td>{{ director.organization_id }}</td>
                      <td class="delete-cell">
                          <button @click="deleteDirector(director.id)">Delete</button>
                      </td>
                  </tr>
                  <tr v-if="pagedDirectors.length === 0">
                      <td colspan="5" style="text-align: center;">
                          No director present.
                      </td>
                  </tr>
              </tbody>
          </table>
          <div class="pagination-container">
              <button v-if="currentPage > 1" @click="currentPage--" class="previous-page-btn">
                  Previous Page
              </button>
              <button v-for="pageNumber in totalPageCount" :key="pageNumber" @click="currentPage = pageNumber"
                  :class="{ active: currentPage === pageNumber }">
                  {{ pageNumber }}
              </button>
              <button v-if="currentPage < totalPageCount" @click="currentPage++" class="next-page-btn">
                  Next Page
              </button>
          </div>
      </div>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  data() {
      return {
          directors: [],
          errorMessage: '',
          searchTerm: '',
          selectedOrgId: '',
          currentPage: 1,
          directorsPerPage: 10
      };
  },
  mounted() {
      this.toggleDirectors();
  },
  computed: {
      orgIds() {
          return [...new Set(this.directors.map((director) => director.organization_id))];
      },
      filteredDirectors() {
          this.resetPage();
          let filteredDirectors = this.directors;
          if (this.searchTerm.trim()) {
              const searchTerm = this.searchTerm.toLowerCase();
              filteredDirectors = filteredDirectors.filter((director) =>
                  director.name.toLowerCase().includes(searchTerm)
              );
          }
          if (this.selectedOrgId !== '') {
              filteredDirectors = filteredDirectors.filter(
                  (director) =>director.organization_id === this.selectedOrgId
              );
          }
          return filteredDirectors;
      },
      totalPageCount() {
          return Math.ceil(this.filteredDirectors.length / this.directorsPerPage);
      },
      pagedDirectors() {
          const start = (this.currentPage - 1) * this.directorsPerPage;
          const end = start + this.directorsPerPage;
          return this.filteredDirectors.slice(start, end);
      },

  },
  methods: {
      toggleDirectors() {

          axios
              .get('http://127.0.0.1:8000/api/admin/directors')
              .then((response) => {

                  this.directors = response.data;
              })
              .catch((error) => {
                  console.log(error);
                  this.errorMessage =
                      'Failed to fetch directors. Please try again later.';
              });
      },
      deleteDirector(directorId) {
          console.log(directorId);
          // Call the delete API endpoint here
          if (confirm('Are you sure you want to delete this director?')) {

              axios
                  .post(`http://127.0.0.1:8000/api/admin/users/${directorId}`)
                  .then((response) => {
                      const index = this.directors.findIndex(
                          (director) => director.id === directorId
                      );

                      if (index > -1) {
                          this.directors.splice(index, 1);
                      }
                      console.log(response);
                  })
                  .catch((error) => {
                      console.log(error);
                      this.errorMessage =
                          'Failed to delete director. Please try again later.';
                  });
          }
      },
      resetSearch() {
          this.searchTerm = '';
          this.selectedOrgId = '';
          this.currentPage = 1;
          this.toggleDirectors();
      },
      changePage(page) {
          this.currentPage = page;
      },
      resetPage() {
          this.currentPage = 1;
      }
  }
};
</script>


<style scoped>


.container {
  margin: 20px;
  padding: 20px;
}

.header {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 10px;
  color: #8f0778; 
  text-align: center;
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
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.search-container input[type="text"] {
  width: 300px;
  padding: 8px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid #cccccc;
  margin-right: 10px;
}

.search-container select {
  width: 200px;
  padding: 8px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-right: 10px;
}

.search-container button {
  padding: 8px 12px;
  font-size: 16px;
  border-radius: 4px;
  border: none;
  background-color: #dd0c99; 
  color: #fff;
}

.table-container {
  margin-top: 20px;
}

.directors-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 16px;
}

.directors-table th {
  padding: 12px;
  background-color:rgb(227 64 174); 
  color: #fff;
  text-align: left;
}

.directors-table td {
  padding: 12px;
  border: 1px solid #ccc;
  text-align: left;
}

.directors-table td.delete-cell {
  text-align: center;
}

.directors-table td.delete-cell button {
  padding: 8px 12px;
  font-size: 16px;
  border-radius: 4px;
  border: none;
  background-color: #e74c3c; 
  color: #fff;
}

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.pagination-container button {
    background-color: #8f0778;
  color: white;
  border: none;
  padding: 10px 16px;
  margin: 0 2px;
  cursor: pointer;
  border-radius: 5px;
}

.pagination-container button.active {
    background-color: pink;
  color: #8f0778;
}

.error-message {
  color: #e74c3c; /* updated color */
  text-align: center;
  margin-top: 10px;
}
</style>