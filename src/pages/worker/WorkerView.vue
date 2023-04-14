<template>
    <div class="d-flex justify-content-end">
        <button class="btn btn-primary px-2" @click="fetchWorkerTasks({ isFirstRequest: false })"><i class="bi bi-arrow-clockwise"></i> Refresh</button>
    </div>
    <div class="row">
        <base-card class="my-1 py-4 col-2 leftCard">
            <base-button class="mb-2  rounded-4 navcards" link to="/worker/dashboard">Kanban
            </base-button>
            <base-button class="mb-2  rounded-4 navcards" link to="/worker/tasks">Tasks
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
            <base-card class="m-0 my-1 p-0 ms-2 mw-100 rightCard">

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

/* a:hover,
a:focus {
    background-color: #d2f4ea;
} */

/* body {
    background-color: #f3f3f3;
} */

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

.leftCard{
    background-image: linear-gradient(
  135deg,
  hsl(311deg 100% 86%) 0%,
  hsl(311deg 100% 88%) 9%,
  hsl(311deg 100% 90%) 19%,
  hsl(311deg 100% 91%) 31%,
  hsl(311deg 100% 93%) 45%,
  hsl(311deg 100% 94%) 59%,
  hsl(311deg 100% 96%) 73%,
  hsl(311deg 100% 97%) 84%,
  hsl(311deg 100% 99%) 93%,
  hsl(0deg 0% 100%) 100%
);
}
.rightCard{
    background-image: linear-gradient(
  135deg,
  hsl(278deg 100% 88%) 0%,
  hsl(278deg 100% 88%) 5%,
  hsl(278deg 100% 89%) 11%,
  hsl(278deg 100% 90%) 16%,
  hsl(278deg 100% 90%) 21%,
  hsl(278deg 100% 91%) 26%,
  hsl(279deg 100% 92%) 32%,
  hsl(279deg 100% 92%) 37%,
  hsl(279deg 100% 93%) 42%,
  hsl(279deg 100% 94%) 47%,
  hsl(279deg 100% 94%) 53%,
  hsl(279deg 100% 95%) 58%,
  hsl(279deg 100% 96%) 63%,
  hsl(280deg 100% 96%) 68%,
  hsl(280deg 100% 97%) 74%,
  hsl(280deg 100% 97%) 79%,
  hsl(280deg 100% 98%) 84%,
  hsl(280deg 100% 99%) 89%,
  hsl(280deg 100% 99%) 95%,
  hsl(0deg 0% 100%) 100%
);
}
.navcards:hover{
    background-color: rgb(250, 182, 255);
    color:blueviolet;
}
.navcards{
    font-size: 1rem;
    font-weight: 600;

}
</style>
