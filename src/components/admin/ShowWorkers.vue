<template>
    <div class="container">
        <h2 class="header">Workers List</h2>
        <div class="table-container">
            <table class="workers-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Organization Id</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="worker in workers" :key="worker.id">
                        <td>{{ worker.id }}</td>
                        <td>{{ worker.name }}</td>
                        <td>{{ worker.email }}</td>
                        <td>{{ worker.organization_id }}</td>
                        <td class="delete-cell">
                            <button @click="deleteWorker(worker.id)">Delete</button>
                        </td>
                    </tr>
                    <tr v-if="workers.length === 0">
                        <td colspan="5" style="text-align: center;">No worker present.</td>
                    </tr>
                </tbody>
            </table>
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
        };
    },

    mounted() {
        this.fetchWorkers();
    },

    methods: {
        fetchWorkers() {
            axios.get('http://127.0.0.1:8001/api/admin/workers')
                .then(response => {
                    this.workers = response.data;
                })
                .catch(error => {
                    console.log(error);
                    this.errorMessage = 'Failed to fetch workers. Please try again later.';
                });
        },
        deleteWorker(workerId) {
            // Call the delete API endpoint here
            if (confirm('Are you sure you want to delete this director?')) {
                axios.post(`http://127.0.0.1:8001/api/admin/users/${workerId}`)
                    .then(response => {
                        const index = this.workers.findIndex(worker => worker.id === workerId);
                        if (index > -1) {
                            this.workers.splice(index, 1);
                        }
                        console.log(response);
                    })
                    .catch(error => {
                        console.log(error);
                        this.errorMessage = 'Failed to delete worker. Please try again later.';
                    });
            }
        }
    },
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

.table-container {
    text-align: center;
}

.workers-table {
    border-collapse: collapse;
    width: 100%;
}

.workers-table th,
.workers-table td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
}

.workers-table th {
    background-color: #f2f2f2;
    color: #333;
    font-weight: bold;
}

.error-message {
    color: red;
    margin-top: 10px;
}


.delete-cell {
    width: 10%;
    text-align: center;
}

.delete-cell button {
    padding: 4px 8px;
    background-color: #f44336;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.delete-cell button:hover {
    background-color: #c62828;
}
</style>
  