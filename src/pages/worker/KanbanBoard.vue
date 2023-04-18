<template>
    <main class="flexbox scrolls" @dragover.prevent @drop.prevent="drop">
        <the-board v-for="board, index in getBoards" :id="'board-' + board.id" :key="index">
            <template v-slot:header>
                <h2 class="text-light text-center">{{ board.name }} <h6>Board id: {{ board.id }}</h6>
                </h2>
            </template>
            <the-card v-for="task in getBoardTasks(board.id)" class="card mb-3 p-0" :key="task.id" :id="'card-' + task.id"
                :draggable="board.id !== 3 && board.id !== 4" @drop.prevent="drop(board.id)">
                <div class="card-header text-center">Task ID: <strong class="text-warning">#{{ task.id }}</strong></div>
                <div class="card-body">
                    <h6 class="card-title">{{ task.title }}</h6>
                    <i class="card-text font-weight-lighter font-italic">{{ task.description.slice(0, 20)
                    }}.....</i>
                    <span class="d-flex justify-content-end">
                        <router-link class="btn btn-warning rounded-4 px-2 py-0 btn-sm text-primary text-decoration-none"
                            :to="{ name: 'task_detail', params: { 'id': task.id } }"><i
                                class="bi bi-eye-fill"></i></router-link>
                    </span>
                </div>
            </the-card>
        </the-board>
    </main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import TheBoard from '../../components/workers/TheBoard.vue';
import TheCard from '../../components/workers/TheCard.vue';
// import drop from '../../components/workers/utils.js'
export default {
    components: {
        TheBoard,
        TheCard,
    },
    data() {
        return {
            board_name: ""
        }
    },
    methods: {
        ...mapActions('worker', ['fetchWorkerTasks']),
        // drop,
        drop(e, board_id = null) {
            if (!board_id || board_id != 4) {
                const card_id = e.dataTransfer.getData('card_id');
                const card = document.getElementById(card_id);
                card.style.display = "block";
            }

        },
        getBoardTasks(id) {
            if (this.getTasks.length > 0) {
                const board_tasks = [...this.getTasks];
                return board_tasks.filter(task => task.status_id === id)
            }
            return []
        },
    },
    computed: {
        ...mapGetters('worker', ['getTasks', 'getBoards'])
    },
}

</script>


<style scoped>
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
}
</style>
