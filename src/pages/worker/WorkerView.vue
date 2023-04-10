<template>
    <div class="row">
        <button @click="fetchWorkerTasks({ isFirstRequest: false })">Refresh</button>
    </div>
    <div class="row">
        <base-card class="m-0 col-2">
            <base-button class="mb-2 " link to="/worker/dashboard">Kanban
            </base-button>
            <base-button class="mb-2 " link to="/worker/tasks">Tasks
            </base-button>
            <base-button class="" link to="/worker/progress">Summary
            </base-button>
        </base-card>
        <div class="col-10">
            <base-card class="m-0 ms-2 mw-100">
                    <router-view v-slot="{ Component }">
                        <component :is="Component"></component>
                    </router-view>
            </base-card>
        </div>

    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import BaseCard from '../../components/ui/BaseCard.vue';
import BaseButton from '../../components/ui/BaseButton.vue';

export default {
    components: {
        BaseCard,
        BaseButton
    },
    data() {
        return {
        }
    },
    methods: {
        ...mapActions('worker', ['fetchWorkerTasks']),
    },
    computed: {
        ...mapGetters('worker', ['getTasks'])
    },
    created() {
        this.$store.dispatch('worker/fetchWorkerTasks',{ isFirstRequest: true });

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
}
</style>
