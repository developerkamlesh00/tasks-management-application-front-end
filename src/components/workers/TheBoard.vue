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
            console.log(parseInt(card_id.split('-')[1]))
            const task_id=parseInt(card_id.split('-')[1])
            console.log(parseInt(e.target.id.split('-')[1]))
            const board_id=parseInt(e.target.id.split('-')[1])
            console.log({task_id,board_id})
            this.updateTaskStatus({task_id,board_id})
            
        }
    }
}
</script>