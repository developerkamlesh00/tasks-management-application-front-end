<template>
    <div class="container">
        <h2 class="header">Manager List</h2>
        <div class="search-container">
            <input type="text" placeholder="Search manager by name" v-model="searchTerm" @input="searchManager"
                @click="searchManagers" />
            <select v-model="selectedOrgId">
                <option value="">Filter by organization ID</option>
                <option v-for="orgId in orgIds" :key="orgId" :value="orgId">
                    {{ orgId }}
                </option>
            </select>
            <button class="reset-button" @click="resetSearch">Reset</button>
        </div>
        <div class="table-container">
            <table class="managers-table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th @click="toggleOrgIdSortOrder">Organization Id</th>
                        <th>Delete</th>
                    </tr>
                </thead>

                <tbody>
                    <!-- Loop through the pagedmanagers to show managers in the table -->
                    <tr v-for="(manager, index) in pagedManagers" :key="manager.id">
                        <td>{{ index + 1 }}</td>
                        <td>{{ manager.name }}</td>
                        <td>{{ manager.email }}</td>
                        <td>{{ manager.organization_id }}</td>
                        <td class="delete-cell">
                            <button @click="deleteManager(manager.id)">Delete</button>
                        </td>
                    </tr>
                    <tr v-if="pagedManagers.length === 0">
                        <td colspan="5" style="text-align: center;">
                            No manager present.
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
            managers: [],
            errorMessage: '',
            searchTerm: '',
            selectedOrgId: '',
            currentPage: 1,
            managersPerPage: 10
        };
    },
    mounted() {
        this.toggleManagers();
    },
    computed: {
        orgIds() {
            return [...new Set(this.managers.map((manager) => manager.organization_id))];
        },
        filteredManagers() {
            this.resetPage();
            let filteredManagers = this.managers;
            if (this.searchTerm.trim()) {
                const searchTerm = this.searchTerm.toLowerCase();
                filteredManagers = filteredManagers.filter((manager) =>
                    manager.name.toLowerCase().includes(searchTerm)
                );
            }
            if (this.selectedOrgId !== '') {
                filteredManagers = filteredManagers.filter(
                    (manager) =>manager.organization_id === this.selectedOrgId
                );
            }
            return filteredManagers;
        },
        totalPageCount() {
            return Math.ceil(this.filteredManagers.length / this.managersPerPage);
        },
        pagedManagers() {
            const start = (this.currentPage - 1) * this.managersPerPage;
            const end = start + this.managersPerPage;
            return this.filteredManagers.slice(start, end);
        },

    },
    methods: {
        toggleManagers() {

            axios
                .get('http://127.0.0.1:8000/api/admin/managers')
                .then((response) => {

                    this.managers = response.data;
                })
                .catch((error) => {
                    console.log(error);
                    this.errorMessage =
                        'Failed to fetch managers. Please try again later.';
                });
        },
        deleteManager(managerId) {
            console.log(managerId);
            // Call the delete API endpoint here

            if (confirm('Are you sure you want to delete this manager?')) {
                axios
                    .post(`http://127.0.0.1:8000/api/admin/users/${managerId}`)
                    .then((response) => {
                        const index = this.managers.findIndex(
                            (manager) => manager.id === managerId
                        );

                        if (index > -1) {
                            this.managers.splice(index, 1);
                        }
                        console.log(response);
                    })
                    .catch((error) => {
                        console.log(error);
                        this.errorMessage =
                            'Failed to delete manager. Please try again later.';
                    });
            }
        },
        resetSearch() {
            this.searchTerm = '';
            this.selectedOrgId = '';
            this.currentPage = 1;
            this.toggleManagers();
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
  border: 1px solid #ccc;
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

.managers-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 16px;
}

.managers-table th {
  padding: 12px;
  background-color:rgb(227 64 174); 
  color: #fff;
  text-align: left;
}

.managers-table td {
  padding: 12px;
  border: 1px solid #ccc;
  text-align: left;
}

.managers-table td.delete-cell {
  text-align: center;
}

.managers-table td.delete-cell button {
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