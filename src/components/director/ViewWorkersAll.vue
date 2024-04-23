<template>
    <div class="container">
        <h2 class="header">Workers List</h2><br>
        <div class="search-container" >
            <div style="padding-left: 10%;">
                <input type="text" placeholder="Search worker by name" v-model="searchTerm" @input="searchWorker"
                    @click="searchWorkers" />
                <button class="body" @click="resetSearch">Reset</button>
            </div>
        </div>
        <div class="table-container">
            <table class="workers-table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Organization Name</th>
                        <th>Delete</th>
                    </tr>
                </thead>

                <tbody>
                    <!-- Loop through the pagedWorkers to show workers in the table -->
                    <tr v-for="(worker, index) in pagedWorkers" :key="worker.id">
                        <td>{{ index + 1 }}</td>
                        <td>{{ worker.name }}</td>
                        <td>{{ worker.email }}</td>
                        <td>{{ worker.organization.org_name }}</td>
                        <td class="delete-cell">
                            <button @click="deleteWorker(worker.id)">Delete</button>
                        </td>
                    </tr>
                    <tr v-if="pagedWorkers.length === 0 && !isLoading">
                        <td colspan="5" style="text-align: center;">
                            No workers present.
                        </td>
                    </tr>
                </tbody>
            </table>
            <div v-if="isLoading">
                <base-spinner></base-spinner>
            </div>
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
import { mapActions, mapGetters } from 'vuex';
import BaseSpinner from "../ui/BaseSpinner.vue";

export default {
    props: ['worker'],
    components:{
        BaseSpinner,
    },
    data() {
        return {
            workers: [],
            errorMessage: '',
            searchTerm: '',
            selectedOrgId: '',
            currentPage: 1,
            workersPerPage: 10,

            isLoading: false,
        };
    },
    mounted() {
        this.toggleWorkers();
    },
    computed: {
        //add Getters
        ...mapGetters('director',['getWorkers']),

        orgIds() {
            return [...new Set(this.workers.map((worker) => worker.organization_id))];
        },
        filteredWorkers() {
            this.resetPage();
            let filteredWorkers = this.getWorkers; // fetch getters
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
        ...mapActions('director',['fetchWorkers']),
        async toggleWorkers() {
            this.isLoading = true;
            try{
                await this.fetchWorkers(this.worker);
            }catch(error){
                console.log(error);
                this.errorMessage ='Failed to fetch workers. Please try again later.';
            }
            this.isLoading = false; 
        },
        deleteWorker(workerId) {
            // console.log(workerId);
            // Call the delete API endpoint here
            if (confirm('Are you sure you want to delete this worker?')) {
                axios
                    .post(`http://127.0.0.1:8000/api/admin/users/${workerId}`)
                    .then((response) => {
                        this.toggleWorkers();
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
  margin: 10px;
}
.header {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 10px;
  /* color: #2c3e50; */
  color: #8f0778; 
  text-align: center;
  animation: color-change 5s infinite;
}
@keyframes color-change {
  0% {
    color: #8f0778; 
  }

  50% {
    color: #d8b344;
  }

  100% {
    color: #3e9579;
  }
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
  background-color: #ff84da; /* updated color */
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