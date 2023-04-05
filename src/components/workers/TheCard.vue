<template>
    <div
    :id="id"
    class="card"
    :draggable="draggable"
    @dragstart="dragStart"
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
            // console.log(target.id)
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