<template>
    <base-card>
        <div>{{ id }}</div>
        <div>{{ getTask}}</div>
        <div>Title</div>
        <!-- <div>{{ getTaskById(task_id).title }}</div> -->
        <!-- <div>Description</div> -->
        <!-- <div>{{ getTaskById(task_id).description }}</div> -->

    </base-card>
</template>

<script>

import { mapGetters } from 'vuex'
export default {
    props: {
        id: {
            required:true,
            validator: (value) => {
                const parsedValue = parseInt(value);
                return !isNaN(parsedValue) && Number.isInteger(parsedValue);
            },
        }
    },
    data() {
        return {
            task: null,
        }
    },
    computed: {
        ...mapGetters('worker', ['getTaskById','getTasks']),
        getTask(){
            return this.getTasks.find(t=>t.id===this.id)
        }
    },
    method:{
    }

}
</script>