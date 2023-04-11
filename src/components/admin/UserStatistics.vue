<template>
  <div class="chart-container">
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">User Statistics</h3>
      </div>
      <div class="card-body">
        <canvas ref="chart"></canvas>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chart-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.card {
  background-color: transparent;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease-in-out;
  max-width: 800px;
  width: 100%;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
}

.card-header {
  border-bottom: none;
  text-align: center;
}

.card-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0;
  color: #303030;
  text-shadow: 1px 1px 2px #ccc;
}

canvas {
  margin-top: 20px;
  border-radius: 20px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  border: 2px solid #ffffff;
}

canvas:hover {
  border: 2px solid #e3e3e3;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}


</style>

<script>
import axios from 'axios';
import Chart from 'chart.js/auto';

export default {
  data() {
    return {
      usersData: [],
    };
  },
  mounted() {
    this.fetchUserData();
  },
  methods: {
    async fetchUserData() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/admin/user-data');
        this.usersData = response.data;
        this.renderChart();
      } catch (error) {
        console.error(error);
      }
    },
    renderChart() {
      const ctx = this.$refs.chart.getContext('2d');
      const chartData = {
        labels: ['Admins', 'Directors', 'Managers', 'Workers'],
        datasets: [
          {
            label: 'Users Data',
            data: [
              this.usersData.total_admins,
              this.usersData.total_directors,
              this.usersData.total_managers,
              this.usersData.total_workers,
            ],
            backgroundColor: [
              'rgba(255, 99, 132, 0.7)',
              'rgba(54, 162, 235, 0.7)',
              'rgba(255, 206, 86, 0.7)',
              'rgba(75, 192, 192, 0.7)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
            ],
            borderWidth: 2,
            hoverBackgroundColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
            ],
            hoverBorderColor: '#fff',
            hoverBorderWidth: 4,
          },
        ],
      };
        new Chart(ctx, {
          type: 'pie',
          data: chartData,
          options: {
            responsive: true,
            maintainAspectRatio: false,
          },
        });
      },
    },
  };
</script>
