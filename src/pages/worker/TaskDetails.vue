<template>
    <p>{{ getTask }}</p>
    <base-card>
        <h2>{{ getTask.title }}</h2>
        <div>Task ID: #{{ getTask.id }}</div>
        <p>{{ getTask.description }}</p>
        <div>{{ getTask.assigned_at }}</div>
        <div>Estimated Deadline: {{ getTask.estimated_deadline }}</div>
        <div>Project Id: {{ getTask.project_id }}</div>
        <div>Project Name: {{ getTask.project_id }}</div>
        <div>Review Passed: {{ getTask.review_passed == 0 ? 'No' : 'Yes' }}</div>
        <!-- <div>{{ status[getTask.status_id] }}</div> -->

    </base-card>
</template>

<script>

import { mapGetters } from 'vuex'
export default {
    props: {
        id: {
            required: true,
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
        ...mapGetters('worker', ['getTaskById', 'getTasks', 'status']),
        getTask() {
            return this.getTasks.find(t => t.id == this.id)
        }
    },
    method: {
    }

}
</script>