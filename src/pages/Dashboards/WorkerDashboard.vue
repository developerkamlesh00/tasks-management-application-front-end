<template>
    <h2>Your are a <span>Worker</span></h2>
    <div class="flexbox">
        <main class="flexbox" @dragover.prevent @drop.prevent="drop">
            <the-board id="board-1">
                <h2 class="text-light">To Do</h2>
                <the-card v-for="(task, index) in tasks" class="card text-bg-primary mb-3 p-0" :key="index"
                    :id="'card-' + index" draggable="true">
                    <div class="card-header">Task id: {{ task.id }}</div>
                    <div class="card-body">
                        <h5 class="card-title">{{ task.title }}</h5>
                        <p class="card-text">{{ task.completed }}</p>
                    </div>
                </the-card>
            </the-board>
            <the-board id="board-2">
                <h2 class="text-light">Doing</h2>
                <the-card id="card-211" draggable="true">
                    <p>Card 2</p>
                </the-card>
            </the-board>
            <the-board id="board-2">
                <h2 class="text-light">Under Review</h2>
                <the-card id="card-311" draggable="true">
                    <p>Card 2</p>
                </the-card>
            </the-board>
            <the-board id="board-2">
                <h2 class="text-light">Completed</h2>
                <the-card id="card-411" draggable="true">
                    <p>Card 2</p>
                </the-card>
            </the-board>
        </main>
        <button  class="btn btn-primary h-25" @click="createNewBoard()">+ Add board</button>
    </div>
</template>

<script>
// import { mapActions } from 'vuex'
import tasks from '../../store/tasks.js'
import TheBoard from '../../components/workers/TheBoard.vue'
import TheCard from '../../components/workers/TheCard.vue'
export default {
    components: {
        TheBoard,
        TheCard
    },
    data() {
        return {
            tasks: tasks,
        }
    },
    methods: {
        drop: e => {
            const card_id = e.dataTransfer.getData('card_id');
            const card = document.getElementById(card_id);
            card.style.display = "block";
            
        },
        createNewBoard(){
            
        }
    }
    // methods:{
    //     ...mapActions(['fetchTasks'])
    // }

}

</script>


<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    background-color: #f3f3f3;
}

.flexbox {
    display: flex;
    justify-content: space-between;

    width: 100%;
    height: 100%;

    overflow: hidden;


    margin: 0 auto;
    padding: 10px;
}

.flexbox .board {
    display: flex;
    flex-direction: column;

    width: 100%;
    max-width: 300px;
    background-color: #313131;
    padding: 15px;
}

.flexbox .board .card {
    padding: 15px 25px;
    background-color: #f3f3f3;
    cursor: pointer;
    margin-bottom: 15px;
}
</style>
