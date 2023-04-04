<template>
    <div class="row">
        <button @click="fetchWorkerTasks()">Fetch Tasks</button>
    </div>
    <div class="row">
        <side-bar
            profile_url="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png">
            <template v-slot:default>
                <li class="nav-item">
                    <a href="#" class="nav-link active" aria-current="page">
                        <i class="bi bi-house-door"></i>
                        Home
                    </a>
                </li>
                <li>
                    <a href="#" class="nav-link link-dark">
                        <i class="bi bi-speedometer2"></i>
                        Dashboard
                    </a>
                </li>
                <li>
                    <a href="#" class="nav-link link-dark">
                        <i class="bi bi-table"></i>
                        Orders
                    </a>
                </li>
                <li>
                    <a href="#" class="nav-link link-dark">
                        <i class="bi bi-speedometer2"></i>
                        Products
                    </a>
                </li>
                <li>
                    <a href="#" class="nav-link link-dark">
                        <i class="bi bi-speedometer2"></i>
                        Customers
                    </a>
                </li>
            </template>
            <template v-slot:icons_only>
                <li class="nav-item">
                    <a href="#" class="nav-link active py-3 border-bottom rounded-0" aria-current="page" title="Home"
                        data-bs-toggle="tooltip" data-bs-placement="right">
                        <i class="bi bi-speedometer2"></i>
                    </a>
                </li>
                <li>
                    <a href="#" class="nav-link py-3 border-bottom rounded-0" title="Dashboard" data-bs-toggle="tooltip"
                        data-bs-placement="right">
                        <i class="bi bi-speedometer2"></i>
                    </a>
                </li>
                <li>
                    <a href="#" class="nav-link py-3 border-bottom rounded-0" title="Orders" data-bs-toggle="tooltip"
                        data-bs-placement="right">
                        <i class="bi bi-table"></i>
                    </a>
                </li>
                <li>
                    <a href="#" class="nav-link py-3 border-bottom rounded-0" title="Products" data-bs-toggle="tooltip"
                        data-bs-placement="right">
                        <i class="bi bi-speedometer2"></i>
                    </a>
                </li>
                <li>
                    <a href="#" class="nav-link py-3 border-bottom rounded-0" title="Customers" data-bs-toggle="tooltip"
                        data-bs-placement="right">
                        <i class="bi bi-speedometer2"></i>
                    </a>
                </li>
            </template>
            <template v-slot:additional_links>
                <ul class="dropdown-menu text-small shadow">
                    <li><a class="dropdown-item" href="#">Settings</a></li>
                    <li><a class="dropdown-item" href="#">Profile</a></li>
                    <li>
                        <hr class="dropdown-divider">
                    </li>
                    <li><a class="dropdown-item" href="#">Sign out</a></li>
                </ul>
            </template>
        </side-bar>
        <!-- <component :is="WorkerDashboard"></component> -->
        <router-view></router-view>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import SideBar from '../../components/ui/SideBar.vue';

export default {
    components: {
        SideBar,
    },
    data() {
        return {
            WorkerDashboard: "WorkerDashboard"
        }
    },
    methods:{
    ...mapActions('worker',['fetchWorkerTasks']),
    }
}

</script>


<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}


.nav-link {
  padding: .1875rem .5rem;
  margin-top: .125rem;
  margin-left: 1.25rem;
}

a:hover,
a:focus {
  background-color: #d2f4ea;
}

body {
    background-color: #f3f3f3;
}

.scrolls {
    overflow-x: scroll;
    overflow-y: hidden;
    /* height: 80px; */
    white-space: nowrap;
}

.flexbox {
    display: flex;
    justify-content: space-between;

    width: 100%;
    height: 100%;
    /* overflow: hidden; */


    margin: 0 auto;
    padding: 10px;
}

.flexbox .board {
    display: flex;
    flex-direction: column;
    white-space: normal;
    /* width: 100%; */
    margin: 2px 10px;
    width: 350px;
    background-color: #313131;
    padding: 15px;
}

.flexbox .board .card {
    padding: 15px 25px;
    background-color: #f3f3f3;
    cursor: pointer;
    margin-bottom: 15px;

    white-space: normal;
}</style>
