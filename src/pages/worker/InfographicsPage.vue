<template>
  <h2 class="header">Projects Summary</h2><br>
  <div>
    {{ getCounts }}
    {{ getTasksPerProject }}
    <div class="container" style="width:700px;height:500px">
      <canvas id="pieChart"></canvas><br><br>
      <hr><br>
    </div>
    <div class="container" style="width:700px;height:300px">
      <canvas id="stackedBarChart"></canvas><br><br>
      <hr><br>
    </div>
    <table>
      <thead>
        <tr>
          <th>Task ID</th>
          <th>Time Passed</th>
        </tr>
      </thead>
    </table>
  </div>
</template>
<script>
// import axios from 'axios';
import {
  Chart, PieController, ArcElement, CategoryScale, LinearScale, BarController, BarElement, Colors,
  BubbleController, Tooltip ,
  Legend
} from 'chart.js';
Chart.register(

);

import { mapGetters } from 'vuex';
Chart.register(CategoryScale, Colors, Tooltip ,
  BubbleController,
  LinearScale,
  Legend, LinearScale, BarController, BarElement, PieController, ArcElement);
export default {
  data() {
    return {
completed:[],
completed_ids:[],
labels:[],
pending:[],
pending_ids:[],
    }
  },
  methods: {
  },
  computed: {
    ...mapGetters('worker', ['getCounts', 'getTasksPerProject'])
  },
  mounted() {

    const data = {
      labels: [
        'Total Tasks',
        'Pending',
        'Overdue',
        'Under Review',
        'Completed',
      ],
      datasets: [{
        label: 'Number of Tasks',
        data: [this.getCounts.total_tasks_assigned, this.getCounts.pending, this.getCounts.overdue_tasks, this.getCounts.reviews_submitted, this.getCounts.completed_tasks],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
          'rgb(155, 105, 86)',
          'rgb(055, 005, 2)',
        ],
        hoverOffset: 5
      }]
    }
    const config = {
      type: 'pie',
      data: data,
      options: {
        plugins: {
          legend: {
            display: true,
            position: 'right'
          },
          title: {
            display: true,
            text: 'Tasks'
          },
          responsive: true,
        interaction: {
          intersect: false,
        },
        }
      }
    }

    const ctx = document.getElementById('pieChart');
    const myChart = new Chart(ctx,
      config);
    console.log(myChart)

    for (let key in this.getTasksPerProject) {
        this.labels.push(`Project #${key}`),
            this.completed.push(this.getTasksPerProject[key]["completed"].length);
            this.completed_ids.push(this.getTasksPerProject[key]["completed"]);
            this.pending.push(this.getTasksPerProject[key]["pending"].length);        
            this.pending_ids.push(this.getTasksPerProject[key]["pending"]);        
            
    }
    const data2 = {
      labels: this.labels,
      datasets: [
        {
          label: 'Pending',
          data: this.pending,
          backgroundColor: 'rgb(54, 162, 235)',
          stack: 'Stack 0',
        },
        {
          label: 'Completed',
          data: this.completed,
          backgroundColor: 'rgb(224, 62, 135)',
          stack: 'Stack 0',
        },
      ]
    };

    const config2 = {
      type: 'bar',
      data: data2,
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Chart.js Bar Chart - Stacked'
          },
        },
        responsive: true,
        interaction: {
          intersect: false,
        },
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true
          }
        },
      }
    };
    const ctx2 = document.getElementById('stackedBarChart');
    const myChart1 = new Chart(ctx2,
      config2);
    console.log(myChart1)

  }
}
</script>

<style scoped>
.header {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
  text-align: center;
}

table {
  border-collapse: collapse;
}

td {
  padding: 10px;
  border: none;
}

.red {
  background-color: rgba(255, 99, 132, 0.2);
}

.yellow {
  background-color: rgba(255, 205, 86, 0.2)
}

.orange {
  background-color: #F58326;
}

.green {
  background-color: rgba(75, 192, 192, 0.2);
}
</style>