<template>
    <div class="container my-2 mx-1">
    <div v-if="showTasks" class="d-flex justify-content-end">
        <button class="btn btn-danger px-2 btn-sm" @click="showTasks=false"><i class="bi bi-x-circle-fill"></i> Hide Tasks</button>
    </div>
    <ProjectTasks v-if="showTasks"/>
    <table class="table table-hover table-bordered border-dark text-center" style="background-color: transparent;">
        <thead>
            <tr> 
                <th>ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Progress</th>
                <th>Manager</th>
                <th>View</th>
            </tr>
        </thead>
        <tbody>

            <tr v-for="project in getProjects" :key="project.id">
                <!-- {{ project }} -->
                <td>{{ project.id }}</td>
                <td>{{ project.title }}</td>
                <td>{{ project.description.slice(0,10) }}...</td>
                <td>{{ project.tasks_completed }}/{{ project.total_tasks }}</td>
                <td>{{ project.user.name }}</td>
                <td><button @click="fetchProjectTasks(project.id)" class="btn btn-sm" :class="project.workers_visibility?'btn-warning':'btn-info'">{{ project.workers_visibility?'All':'My tasks' }}
                </button></td>        
            </tr>
            
            
        </tbody>
    </table>
    
        
</div>
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

<style scoped>
.container{
    overflow: auto;
  white-space: nowrap;
}
</style>