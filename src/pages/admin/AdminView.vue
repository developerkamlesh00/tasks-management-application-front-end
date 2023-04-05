<template>
    <div class="row">
        <side-bar></side-bar>
        <component :is="AdminDashboard"></component>
    </div>
</template>

<script>
import AdminDashboard from './AdminDashboard.vue';
export default {
    components: {
        AdminDashboard,
    },
    data() {
        return {
            AdminDashboard:"AdminDashboard"
        }
    },
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
}
</style>
