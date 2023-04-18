<template>
  <div class="container py-2 p-4 m-auto">
  <h2 class="header">Visualize My Data</h2><br>
  
  <div class="container m-2 text-center">
    <h2>Count of task status</h2>
    <div class="container my-2" style="width:500px;height:500px">
      <canvas id="pieChart"></canvas>
    </div>
    <h2>Pending/Completed tasks in each Project</h2>
    <div class="container my-2" style="width:500px;height:300px">
      <canvas id="stackedBarChart"></canvas>
    </div>
  </div>
  </div>
</template>
<script>
import {
  Chart, PieController, ArcElement, CategoryScale, LinearScale, BarController, BarElement, Colors,
  BubbleController, Tooltip ,
  Legend
} from 'chart.js';
import { mapActions, mapGetters } from 'vuex';

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
    ...mapActions('worker',['fetchWorkerTasks'])
  },
  computed: {
    ...mapGetters('worker', ['getCounts', 'getTasksPerProject'])
  },
  async mounted() {
      await this.fetchWorkerTasks({isFirstRequest:true})
    const data = {
      labels: [
        'Total Tasks',
        'Incomplete',
        'ToDo',
        'Doing',
        'Overdue',
        'Under Review',
        'Completed',
      ],
      datasets: [{
        label: 'Number of Tasks',
        data: [this.getCounts.total_tasks_assigned, this.getCounts.pending, this.getCounts.todo,this.getCounts.doing, this.getCounts.overdue_tasks, this.getCounts.reviews_submitted, this.getCounts.completed_tasks],
        backgroundColor: [
          'rgb(3, 144, 252)',
          'rgb(252, 173, 3)',
          'rgb(152, 173, 3)',
          'rgb(252, 73, 123)',
          'rgb(252, 3, 3)',
          'rgb(235, 5, 189)',
          'rgb(47, 235, 5)',
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
          backgroundColor: 'rgb(252, 173, 3)', // Orange
          stack: 'Stack 0',
        },
        {
          label: 'Completed',
          data: this.completed,
          backgroundColor: 'rgb(47, 235, 5)', // Light Green
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
            text: 'View project details in Project Tab'
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