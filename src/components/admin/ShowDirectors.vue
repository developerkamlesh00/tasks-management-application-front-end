<template>
    <div class="container">
        <h2 class="header">Directors List</h2>
        <div class="table-container">
            <table class="directors-table">
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
                    <tr v-for="director in directors" :key="director.id">
                        <td>{{ director.id }}</td>
                        <td>{{ director.name }}</td>
                        <td>{{ director.email }}</td>
                        <td>{{ director.organization_id }}</td>
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
            directors: [],
            errorMessage: ''
        }
    },
    mounted() {
        this.toggleDirectors();
    },

    methods: {
        toggleDirectors() {

            axios.get('http://127.0.0.1:8001/api/admin/directors')
                .then(response => {
                    this.directors = response.data;
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

.directors-table {
    border-collapse: collapse;
    width: 100%;
}

.directors-table th,
.directors-table td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
}

.directors-table th {
    background-color: #f2f2f2;
    color: #333;
    font-weight: bold;
}
</style>
