<template>
    <h2 class="header">Projects Summary</h2><br>
    <div class="graph">
        <div style="text-align: right; float: right;">
            <table>
                <tr>
                    <td class="red"></td>
                    <td>Low Level Work Done</td>
                    <td class="yellow"></td>
                    <td>Moderate Level Work Done</td>
                    <td class="green"></td>
                    <td>High Level Work Done</td>
                </tr>
            </table><br>
        </div>
        <canvas id="myChart1" width="400" height="300"></canvas><br><br><hr><br>
        <h3 style="text-align: center">Manager Assigned Projects Summary</h3><br>
        <canvas id="myChart2" width="400" height="300"></canvas><br>
        <table>
            <tr>
                <td class="red"></td>
                <td> High Level Load</td>
                <td class="yellow"></td>
                <td>Moderate Level Load</td>
                <td class="green"></td>
                <td>Low Level Load</td>
            </tr>
        </table>
    </div>
</template>
<script>
import axios from 'axios';
import { Chart, CategoryScale, LinearScale, BarController, BarElement } from 'chart.js';
Chart.register(CategoryScale, LinearScale, BarController, BarElement);
export default {
    data() {
        return{
            error :null,
            projects:[],
            managerslist: [],
        }
    },
    methods:{
        async loadProject() {
            let org = await this.$store.getters.organization;
            console.log(org);
            await axios
                .get("http://localhost:8000/api/director/projects/" + org)
                .then((response) => {
                this.projects = response.data;
            })
            .catch((err) => {
                console.log(err);
            });
        },
    },
    async mounted(){
        await this.loadProject();
        const ctx = document.getElementById('myChart1');
        let projects = JSON.parse(JSON.stringify(this.projects));
        console.log(projects[0].user.name);
        // console.log(projects);
        let ProjectLabels = [];
        let ProjectData = [];
        let backgroundColor = [];
        let BorderColor = [];
        let ProjectArray = [];
        projects.forEach(project => {
            ProjectLabels.push(project['title'].slice(0,40));
            ProjectData.push(project['tasks_completed'] / project['total_tasks'] * 100 || 0);
            let Color = 'rgba(255, 99, 132, 0.2)';  //red
            let borderColor = 'rgba(255, 99, 132, 1)'; //red border
            let percentage = ProjectData.slice(-1)[0];
            if(percentage < 30){
                Color = 'rgba(255, 99, 132, 0.2)';  //red
                borderColor = 'rgba(255, 99, 132, 1)'; //red border
            }else if(percentage < 60){
                Color = 'rgba(255, 205, 86, 0.2)'; //yellowish
                borderColor= 'rgba(255, 205, 86, 1)'; //yellowish border
            }else{
                Color = 'rgba(75, 192, 192, 0.2)'; //green
                borderColor= 'rgba(75, 192, 192, 1)'; // green
            }
            backgroundColor.push(Color);
            BorderColor.push(borderColor);
            ProjectArray.push( { id : project['user'].id , name : project['user'].name });
        });
        // console.log(ProjectLabels);
        // console.log(ProjectData);
        const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ProjectLabels,//['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{
                label: 'projects summary',
                data: ProjectData,//[12, 19, 3, 5, 2, 3],
                backgroundColor : backgroundColor,//'rgba(54, 162, 235, 0.2)',
                borderColor: BorderColor,//'rgba(54, 162, 235, 1)',
                borderWidth: 1
                }]
            },
            options: {
                scales: {
                x: {
                    type: 'category'
                },
                y: {
                    ticks: {
                    beginAtZero: true
                    }
                }
                }
            }
        });
        console.log(myChart);
        //Managers Summary Code
        const data = ProjectArray
        const counts = {};
        const names = {};
        for (let i = 0; i < data.length; i++) {
        const id = data[i].id;
        if (counts[id]) {
            counts[id]++;
        } else {
            counts[id] = 1;
            names[id] = (data[i].name);
        }
        }
        console.log(counts);
        console.log(names);
        const totalProject=Object.values(counts);  //convert object into array
        const managerName=Object.values(names);  //convert object into array
        const backgroundColorProject = [];
        const BorderColorProject = [];
        let sumProjects = 0;
        totalProject.forEach(project => {
            sumProjects += project;
        });
        console.log(sumProjects);
        totalProject.forEach( projectCount =>{
            console.log("Total Done : "+ projectCount);
            let count  = (projectCount / sumProjects * 100 || 0 );
            console.log(count);
            let Color = 'rgba(75, 192, 192, 0.2)'; //green
            let borderColor = 'rgba(75, 192, 192, 1)'; //green border
            if(count >= 30){
                Color = 'rgba(255, 99, 132, 0.2)'; //red if above project workload  30%
                borderColor = 'rgba(255, 99, 132, 1)'; // red border
            }else if(count >= 20){
                Color = 'rgba(255, 205, 86, 0.2)'; //yellowish  if above project workload  20%
                borderColor= 'rgba(255, 205, 86, 1)'; //yellowish border
            }else{
                Color = 'rgba(75, 192, 192, 0.2)'; //green
                borderColor = 'rgba(75, 192, 192, 1)'; //green border
            }
            backgroundColorProject.push(Color);
            BorderColorProject.push(borderColor);
        })
        const ctx1 = document.getElementById('myChart2');
        const myChart2 = new Chart(ctx1, {
            type: 'bar',
            data: {
                labels: managerName,
                datasets: [{
                label: '# of Votes',
                data: totalProject,
                backgroundColor : backgroundColorProject,
                borderColor: BorderColorProject,
                borderWidth: 1
                }]
            },
            options: {
                scales: {
                x: {
                    type: 'category'
                },
                y: {
                    ticks: {
                    beginAtZero: true
                    }
                }
                }
            }
        });
        console.log(myChart2);
    }
}
</script>

<style scoped>

.graph{
    padding: 4rem;
}
.header {
    font-size: 2rem;
    font-weight: bold;
    padding-top: 15px;
    margin-bottom: 10px;
    color: #333;
    text-align: center;
}
table{
    border-collapse: collapse;
}
td{    
    padding:10px;
    border:none;
}
.red{
    background-color:rgba(255, 99, 132, 0.2);
}
.yellow{
    background-color:rgba(255, 205, 86, 0.2)
}
.orange{
    background-color:#F58326;
}
.green{
    background-color: rgba(75, 192, 192, 0.2);
}
</style>