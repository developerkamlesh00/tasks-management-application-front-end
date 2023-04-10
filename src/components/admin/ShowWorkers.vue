<template>
    <div class="container">
        <h2 class="header">Workers List</h2>
        <div class="search-container">
            <input type="text" placeholder="Search worker by name" v-model="searchTerm" @input="searchWorker"
                @click="searchWorkers" />
            <select v-model="selectedOrgId">
                <option value="">Filter by organization ID</option>
                <option v-for="orgId in orgIds" :key="orgId" :value="orgId">
                    {{ orgId }}
                </option>
            </select>
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
            workers: [],
            errorMessage: '',
            searchTerm: '',
            selectedOrgId: '',
            currentPage: 1,
            workersPerPage: 10
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
            this.resetPage();
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
        totalPageCount() {
            return Math.ceil(this.filteredWorkers.length / this.workersPerPage);
        },
        pagedWorkers() {
            const start = (this.currentPage - 1) * this.workersPerPage;
            const end = start + this.workersPerPage;
            return this.filteredWorkers.slice(start, end);
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
            // Call the delete API endpoint here
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
            this.currentPage = 1;
            this.toggleWorkers();
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
    color: #333;
    text-align: center;
}

.table-container {
    margin-top: 20px;
    margin-bottom: 20px;
    text-align: center;
}

.workers-table {
    border-collapse: collapse;
    width: 100%;
}

.workers-table th,
.workers-table td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ddd;
}

.workers-table th {
    font-size: 1.2rem;
    font-weight: bold;
    color: #333;
}

.workers-table td {
    padding: 10px;
    text-align: center;
}


.workers-table td.delete-cell button {
    background-color: #ff5c5c;
    color: #fff;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s;
}

.workers-table td.delete-cell button:hover {
    background-color: #ff7f7f;
}

.delete-cell button:hover {
    background-color: #ff6666;
    color: #fff;
    cursor: pointer;
}

.pagination-container {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 20px;
}

.pagination-container button {
    background-color: #fff;
    border: 1px solid #ddd;
    color: #333;
    padding: 6px 12px;
    margin-right: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.pagination-container button:hover {
    background-color: #f2f2f2;
}

.pagination-container button.active {
    background-color: #333;
    color: #fff;
    cursor: default;
}

.pagination-container button:not(:last-child) {
    margin-right: 10px;
}


.search-container {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    align-items: center;
}

.search-container input[type="text"] {
    padding: 10px;
    width: 300px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
}

.search-container select {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
}

.search-container button {
    background-color: #333;
    color: #fff;
    border: none;
    padding: 10px 16px;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s;
}

.search-container button:hover {
    background-color: #555;
}

.error-message {
    text-align: center;
    color: #ff6666;
    font-weight: bold;
}


@media screen and (max-width: 768px) {
  .workers-table thead {
    display: none;
  }

  .workers-table td:before {
    content: attr(data-label);
    font-weight: bold;
    display: block;
    text-align: center;
  }

  .workers-table td.delete-cell {
    padding: 10px 0;
  }

  .workers-table td.delete-cell button {
    margin-top: 10px;
  }
}

</style>

  