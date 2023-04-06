
<template>
    <div
    :id="id"
    class="card"
    :draggable="draggable"
    @dragstart="dragStart"
    @dragend="dragEnd"
    @dragend="dragEnd"
    @dragover.stop>
    <slot></slot>

</div>

</template>


<script>
export default{
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