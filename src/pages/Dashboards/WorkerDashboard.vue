<template>
    <h2>Your are a <span>Worker</span></h2>
    <div class="container">
        <input type="text" class="form-control w-75 me-4 d-inline" v-model="board_name">
        <button  class="btn btn-primary w-20" @click="createNewBoard()">+ Add board</button>
    </div>
    <div class="scrolls">
        <main class="flexbox" @dragover.prevent @drop.prevent="drop">
            <the-board v-for="board,index in getBoards" :id="'board-'+board.id" :key="index">

                <h2 class="text-light">{{ board.name }} <h6>Board id: {{ board.id }}</h6></h2>

                <the-card v-for="task in getBoardTasks(board.id)" class="card text-bg-primary mb-3 p-0" :key="task.id"
                    :id="'card-' + task.id" :draggable="board.id!==3 && board.id!==4" @drop.prevent="drop">
                    <div class="card-header">Task id: {{ task.id }}</div>
                    <div class="card-body">
                        <h5 class="card-title">{{ task.title }}</h5>
                        <p class="card-text">{{ task.completed }}</p>
                    </div>
                </the-card>

            </the-board>
        </main>

    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import TheBoard from '../../components/workers/TheBoard.vue';
import TheCard from '../../components/workers/TheCard.vue';
import drop from '../../components/workers/utils.js'
export default {
    components: {
        TheBoard,
        TheCard
    },
    data() {
        return {
            tasks: [],
            board_name:""
        
        }
    },
    methods: {
        drop,
        createNewBoard(){
            if (this.board_name!==""){
                this.addBoard(this.board_name)
                console.log('new board added!')
                this.boards=this.getBoards
            }else{
                alert('Board Name cannot be empty')
            }
            
        },
        getBoardTasks(id){
            const board_tasks=[...this.tasks];
            return board_tasks.filter(task=>task.status_id===id)
        },
        ...mapActions('worker',['addBoard'])
        // ...mapActions(['fetchTasks'])
    },
    computed:{
        ...mapGetters('worker',['getTasks','getBoards'])
    },
    mounted(){
        this.tasks=this.getTasks;
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

.scrolls {
    overflow-x: scroll;
    overflow-y: hidden;
    /* height: 80px; */
    white-space:nowrap;
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
    white-space:normal;
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
    
    white-space:normal;
}
</style>
