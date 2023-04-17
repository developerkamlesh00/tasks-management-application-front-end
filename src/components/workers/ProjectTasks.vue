<template>
    
    <table class="table table-hover table-bordered border-dark">
        <thead>
            <tr class="table-primary">
                <th>ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Worker ID</th>
                <th>Assigned at</th>
                <th>Estimated Deadline</th>
                <th>Progress</th>
                <th>View</th>
            </tr>
        </thead>
        <tbody>
            <tr class="table-info" v-for="task in getProjectTasks" :key="task.id">
                <td>{{ task.id }}</td>
                <td>{{ task.title.slice(0,20) }}</td>
                <td>{{ task.description.slice(0,20) }}....</td>
                <td>{{ task.worker_id }}</td>
                <td>{{ task.assigned_at }}</td>
                <td>{{ task.estimated_deadline }}</td> 
                <td>
                    <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="75" aria-valuemin="0"
                        aria-valuemax="100">
                        <div class="progress-bar progress-bar-striped progress-bar-animated" :class="getStyle(task.status_id)"></div>
                    </div>
                </td>
                <td>
                    <router-link class="btn btn-outline-dark" v-if="task.worker_id==userId" :to="{name:'task_detail',params:{'id':task.id}}">Open</router-link>
                    <span class="btn btn-outline-dark" v-else>Hidden</span>
                </td>
            </tr>
            <tr v-if="getProjectTasks.length == 0">
                <td colspan="8" class="text-center">No Task Found</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default{
    methods:{
        ...mapActions([]),
        getStyle(status_id){
            const width=(status_id)*100/4;
            const bg=['bg-danger','bg-warning','bg-info','bg-success'];
            return `w-${width} ${bg[status_id-1]}`
        },
    },
    computed:{
        ...mapGetters('worker',['getProjectTasks']),
        ...mapGetters(['userId']),
    }
}
</script>