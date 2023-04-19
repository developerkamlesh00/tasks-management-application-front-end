<template>
    <div class="container">
        <h2 class="header">Managers</h2><br>
        <div class="search-container">
            <div style="padding-left: 10%;">
                <input type="text" placeholder="Search manager by name" v-model="searchTerm" @input="searchManager"
                    @click="searchManagers" />
                <button class="body" @click="resetSearch">Reset</button>
            </div>
        </div>
        <div class="container" style="margin-top: 40px;">
            <div v-if="isLoading">
                <base-spinner></base-spinner>
            </div>
            <div class="row">
                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12" v-for="(manager, index) in pagedManagers" :key="index">
                    <div class="card text-center card1">
                        <img class="card-img-top" src="../../assets/usericon.png" alt="" width="100%">
                            <div class="card-block">
                                <div class="innerdiv">
                                    <h5 class="card-title">{{ manager.name }}</h5>
                                    <h6 class="card-text">{{ manager.email }}</h6>
                                </div>
                                <button class="btn buttoncolor" @click="deleteManager(manager.id)">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
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
        <!-- <div class="table-container">
            <table class="managers-table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th @click="toggleOrgIdSortOrder">Organization Name</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                
                <tbody>
                    <tr v-for="(manager, index) in pagedManagers" :key="manager.id">
                        <td>{{ index + 1 }}</td>
                        <td>{{ manager.name }}</td>
                        <td>{{ manager.email }}</td>
                        <td>{{ manager.organization.org_name }}</td>
                        <td class="delete-cell">
                            <button @click="deleteManager(manager.id)">Delete</button>
                        </td>
                    </tr>
                    <tr v-if="pagedManagers.length === 0 && !isLoading">
                        <td colspan="5" style="text-align: center;">
                            No manager present.
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
        </div> -->
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
</template>
  

<script>
import axios from 'axios';
import { mapActions, mapGetters } from 'vuex';
import BaseSpinner from "../ui/BaseSpinner.vue";

export default {
    props:['manager'],
    components:{
        BaseSpinner,
    },
    data() {
        return {
            managers: [],
            errorMessage: '',
            searchTerm: '',
            selectedOrgId: '',
            currentPage: 1,
            managersPerPage: 9,

            isLoading: false,
        };
    },
    mounted() {
        this.toggleManagers();
    },
    computed: {
        ...mapGetters('director',['getManagers1']),
        orgIds() {
            return [...new Set(this.managers.map((manager) => manager.organization_id))];
        },
        filteredManagers() {
            this.resetPage();
            let filteredManagers = this.getManagers1;//get from vuex
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
        ...mapActions('director',['fetchManagers']),

        async toggleManagers() {
            this.isLoading = true;
            try{
                await this.fetchManagers(this.manager);
            }catch(error){
                console.log(error);
                this.errorMessage = 'Failed to fetch managers. Please try again later.';
            }
            this.isLoading = false;
        },
        deleteManager(managerId) {
            console.log(managerId);
            // Call the delete API endpoint here
            if (confirm('Are you sure you want to delete this manager?')) {
                axios
                    .post(`http://127.0.0.1:8000/api/admin/users/${managerId}`)
                    .then((response) => {
                        this.toggleManagers();
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
/* .cardbackground{
    background-color: #ff7cdc;
} */
.buttoncolor{
  color: white;
  background-color: #fb5b5b;
}
.card {
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
  padding: 20px;
  height: 300px;
}

.card-img-top {
  width: 50%;
  height: auto;
  max-width: 200px;
  margin: 0 auto;
  margin-bottom: 20px;
}
.innerdiv{
    height: 80px ;
    /* color: white; */
}

@media (max-width: 767px) {
  .card-img-top {
    max-width: 100px;
  }
}


.container {
  margin: 10px;
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
  background-color: #ff84da; /* updated color */
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
