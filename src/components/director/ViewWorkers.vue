<template>
    <view-workers :worker="workerApi()"></view-workers>
</template>

<script>
import ViewWorkers from "./ViewWorkersAll.vue";
export default{
    components: {
    ViewWorkers,
    },
    computed:{
    },
    methods:{
        workerApi(){
            let org = this.$store.getters.organization;
            return "http://127.0.0.1:8000/api/director/workers/"+org;
        }
    }
}

</script>