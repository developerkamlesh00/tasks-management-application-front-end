<template>
  <!-- <div class="row">
        <div class="col-4">
            <base-card class="bg-info">
                <base-button class="m-auto rounded-4">Total Tasks Assigned</base-button>
                <span class="display-6 text-center">{{ this.getCounts.total_tasks_assigned }}</span>
            </base-card>
        </div>
        <div class="col-4 ">
            <base-card class="bg-info">
                <base-button class="m-auto rounded-4">Tasks Completed</base-button>
                <span class="display-6 text-center">{{ this.getCounts.completed_tasks }}</span>
            </base-card>
        </div>
        <div class="col-4">
            <base-card class="bg-info">
                <base-button class="m-auto rounded-4">Tasks Overdue</base-button>
                <span class="display-6 text-center">{{ this.getCounts.overdue_tasks }}</span>
            </base-card>
        </div>
    </div> -->
  <div>
    <div class="card h-100">
      <div class="card-body">
        <div class="d-flex justify-content-between">
          <div>
            <h5 class="mb-2">Top coupons</h5>
            <h6 class="text-700">Last 7 days</h6>
          </div>
        </div>
        <div class="pb-4 pt-3">
          <div class="echart-top-coupons"
            style="height: 115px; width: 100%; user-select: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); position: relative;"
            _echarts_instance_="ec_1681113826644">
            <div
              style="position: relative; width: 407px; height: 115px; padding: 0px; margin: 0px; border-width: 0px; cursor: default;">
              <canvas data-zr-dom-id="zr_0" width="610" height="172"
                style="position: absolute; left: 0px; top: 0px; width: 407px; height: 115px; user-select: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); padding: 0px; margin: 0px; border-width: 0px;"></canvas>
            </div>
            <div class=""></div>
          </div>
        </div>
        <div>
          <div class="d-flex align-items-center mb-2">
            <div class="bullet-item bg-primary me-2"></div>
            <h6 class="text-900 fw-semi-bold flex-1 mb-0">Percentage discount</h6>
            <h6 class="text-900 fw-semi-bold mb-0">72%</h6>
          </div>
          <div class="d-flex align-items-center mb-2">
            <div class="bullet-item bg-primary-200 me-2"></div>
            <h6 class="text-900 fw-semi-bold flex-1 mb-0">Fixed card discount</h6>
            <h6 class="text-900 fw-semi-bold mb-0">18%</h6>
          </div>
          <div class="d-flex align-items-center">
            <div class="bullet-item bg-info-500 me-2"></div>
            <h6 class="text-900 fw-semi-bold flex-1 mb-0">Fixed product discount</h6>
            <h6 class="text-900 fw-semi-bold mb-0">10%</h6>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <div>
        <canvas id="myChart"></canvas>
    </div>
    <button @click="setGraphProps()">Click</button>
    <div class="">Task per project{{ getTasksPerProject }}</div> -->
</template>

<script>
// import { mapGetters } from 'vuex'
// import Chart from 'chart.js/auto'

// export default {
//     data() {
//         return {
//             data: this.getTasksPerProject,
//             labels: [],
//             completed: []
//         }
//     },
//     computed: {
//         ...mapGetters('worker', ['getTasksPerProject', 'getCounts'])
//     },
//     // mounted() {
//     //     console.log(this.getTasksPerProject)
//     //     new Chart(
//     //         document.getElementById('p1'),
//     //         {
//     //             type: 'bar',
//     //             options: {
//     //                 animation: true,
//     //                 plugins: {
//     //                     legend: {
//     //                         display: false
//     //                     },
//     //                     tooltip: {
//     //                         enabled: false
//     //                     }
//     //                 }
//     //             },
//     //             data: {
//     //                 labels: this.data.map(project => project.key),
//     //                 datasets: [
//     //                     {
//     //                         label: 'Acquisitions by year',
//     //                         data: this.data.map(project => project.completed.length)
//     //                     }
//     //                 ]
//     //             }
//     //         }
//     //     );
//     // },
//     // methods: {

//     //     setGraphProps() {
//     //         // console.log(this.getTasksPerProject)
//     //         // const graph_data= JSON.parse(JSON.stringify(this.getTasksPerProject))
//     //         // console.log(graph_data)
//     //         const ctx = document.getElementById('myChart');


