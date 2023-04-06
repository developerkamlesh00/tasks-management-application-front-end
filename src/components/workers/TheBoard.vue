<template>
    <div :id="id" class="board" @dragover.prevent @drop.prevent="drop">
        <slot></slot>
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
    background-color: #313131;
    padding: 15px;
    padding-bottom: 150px;
    border-radius: 15px;
}
</style>