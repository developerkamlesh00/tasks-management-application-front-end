<template>
    <!-- For alert messages -->
    <div class="alert alert-warning alert-dismissible fade show" v-if="showMessage" role="alert">
        <p class="p-2">{{ message }}</p>
        <button type="button" class="btn-close" @click="unsetMessage()" aria-label="Close"></button>
    </div>
    <!-- For syncing the page -->
    <div class="d-flex justify-content-end">
        <button class="btn btn-primary px-2" @click="fetchItems()"><i
                class="bi bi-arrow-clockwise"></i> Refresh</button>
    </div>
    <div class="row">
        <base-card class="my-1 py-4 col-2 card1">
            <base-button class="mb-2 rounded-4 navcards" link to="/worker/dashboard">Kanban
            </base-button>
            <base-button class="mb-2 rounded-4 navcards" link to="/worker/tasks">Tasks
            </base-button>
            <base-button class="mb-2 rounded-4 navcards" link to="/worker/progress">Summary
            </base-button>
            <base-button class="mb-2 rounded-4 navcards" link to="/worker/projects">Projects
            </base-button>
            <base-button class="mb-2 rounded-4 navcards" link to="/worker/mymanagers">My Managers
            </base-button>
            <base-button class=" rounded-4 navcards" link to="/worker/settings">Settings
            </base-button>
        </base-card>

        <div class="col-10">
            <base-card class="m-0 my-1 p-0 ms-2 mw-100 card2">
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
import BaseSpinner from '../../components/ui/BaseSpinner.vue';

export default {
    components: {
        BaseCard,
        BaseButton,
        BaseSpinner
    },
    methods: {
        ...mapActions('worker', ['fetchWorkerTasks', 'fetchWorkerProjects','unsetMessage']),
        fetchItems(){
            this.fetchWorkerTasks({isFirstRequest:true})
            this.fetchWorkerProjects()
        }
    },
    computed: {
        ...mapGetters('worker', ['getTasks', 'showMessage', 'message'])
    },
    created() {
        this.$store.dispatch('worker/fetchWorkerTasks', { isFirstRequest: true });
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

.scrolls {
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
}

.flexbox {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    padding: 10px;
}

.flexbox .board {
    display: flex;
    flex-direction: column;
    white-space: normal;
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
.navcards:hover {
    background-color: rgb(250, 182, 255);
    color: blueviolet;
}
.navcards {
    font-size: 1rem;
    font-weight: 600;
}
</style>
