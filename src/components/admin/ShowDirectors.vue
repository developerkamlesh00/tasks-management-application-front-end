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
                        <th>Delete</th>
                    </tr>
                </thead>

                <tbody>
                    <!-- Loop through directors to show Director in the table -->
                    <tr v-for="director in directors" :key="director.id">
                        <td>{{ director.id }}</td>
                        <td>{{ director.name }}</td>
                        <td>{{ director.email }}</td>
                        <td>{{ director.organization_id }}</td>
                        <td class="delete-cell">
                            <button @click="deleteDirector(director.id)">Delete</button>
                        </td>
                    </tr>
                    <tr v-if="directors.length === 0">
                        <td colspan="5" style="text-align: center;">No director present.</td>
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
        deleteDirector(directorId) {
            // Call the delete API endpoint here
            if (confirm('Are you sure you want to delete this director?')) {
                axios.post(`http://127.0.0.1:8001/api/admin/users/${directorId}`)
                    .then(response => {
                        const index = this.directors.findIndex(director => director.id === directorId);
                        if (index > -1) {
                            this.directors.splice(index, 1);
                        }
                        console.log(response);
                    })
                    .catch(error => {
                        console.log(error);
                        this.errorMessage = 'Failed to delete director. Please try again later.';
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
