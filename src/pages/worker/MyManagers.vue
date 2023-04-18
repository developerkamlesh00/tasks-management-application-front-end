<template>
    <div class="container p-5">
        <h2 style="text-align:center">My Project Managers</h2>
        <BaseSpinner v-if="isLoading"/>
        <div v-else >
        <div class="row">
            <div class="col-sm-6 col-lg-3 mb-2" v-for="(manager, index) in managers" :key="index">
                <div class="card blue">
                    <h6 class="mt-3 text-light fw-bolder">{{ manager.name }}</h6>
                    <img src="../../assets/manager_pic.png" style="border-radius:50%" class="mx-4" alt="Manager">
                    <p>ID: {{ manager.id }}</p>
                    <p><a target="_blank" :href="'mailto:' + manager.email"><button>Contact</button></a></p>
                </div>    
            </div>
        </div>
        </div>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import BaseSpinner from '../../components/ui/BaseSpinner.vue'
export default {
    data() {
        return {
            managers: [],
            isLoading:false,
        }
    },
    components:{
        BaseSpinner,
    },
    computed: {
        ...mapGetters('worker', ['getProjects']),
    },
    methods: {
        ...mapActions('worker', ['fetchWorkerProjects']),
        getManagers() {
            for (let project of this.getProjects) {
                let present=false;
                for(let manager of this.managers){
                    if(project.user.id===manager.id){
                        present=true;
                    }
                }
                if(!present){
                    this.managers.push(project.user)
                }
            }            
            return this.managers;
        },
    },

     async mounted() {
        this.isLoading=true;
        await this.fetchWorkerProjects();
        this.getManagers()
        this.isLoading=false;
    }
}
</script>

<style scoped>
.card {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    margin: auto;
    text-align: center;
    font-family: arial;
}

button {
    border: none;
    outline: 0;
    display: inline-block;
    padding: 8px;
    color: white;
    background-color: #000;
    text-align: center;
    cursor: pointer;
    width: 100%;
    font-size: 16px;
}

button:hover,
a:hover {
    background-color: #ff00ff;
}
</style>