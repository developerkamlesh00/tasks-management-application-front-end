<template>
    <button v-if="showTasks" @click="showTasks=false">Hide Tasks</button>
    <ProjectTasks v-if="showTasks"/>
    <table class="table table-hover table-bordered border-dark table-success text-center">
        <thead>
            <tr class="table-dark"> 
                <th>ID</th>
                <th>Title</th>
                <th>Desc</th>
                <th>Manager</th>
                <th>Progress</th>
                <th>View Tasks</th>
            </tr>
        </thead>
        <tbody>

            <tr v-for="project in getProjects" :key="project.id">
                <td>{{ project.id }}</td>
                <td>{{ project.title }}</td>
                <td>{{ project.description.slice(0,20) }}...</td>
                <td>{{ project.task_completed }}/{{ project.total_tasks }}</td>
                <td>{{ project.user.name }}</td>
                <td><button @click="fetchProjectTasks(project.id)" class="btn" :class="project.workers_visibility?'btn-warning':'btn-info'">{{ project.workers_visibility?'All':'My tasks' }}
                </button></td>        
            </tr>
            
            
        </tbody>
    </table>
</template>



<script>
import { mapActions, mapGetters } from 'vuex';
import ProjectTasks from './ProjectTasks.vue'
export default{
    data(){
        return{
            showTasks:false,
        }
    },
    components:{
        ProjectTasks,
    },
    methods:{
        ...mapActions('worker',['fetchWorkerProjects']),
        ...mapActions('worker',['fetchProjectAllTasks']),
        ...mapActions('worker',['fetchProjectWorkerTasks']),
        fetchProjectTasks(id){
            const project=this.getProjects.find((p)=>p.id===id);
            if(project.workers_visibility===1){
                this.fetchProjectAllTasks({'project_id':id});
            }else{
                this.fetchProjectWorkerTasks({'project_id':id});
            }
            this.showTasks=true;
        },
    },
    computed:{
        ...mapGetters('worker',['getProjects']),
    },
    mounted(){
        this.fetchWorkerProjects();
    }
}
</script>