<template>
    <div class="row center">
        <div class="col-4">
            <span class="row">Total Tasks Assigned</span>
            <span class="row">{{ this.getCounts.total_tasks_assigned }}</span>
        </div>
        <div class="col-4">
            <span class="row">Tasks Completed</span>
            <span class="row">{{ this.getCounts.completed_tasks }}</span>
        </div>
        <div class="col-4">
            <span class="row">Tasks Overdue</span>
            <span class="row">{{ this.getCounts.overdue_tasks }}</span>
        </div>
    </div>
    <table class="table table-hover table-bordered border-dark">
        <thead>
            <tr class="table-primary">
                <th>ID <i class="bi bi-filter-left" @click="sort()"></i></th>
                <th>Title <i class="bi bi-filter-left" @click="sort()"></i></th>
                <th>Description <i class="bi bi-filter-left" @click="sort()"></i></th>
                <th>Assigned <i class="bi bi-filter-left" @click="sort()"></i></th>
                <th>Deadline <i class="bi bi-filter-left" @click="sort()"></i></th>
                <th>Status <i class="bi bi-filter-left" @click="sort()"></i></th>
                <th>Change Status</th>
                <th>Progress</th>
            </tr>
        </thead>
        <tbody>
            <tr class="table-info" v-for="task in getTasks" :key="task.id">
                <td>{{ task.id }}</td>
                <td>{{ task.title.slice(0, 10) }}</td>
                <td>{{ task.description.slice(0, 20) }}...</td>
                <td>{{ formatDate(task.assigned_at) }}</td>
                <td>{{ formatDate(task.estimated_deadline) }}</td>
                <td>{{ task.status_id == 1 ? 'ToDo' : task.status_id == 2 ? 'Doing' : task.status_id == 3 ? 'Under Review' :
                    'Completed' }}
                </td>
                <td>
                    <select name="change_status" id="change_status" @change="changeStatus($event, task.id)">
                        <option :value="i" v-for="i in 4" :key="i" :disabled="i == 4" :selected="task.status_id == i">{{
                            i === 1 ? 'ToDo' : i == 2 ? 'Doing' : i == 3 ? 'Under Review' : 'Completed' }}</option>
                    </select>
                </td>
                <!-- <td>
                    <div class="progress blue">
                        <span class="progress-left">
                            <span class="progress-bar"></span>
                        </span>
                        <span class="progress-right">
                            <span class="progress-bar"></span>
                        </span>
                        <div class="progress-value">{{task.status_id/4*100}}%</div>
                    </div>
                </td> -->
                <td>
                    <div class="box">
                        <div class="Loading"></div>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
    <div>
        {{ this.getRows }}
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    data() {
        return {
            rows: []
        }
    },
    methods: {
        ...mapActions('worker', ['fetchWorkerTasks', 'updateTaskStatus']),
        changeStatus(e, task_id) {
            const payload = {
                "status_id": e.target.value,
                "task_id": task_id
            }
            this.updateTaskStatus(payload);
        },
        formatDate(date) {
            date = new Date(date);
            var year = date.getFullYear(),
                month = date.getMonth() + 1, // months are zero indexed
                day = date.getDate(),
                hour = date.getHours(),
                minute = date.getMinutes(),
                // second = date.getSeconds(),
                hourFormatted = hour % 12 || 12, // hour returned in 24 hour format
                minuteFormatted = minute < 10 ? "0" + minute : minute,
                morning = hour < 12 ? "am" : "pm";

            return month + "/" + day + "/" + year + " " + hourFormatted + ":" +
                minuteFormatted + morning;
        }

        // ...mapActions(['fetchTasks'])
    },
    computed: {
        ...mapGetters('worker', ['getTasks', 'getRows','getCounts']),
        completedTasks() {
            if (this.tasks !== []) {
                const tasks = [...this.tasks];
                const completed = tasks.filter((t) => t.status_id == 4);
                return completed ? completed.length : 0
            } else {
                return 0;
            }
        }
    },
    created() {
        this.$store.commit['worker/setRows']
        this.rows = this.getRows;
        console.log('getRows,', this.rows)
    }
}



</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
  animation: pulse 5s once;
}

.box {
    border-radius: 4px;
    box-sizing: border-box;
    padding: 4px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, .5);
}

.Loading {
    position: relative;
    display: inline-block;
    width: 100%;
    height: 10px;
    background: #f1f1f1;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, .2);
    border-radius: 4px;
    overflow: hidden;
}

.Loading:after {
    content: '';
    position: absolute;
    left: 0;
    width: 0;
    height: 100%;
    border-radius: 4px;
    box-shadow: 0 0 5px rgba(0, 0, 0, .2);
    animation: load 5s;
}

@keyframes load {
    0% {
        width: 0;
        background:red;
    }

    25% {
        width: 40%;
        background: orange;
    }

    50% {
        width: 60%;
        background: yellow;
    }

    75% {
        width: 75%;
        background: greenyellow;
    }

    100% {
        width: 100%;
        background: green;
    }
}
@keyframes pulse {
    0% {
        width: 0;
        background:red;
    }

    25% {
        width: 40%;
        background: orange;
    }

    50% {
        width: 60%;
        background: yellow;
    }

    75% {
        width: 75%;
        background: greenyellow;
    }

    100% {
        width: 100%;
        background: green;
    }
}

</style>