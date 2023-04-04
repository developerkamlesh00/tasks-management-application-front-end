<template>
    <div class="col-11">
        <h2>Your are a <span>Worker</span></h2>
        <div class="row center">
            <div class="col-4">
                <span class="row">Total Tasks Assigned</span>
                <!-- <span class="row">{{ totalTasks }}</span> -->
            </div>
            <div class="col-4">
                <span class="row">Tasks Completed</span>
                <!-- <span class="row">{{ completedTasks }}</span> -->
            </div>
            <div class="col-4">
                <span class="row">Tasks Overdue</span>
                <!-- <span class="row">{{ overdue }}</span> -->
            </div>
        </div>
        <div class="row">
            <div class="col-6"><canvas id="p1"></canvas></div>
            <div class="col-6"><canvas id="p2"></canvas></div>
        </div>
    </div>
</template>

<script>
import Chart from 'chart.js/auto'
export default {
    data() {
        return {
            data: [
                { year: 2010, count: 10 },
                { year: 2011, count: 20 },
                { year: 2012, count: 15 },
                { year: 2013, count: 25 },
                { year: 2014, count: 22 },
                { year: 2015, count: 30 },
                { year: 2016, count: 28 },
            ]
        }
    },
    mounted() {
        new Chart(
            document.getElementById('p1'),
            {
                type: 'bar',
                options: {
                    animation: false,
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            enabled: false
                        }
                    }
                },
                data: {
                    labels: this.data.map(row => row.year),
                    datasets: [
                        {
                            label: 'Acquisitions by year',
                            data: this.data.map(row => row.count)
                        }
                    ]
                }
            }
        );
        new Chart(
            document.getElementById('p2'),
            {
                type: 'bar',
                options: {
                    animation: false,
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            enabled: false
                        }
                    }
                },
                data: {
                    labels: this.data.map(row => row.year),
                    datasets: [
                        {
                            label: 'Acquisitions by year',
                            data: this.data.map(row => row.count)
                        }
                    ]
                }
            }
        );
    }
}
</script>


<style scoped></style>