//     //         // const labels = Object.keys(graph_data);
//     //         // console.log(labels)
//     //         // const data = {
//     //         //     labels: labels,
//     //         //     datasets: [
//     //         //         {
//     //         //             label: 'Pending',
//     //         //             data: graph_data.map(function(project){
//     //         //                 console.log(project)
//     //         //                return graph_data['pending']
//     //         //             }),
//     //         //             backgroundColor: "red",
//     //         //             stack: 'Stack 0',
//     //         //         },
//     //         //         {
//     //         //             label: 'Completed',
//     //         //             data: graph_data.map(function(project){
//     //         //                 console.log(project)
//     //         //                 return graph_data['completed']
//     //         //             }),
//     //         //             backgroundColor: "blue",
//     //         //             stack: 'Stack 0',
//     //         //         },
//     //         //     ]
//     //         // };
//     //         // const config = {
//     //         //     type: 'bar',
//     //         //     data: data,
//     //         //     options: {
//     //         //         plugins: {
//     //         //             title: {
//     //         //                 display: true,
//     //         //                 text: 'Chart.js Bar Chart - Stacked'
//     //         //             },
//     //         //         },
//     //         //         responsive: true,
//     //         //         interaction: {
//     //         //             intersect: false,
//     //         //         },
//     //         //         scales: {
//     //         //             x: {
//     //         //                 stacked: true,
//     //         //             },
//     //         //             y: {
//     //         //                 stacked: true
//     //         //             }
//     //         //         }
//     //         //     }
//     //         // };

//     //         const data = {
//     //             labels: ['Pending', 'Under Review', 'Overdue', 'Completed'],
//     //             datasets: [
//     //                 {
//     //                     label: 'Dataset 1',
//     //                     data: [this.getCounts.total_tasks_assigned, this.getCounts.reviews_submitted, this.getCounts.overdue_tasks, this.getCounts.completed_tasks],
//     //                     backgroundColor: Object.values({
//     //                         red: 'rgb(255, 99, 132)',
//     //                         orange: 'rgb(255, 159, 64)',
//     //                         yellow: 'rgb(255, 205, 86)',
//     //                         green: 'rgb(75, 192, 192)',
//     //                         blue: 'rgb(54, 162, 235)',
//     //                         purple: 'rgb(153, 102, 255)',
//     //                         grey: 'rgb(201, 203, 207)'
//     //                     }),
//     //                 }
//     //             ]
//     //         };

//     //         const config = {
//     //             type: 'pie',
//     //             data: data,
//     //             options: {
//     //                 responsive: true,
//     //                 plugins: {
//     //                     legend: {
//     //                         position: 'top',
//     //                     },
//     //                     title: {
//     //                         display: true,
//     //                         text: 'Chart.js Pie Chart'
//     //                     }
//     //                 }
//     //             },
//     //         };

//     //         new Chart(ctx, {
//     //             data: data,
//     //             options: config
//     //         });

//     //         // for (let key in this.data) {
//     //         //     this.labels.push(key),
//     //         //         this.completed.push(this.data[key]["completed"].length);
//     //         // }
//     //         // console.log(this.labels)
//     //         // console.log(this.completed)
//     //     }
//     // },
// }
import { chart } from 'chart.js'
import { mapGetters } from 'vuex';
const tasks = { "1": { "completed": [], "pending": [18] }, "6": { "completed": [], "pending": [162] }, "8": { "completed": [229], "pending": [] } };

export default {
  data() {
    return {
    }
  },
  mounted() {
    // this.tasks=this.getTasksPerProject;
    console.log("ds", this.tasks)
    this.renderChart();
  },
  computed: {
    ...mapGetters('worker', ['getTasksPerProject', 'getCounts'])
  },
  methods: {
    renderChart() {
      const data = {
        labels: Object.keys(tasks),
        datasets: [
          {
            label: "Completed",
            data: Object.values(tasks).map((task) => task.completed.length),
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
          {
            label: "Pending",
            data: Object.values(tasks).map((task) => task.pending.length),
            backgroundColor: "rgba(255, 159, 64, 0.2)",
            borderColor: "rgba(255, 159, 64, 1)",
            borderWidth: 1,
          },
        ],
      };
      const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              stacked: true,
            },
          ],
          yAxes: [
            {
              stacked: true,
            },
          ],
        },
      };
      new chart(this.$refs.myChart, {
        type: "bar",
        data: data,
        options: options,
      });
    },
  },
};
</script>


<style scoped></style>
