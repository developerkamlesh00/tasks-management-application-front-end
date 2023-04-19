<template>
    <div>
        <view-managers :manager="managerApi()"></view-managers>
    </div>
</template>
<script>
import ViewManagers from "./ViewManagersAll.vue";

export default{
    components:{
        ViewManagers,
    },
    methods:{
        managerApi(){
            let org = this.$store.getters.organization;
            return "http://127.0.0.1:8000/api/director/managers/"+org;
        }
    }
}
</script>


