<template>
    <div class="col-12">
        <div class="row center">
            <div class="col-4">
                <span class="row">Total Tasks Assigned</span>
                <span class="row">{{ $store.state.totalTasks }}</span>
            </div>
            <div class="col-4">
                <span class="row">Tasks Completed</span>
                <span class="row">{{ $store.state.completedTasks }}</span>
            </div>
            <div class="col-4">
                <span class="row">Tasks Overdue</span>
                <span class="row">{{ $store.state.overdue }}</span>
            </div>
        </div>
        <div class="row">
            <div class="col-6"><canvas id="p1"></canvas></div>
            <div class="col-6"><canvas id="p2"></canvas></div>
        </div>
    </div>
    <div class="">Task per project{{ getTasksPerProject }}</div>
</template>

<script>
import { mapGetters } from 'vuex'
// import Chart from 'chart.js/auto'
export default {
    data() {
        return {
            data: this.getTasksPerProject,
            labels:[],
            completed:[]
        }
    },
    computed:{
        ...mapGetters('worker',['getTasksPerProject'])
    },
    // mounted() {
    //     console.log(this.getTasksPerProject)
    //     new Chart(
    //         document.getElementById('p1'),
    //         {
    //             type: 'bar',
    //             options: {
    //                 animation: true,
    //                 plugins: {
    //                     legend: {
    //                         display: false
    //                     },
    //                     tooltip: {
    //                         enabled: false
    //                     }
    //                 }
    //             },
    //             data: {
    //                 labels: this.data.map(project => project.key),
    //                 datasets: [
    //                     {
    //                         label: 'Acquisitions by year',
    //                         data: this.data.map(project => project.completed.length)
    //                     }
    //                 ]
    //             }
    //         }
    //     );
    // },
    methods:{

        setGraphProps(){
            for(let key in this.data){
                this.labels.push(key),
                this.completed.push(this.data[key]["completed"].length);
            }
            console.log(this.labels)
            console.log(this.completed)
        }
    },
        mounted(){
            console.log("porjects",this.getTasksPerProject)
    
        }
}
</script>


<style scoped></style>
