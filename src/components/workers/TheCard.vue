<template>
    <div
    :id="id"
    class="card"
    :draggable="draggable"
    @dragstart="dragStart"
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
        }
    }
}
</script>