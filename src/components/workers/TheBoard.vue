<template>
    <div :id="id" class="board" :style="{'backgroundColor':getBGColor()}" @dragover.prevent @drop.prevent="drop">
        <slot name="header"></slot>
        <div class="tasks">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    props: ['id'],
    methods: {
        ...mapActions('worker',['updateTaskStatus']),
        drop(e){
            const card_id = e.dataTransfer.getData('card_id');
            const card = document.getElementById(card_id);
            card.style.display = "block";
            e.target.appendChild(card);
            const task_id=parseInt(card_id.split('-')[1])
            const board_id=parseInt(e.target.id.split('-')[1])
            const payload={"task_id":task_id,"status_id":board_id}
            this.updateTaskStatus(payload)
            
        },
        getBGColor(){
            const boardColor = localStorage.getItem('boardColor')||'#313131';
            return boardColor;
        }
    }
}
</script>


<style scoped>
.board {
    display: flex;
    flex-direction: column;
    white-space: normal;
    /* width: 100%; */
    margin: 2px 10px;
    width: 350px;
    min-width: 200px;
    padding: 15px;
    border-radius: 15px;
}
.tasks{
    padding-top: 50px;
}
</style>