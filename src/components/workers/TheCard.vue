<template>
    <div :id="id" class="card text-light" :style="{'backgroundColor':getBGColor()}"
    :draggable="draggable"
    @dragstart="dragStart"
    @dragend="dragEnd"
    @dragover.stop>
    <slot></slot>
</div>

</template>


<script>
export default{
    // Cards in review and completed boards are not draggable
    props:['id','draggable'],
    methods:{
        dragStart:e=>{
            const target=e.target;
            e.dataTransfer.setData('card_id',target.id);
            setTimeout(()=>{
                target.style.display="none";
            })
        },
        dragEnd: e => {
      const target = e.target;
      target.style.display = 'block';
    },
    getBGColor(){
            const boardColor = localStorage.getItem('cardColor')||'#007bff';
            return boardColor;
        }
    }
}
</script>

<style scoped>
.card {
    padding: 15px 25px;
    background-color: #f3f3f3;
    cursor: pointer;
    margin-bottom: 15px;
    white-space: normal;
}
</style>