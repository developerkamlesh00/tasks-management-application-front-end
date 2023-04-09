<template>
    <div class="container">
        <h2 class="header">Manager List</h2>
        <div class="table-container">
            <table class="managers-table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Organization Id</th>
                    </tr>
                </thead>

                <tbody>
                    <!-- Loop through directors to show Director in the table -->
                    <tr v-for="manager in managers" :key="manager.id">
                        <td>{{ manager.id }}</td>
                        <td>{{ manager.name }}</td>
                        <td>{{ manager.email }}</td>
                        <td>{{ manager.organization_id }}</td>
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
            managers: [],
            errorMessage: ''
        }
    },
    mounted() {
        this.toggleManagers();
    },

    methods: {
        toggleManagers() {

            axios.get('http://127.0.0.1:8001/api/admin/managers')
                .then(response => {
                    this.managers = response.data;
                })
                .catch(error => {
                    console.log(error);
                    this.errorMessage = 'Failed to fetch directors. Please try again later.';
                });
        },
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

.managers-table {
    border-collapse: collapse;
    width: 100%;
}

.managers-table th,
.managers-table td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
}

.managers-table th {
    background-color: #f2f2f2;
    color: #333;
    font-weight: bold;
}

.error-message {
    color: red;
    margin-top: 10px;
}
</style>
