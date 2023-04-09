<template>

    <!-- Create new Board -->
    <div class="container">
        <input type="text" class="form-control w-75 d-inline" v-model="board_name" placeholder="Enter Board Name">
        <button class="btn btn-primary w-25 " @click="createNewBoard()">+Add board</button>
    </div>


    <main class="flexbox scrolls" @dragover.prevent @drop.prevent="drop">
        <the-board v-for="board, index in getBoards" :id="'board-' + board.id" :key="index">
            <h2 class="text-light">{{ board.name }} <h6>Board id: {{ board.id }}</h6>
            </h2>
            <the-card v-for="task in getBoardTasks(board.id)" class="card text-bg-primary mb-3 p-0" :key="task.id"
                :id="'card-' + task.id" :draggable="board.id !== 3 && board.id !== 4" @drop.prevent="drop">
                <div class="card-header">Task id: {{ task.id }}</div>
                <div class="card-body">
                    <h6 class="card-title">{{ task.title }}</h6>
                    <small class="card-text font-weight-lighter font-italic">{{ task.description.slice(0, 20)
                    }}...</small>
                    <router-link class="btn btn-light btn-sm text-dark text-decoration-none"
                        to="/worker/task/task.id">View</router-link>
                </div>
            </the-card>
        </the-board>
    </main>

</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import TheBoard from '../../components/workers/TheBoard.vue';
import TheCard from '../../components/workers/TheCard.vue';
import drop from '../../components/workers/utils.js'
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
        drop,
        createNewBoard() {
            if (this.board_name !== "") {
                this.addBoard(this.board_name)
                console.log('New board added!')
                this.boards = this.getBoards
            } else {
                alert('Board Name cannot be empty')
            }

        },
        getBoardTasks(id) {
            if ( this.getTasks.length > 0) {
                const board_tasks = [...this.getTasks];
                return board_tasks.filter(task => task.status_id === id)
            }
            // console.log(id)
            return []
        },
        ...mapActions('worker', ['addBoard', 'fetchWorkerTasks'])
        // ...mapActions(['fetchTasks'])
    },
    computed: {
        ...mapGetters('worker', ['getTasks', 'getBoards'])
    },


}

</script>


<style>
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
    /* overflow: hidden; */


    margin: 0 auto;
}
</style>
