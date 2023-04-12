<template>
    <div>
        <view-managers :manager="managerApi()"></view-managers>
    </div>
</template>
<script>
import ViewManagers from "./ViewManagersAll.vue";

export default{
    components:{
        ViewManagers,
    },
    methods:{
        managerApi(){
            let org = this.$store.getters.organization;
            return "http://127.0.0.1:8000/api/director/managers/"+org;
        }
    }
}
</script>



<!-- <template>
    <div>
     <div class="table-container">
       <table class="managers-table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Delete</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="(manager, index) in pagedManagers" :key="manager.id">
                        <td>{{ index + 1 }}</td>
                        <td>{{ manager.name }}</td>
                        <td>{{ manager.email }}</td>
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

export default{
    data(){
        return{
            managers: [],
            managersPerPage: 10,
            errorMessage: '',
            currentPage: 1,
        }
    },
    computed:{
        filteredManagers() {
            let filteredManagers = JSON.parse(JSON.stringify(this.managers));
            // if (this.searchTerm.trim()) {
            //     const searchTerm = this.searchTerm.toLowerCase();
            //     filteredManagers = filteredManagers.filter((manager) =>
            //         manager.name.toLowerCase().includes(searchTerm)
            //     );
            // }
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
    methods:{
        async fetchManagers(){
            let org = await this.$store.getters.organization;
            console.log(org);
            await axios.get(
                "http://localhost:8000/api/director/managers/"+org
            )
            .then((response) => {
                this.managers = response.data;
            })
            .catch((error) => {
                console.log(error);
                this.errorMessage = 'Failed to fetch managers. Please try again later.';
            });
                
        },
        deleteManager(managerId) {
            console.log(managerId);

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
        changePage(page) {
            this.currentPage = page;
        },
        resetPage() {
            this.currentPage = 1;
        }
    },
    mounted(){
        this.fetchManagers();
    }
}
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

.managers-table {
    border-collapse: collapse;
    width: 100%;
}

.managers-table th,
.managers-table td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ddd;
}

.managers-table th {
    font-size: 1.2rem;
    font-weight: bold;
    color: #333;
}



.managers-table td.delete-cell button {
    background-color: #ff5c5c;
    color: #fff;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s;
}

.managers-table td.delete-cell button:hover {
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
  .managers-table thead {
    display: none;
  }

  .managers-table td:before {
    content: attr(data-label);
    font-weight: bold;
    display: block;
    text-align: center;
  }

  .managers-table td.delete-cell {
    padding: 10px 0;
  }

  .managers-table td.delete-cell button {
    margin-top: 10px;
  }
}
</style> -->
