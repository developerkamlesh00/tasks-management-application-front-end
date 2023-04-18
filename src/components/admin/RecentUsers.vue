<template>
  <div class="card">
    <div class="card-header">
      <h3 class="card-title">Recent Users</h3>
    </div>
    <div class="card-body">
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user,index) in recentUsers" :key="user.id">
            <td>{{ index + 1 }}</td>
            <td>{{ user.name }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
data() {
    return {
        recentUsers: [],
    };
},
mounted() {
    this.fetchRecentUsers();
},
methods: {
    async fetchRecentUsers() {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/admin/recent-users');
            this.recentUsers = response.data;
        } catch (error) {
            console.error(error);
        }
    },
    formatDate(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString('en-US', options);
    },
},
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');

.card {
background-color: #ffffff;
padding: 20px;
border-radius: 20px;
box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
transition: all 0.2s ease-in-out;
max-width: 800px;
width: 100%;
margin-right: 20px;
margin-bottom: 20px;
}

.card-header {
display: flex;
justify-content: space-between;
align-items: center;
margin-bottom: 20px;
background-color: #c75be5;
padding: 10px;
border-radius: 10px 10px 0 0;
}

.card-title {
font-family: 'Montserrat', sans-serif;
font-weight: 700;
font-size: 28px;
color: #ffffff;
margin: 0;
}

.table {
font-family: 'Montserrat', sans-serif;
font-size: 16px;
color: #666666;
margin: 0;
padding: 10px;
border-spacing: 0;
border: 1px solid #dddddd;
border-radius: 0 0 10px 10px;
}

.table thead th {
font-weight: 700;
text-align: left;
background-color: #f5f5f5;
border: 1px solid #dddddd;
}

.table td {
vertical-align: middle;
border: 1px solid #dddddd;
}

.table-striped tbody tr:nth-of-type(odd) {
background-color: #f5f5f5;
}

.table-hover tbody tr:hover {
background-color: #f5f5f5;
}


</style>
