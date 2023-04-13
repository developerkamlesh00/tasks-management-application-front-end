<template>
    <h2 style="text-align:center">User Profile Card</h2>
    <!-- ! this.managers.find((m)=>m.id===project.user.id -->
    <div class="row">
        <div class="col-sm-6 col-lg-3 mb-2" v-for="(manager, index) in managers" :key="index">
            <div class="card">
                <h1 class="d-inline">{{ manager.name }}</h1>
                <img src="../../assets/user_profile.png" alt="John">
                <!-- <p class="title" v-for="(project,index) in manager" :key="index">{{ project }}</p> -->
                <p>ID: {{ manager.id }}</p>
                <p><a target="_blank" :href="'mailto:' + manager.email"><button>Contact</button></a></p>
            </div>


        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    data() {
        return {
            managers: [],
        }

    },
    computed: {
        ...mapGetters('worker', ['getProjects']),
    },
    methods: {
        ...mapActions('worker', ['fetchWorkerProjects']),
        getManagers() {
            for (let project of this.getProjects) {
                const manager = this.managers.includes(project.user)
                console.log(manager)
                if (!manager) {
                    console.log(project)
                    project.user           // this.managers.push([project.user,[project.title]])
                    this.managers.push(project.user)
                } else {
                    // manager[1].push(project.name)
                }
            }
            console.log(this.managers, 'Managers')
            return this.managers;
        }
    },
    async mounted() {
        await this.fetchWorkerProjects();
        this.getManagers()
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

.title {
    color: grey;
    font-size: 16px;
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
    opacity: 0.7;
}
</style>