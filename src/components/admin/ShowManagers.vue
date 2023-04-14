<template>
    <div class="container">
        <h2 class="header">Manager List</h2>
        <div class="search-container">
            <input type="text" placeholder="Search manager by name" v-model="managerSearchTerm" @input="searchManager"
                @click="searchManagers" />
            <select v-model="managerSelectedOrgId">
                <option value="">Filter by organization ID</option>
                <option v-for="orgId in managerOrgIds" :key="orgId" :value="orgId">
                    {{ orgId }}
                </option>
            </select>
            <button @click="managerResetSearch">Reset</button>
        </div>
        <div class="table-container">
            <table class="managers-table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th @click="togglemanagerOrgIdsortOrder">Organization Id</th>
                        <th>Delete</th>
                    </tr>
                </thead>

                <tbody>
                    <!-- Loop through the pagedWorkers to show workers in the table -->
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
                <button v-if="managerCurrentPage > 1" @click="managerCurrentPage--" class="previous-page-btn">
                    Previous Page
                </button>
                <button v-for="pageNumber in managerTotalPageCount" :key="pageNumber" @click="managerCurrentPage = pageNumber"
                    :class="{ active: managerCurrentPage === pageNumber }">
                    {{ pageNumber }}
                </button>
                <button v-if="managerCurrentPage < managerTotalPageCount" @click="managerCurrentPage++" class="next-page-btn">
                    Next Page
                </button>
            </div>
        </div>
        <p v-if="managerErrorMessage" class="error-message">{{ managerErrorMessage }}</p>
    </div>
</template>
  

<script>
// import axios from 'axios';
import { mapActions, mapGetters } from 'vuex';

export default {
    data() {
        return {
            managers: [],
            managerErrorMessage: '',
            managerSearchTerm: '',
            managerSelectedOrgId: '',
            managerCurrentPage: 1,
            managersPerPage: 10
        };
    },
    mounted() {
        this.toggleManagers();
    },
    computed: {
        ...mapGetters('admin', ['managerOrgIds','filteredManagers','managerTotalPageCount','pagedManagers'])
    },
    methods: {
        ...mapActions('admin', ['toggleManagers','deleteManager','managerResetSearch','managerChangePage','managerResetPage']),
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
  color: #2c3e50; /* updated color */
  text-align: center;
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
  background-color: #2c3e50; /* updated color */
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
  background-color: #2c3e50; /* updated color */
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
  background-color: #e74c3c; /* updated color */
  color: #fff;
}

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.pagination-container button {
  padding: 8px 12px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid #ccc;
  background-color: #fff;
  margin-right: 10px;
}

.pagination-container button.active {
  background-color: #2c3e50; /* updated color */
  color: #fff;
  border: none;
}

.error-message {
  color: #e74c3c; /* updated color */
  text-align: center;
  margin-top: 10px;
}
</style>