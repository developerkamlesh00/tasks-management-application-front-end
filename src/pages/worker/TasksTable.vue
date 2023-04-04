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
        <table class="table  table-hover table-striped table-bordered border-dark">
            <tr class="table-primary">
                <th>ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Assigned</th>
                <th>Deadline</th>
                <th>Status</th>
                <th>Change Status</th>
            </tr>
            <tr class="table-primary" v-for="task in getTasks" :key="task.id">
                <td>{{ task.id }}</td>
                <td>{{ task.title }}</td>
                <td>{{ task.description.slice(0,20) }}...</td>
                <td>{{ task.assigned_at }}</td>
                <td>{{ task.estimated_deadline }}</td>
                <td>{{ task.status_id==1?'ToDo':task.status_id==2?'Doing':task.status_id==3?'Under Review':'Completed' }}</td>
                <td>
                    <select name="change_status" id="change_status" @change="changeStatus($event,task.id)">
                        <option :value="i" v-for="i in 4" :key="i" :disabled="i==4" :selected="task.status_id==i">{{ i===1?'ToDo':i==2?'Doing':i==3?'Under Review':'Completed' }}</option>
                    </select>
                </td>
            </tr>
        </table>
    </div>
    
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    data() {
        return {
            tasks: [],
            completed:undefined,
            total:undefined,
            overdue:undefined,
        }
    },
    methods: {
        ...mapActions('worker', ['fetchWorkerTasks','updateTaskStatus']),
        changeStatus(e,task_id){
            console.log(e.target.value,task_id)
            const payload={
                "status_id":e.target.value,
                "task_id":task_id
            }
            this.updateTaskStatus(payload);
        }

        // ...mapActions(['fetchTasks'])
    },
    computed: {
        ...mapGetters('worker', ['getTasks']),
        totalTasks(){
            return this.tasks?this.tasks.length:0;
        },
        completedTasks(){
            if (this.tasks!==[]){
            const tasks=[...this.tasks];
                const completed=tasks.filter((t)=>t.status_id==4);
                return completed?completed.length:0
            }else{
                return 0;
            }
        }
    },
    mounted() {
        this.fetchWorkerTasks();
        console.log('Tasks',this.getTasks)
        this.tasks=this.getTasks
        console.log('data',this.getTasks)
        // this.tasks = await this.fetchWorkerTasks();
    }
    // methods:{
    //     ...mapActions(['fetchTasks'])
    // }

}

</script>


<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    background-color: #f3f3f3;
}

</style>
