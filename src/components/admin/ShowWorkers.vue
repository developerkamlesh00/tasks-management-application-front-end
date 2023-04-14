<template>
    <div class="container">
        <h2 class="header">Workers List</h2>
        <div class="search-container">
            <input type="text" placeholder="Search worker by name" v-model="workerSearchTerm" @input="searchWorker"
                @click="searchWorkers" />
            <select v-model="workerSelectedOrgId">
                <option value="">Filter by organization ID</option>
                <option v-for="orgId in workerOrgIds" :key="orgId" :value="orgId">
                    {{ orgId }}
                </option>
            </select>
            <button @click="workerResetSearch">Reset</button>
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
                    <!-- Loop through the pagedWorkers to show workers in the table -->
                    <tr v-for="(worker, index) in pagedWorkers" :key="worker.id">
                        <td>{{ index + 1 }}</td>
                        <td>{{ worker.name }}</td>
                        <td>{{ worker.email }}</td>
                        <td>{{ worker.organization_id }}</td>
                        <td class="delete-cell">
                            <button @click="deleteWorker(worker.id)">Delete</button>
                        </td>
                    </tr>
                    <tr v-if="pagedWorkers.length === 0">
                        <td colspan="5" style="text-align: center;">
                            No workers present.
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="pagination-container">
                <button v-if="workerCurrentPage > 1" @click="workerCurrentPage--" class="previous-page-btn">
                    Previous Page
                </button>
                <button v-for="pageNumber in workerTotalPageCount" :key="pageNumber" @click="workerCurrentPage = pageNumber"
                    :class="{ active: workerCurrentPage === pageNumber }">
                    {{ pageNumber }}
                </button>
                <button v-if="workerCurrentPage < workerTotalPageCount" @click="workerCurrentPage++" class="next-page-btn">
                    Next Page
                </button>
            </div>
        </div>
        <p v-if="workerErrorMessage" class="error-message">{{ workerErrorMessage }}</p>
    </div>
</template>
  

<script>
// import axios from 'axios';
import { mapActions, mapGetters } from 'vuex';

export default {
    data() {
        return {
            workers: [],
            workerErrorMessage: '',
            workerSearchTerm: '',
            workerSelectedOrgId: '',
            workerCurrentPage: 1,
            workersPerPage: 10
        };
    },
    mounted() {
        this.toggleWorkers();
    },
    computed: {
        ...mapGetters('admin', ['workerOrgIds','filteredWorkers','workerTotalPageCount','pagedWorkers'])

        // workerOrgIds() {
        //     return [...new Set(this.workers.map((worker) => worker.organization_id))];
        // },
        // filteredWorkers() {
        //     this.workerResetPage();
        //     let filteredWorkers = this.workers;
        //     if (this.workerSearchTerm.trim()) {
        //         const workerSearchTerm = this.workerSearchTerm.toLowerCase();
        //         filteredWorkers = filteredWorkers.filter((worker) =>
        //             worker.name.toLowerCase().includes(workerSearchTerm)
        //         );
        //     }
        //     if (this.workerSelectedOrgId !== '') {
        //         filteredWorkers = filteredWorkers.filter(
        //             (worker) => worker.organization_id === this.workerSelectedOrgId
        //         );
        //     }
        //     return filteredWorkers;
        // },
        // workerTotalPageCount() {
        //     return Math.ceil(this.filteredWorkers.length / this.workersPerPage);
        // },
        // pagedWorkers() {
        //     const start = (this.workerCurrentPage - 1) * this.workersPerPage;
        //     const end = start + this.workersPerPage;
        //     return this.filteredWorkers.slice(start, end);
        // },

    },
    methods: {
        ...mapActions('admin', ['toggleWorkers','deleteWorker','workerResetSearch','workerChangePage','workerResetPage']),
        // toggleWorkers() {
        //     axios
        //         .get('http://127.0.0.1:8000/api/admin/workers')
        //         .then((response) => {

        //             this.workers = response.data;
        //         })
        //         .catch((error) => {
        //             console.log(error);
        //             this.workerErrorMessage =
        //                 'Failed to fetch workers. Please try again later.';
        //         });
        // },
        // deleteWorker(workerId) {
        //     console.log(workerId);
        //     // Call the delete API endpoint here

        //     if (confirm('Are you sure you want to delete this worker?')) {
        //         axios
        //             .post(`http://127.0.0.1:8000/api/admin/users/${workerId}`)
        //             .then((response) => {
        //                 const index = this.workers.findIndex(
        //                     (worker) => worker.id === workerId
        //                 );

        //                 if (index > -1) {
        //                     this.workers.splice(index, 1);
        //                 }
        //                 console.log(response);
        //             })
        //             .catch((error) => {
        //                 console.log(error);
        //                 this.workerErrorMessage =
        //                     'Failed to delete worker. Please try again later.';
        //             });
        //     }
        // },
        // workerResetSearch() {
        //     this.workerSearchTerm = '';
        //     this.workerSelectedOrgId = '';
        //     this.workerCurrentPage = 1;
        //     this.toggleWorkers();
        // },
        // changePage(page) {
        //     this.workerCurrentPage = page;
        // },
        // workerResetPage() {
        //     this.workerCurrentPage = 1;
        // }
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

.workers-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 16px;
}

.workers-table th {
  padding: 12px;
  background-color: #2c3e50; /* updated color */
  color: #fff;
  text-align: left;
}

.workers-table td {
  padding: 12px;
  border: 1px solid #ccc;
  text-align: left;
}

.workers-table td.delete-cell {
  text-align: center;
}

.workers-table td.delete-cell button {
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
  