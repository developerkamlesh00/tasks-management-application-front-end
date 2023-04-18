<template>

       
    <div class="container p-3"> 
    <div v-if="showTasks" class="d-flex justify-content-end">
        <button class="btn btn-danger px-2 btn-sm" @click="showTasks=false"><i class="bi bi-x-circle-fill"></i> Hide Tasks</button>
    </div>
    <div>
        <BaseSpinner v-if="isLoading"/>
        <div v-else >
            <ProjectTasks v-if="showTasks"/>
        </div>
    </div>
    <table class="table table-hover table-bordered border-dark text-center" style="background-color: transparent;">
        <thead>
            <tr> 
                <th>ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Manager</th>
                <th>View</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="project in getProjects" :key="project.id">
                <td>{{ project.id }}</td>
                <td>{{ project.title }}</td>
                <td>{{ project.description.slice(0,10) }}...</td>
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
import ProjectTasks from '../../components/workers/ProjectTasks.vue'
import BaseSpinner from '../../components/ui/BaseSpinner.vue'
export default{
    data(){
        return{
            showTasks:false,
            isLoading:false,
        }
    },
    components:{
        ProjectTasks,
        BaseSpinner
    },
    methods:{
        ...mapActions('worker',['fetchWorkerProjects']),
        ...mapActions('worker',['fetchProjectAllTasks']),
        ...mapActions('worker',['fetchProjectWorkerTasks']),
        async fetchProjectTasks(id){
            this.isLoading=true;
            // Getting which project was clicked
            const project=this.getProjects.find((p)=>p.id===id);
            
            // Getting all tasks/ only worker tasked  based on the worker's privelege to view all tasks or not
            if(project.workers_visibility===1){
               await this.fetchProjectAllTasks({'project_id':id});
            }else{
               await this.fetchProjectWorkerTasks({'project_id':id});
            }
            this.showTasks=true;
            this.isLoading=false;
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