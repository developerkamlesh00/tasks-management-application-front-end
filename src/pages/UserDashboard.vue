<template>
    <div>
        <h2>Welcome User</h2>
        <component :is="user_type+'Dashboard'"></component>
    </div>
</template>
<script>
import AdminDashboard from './Dashboards/AdminDashboard.vue';
import DirectorDashboard from './Dashboards/DirectorDashboard.vue';
import ManagerDashboard from './Dashboards/ManagerDashboard.vue';
import WorkerDashboard from './Dashboards/WorkerDashboard.vue';
export default {
    props:['user_type'],
    components:{
        AdminDashboard,
        DirectorDashboard,
        ManagerDashboard,
        WorkerDashboard
    }
}
</script>