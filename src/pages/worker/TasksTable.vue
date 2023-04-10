<template>
    <div class="row">
        <div class="col-4">
            <base-card class="bg-info">
                <base-button class="row">Total Tasks Assigned</base-button>
                <span class="display-6 text-center">{{ this.getCounts.total_tasks_assigned }}</span>
            </base-card>
        </div>
        <div class="col-4 ">
            <base-card class="bg-info">
                <base-button class="row">Tasks Completed</base-button>
                <span class="display-6 text-center">{{ this.getCounts.completed_tasks }}</span>
            </base-card>
        </div>
        <div class="col-4">
            <base-card class="bg-info">
                <base-button class="row">Tasks Overdue</base-button>
                <span class="display-6 text-center">{{ this.getCounts.overdue_tasks }}</span>
            </base-card>
        </div>
    </div>
 <div>{{ this.getRows }}</div>
    <div class="my-3 p-3 row">
        <div class="col-6">
            <label for="form-label">Searching</label>
            <input type="text" class="form-control" placeholder="Search tasks" v-model="term" @input="setFilteredRows()" />
        </div>
        <div class="col-6">
            <label for="form-label">Filter by category</label>
            <select name="category" class="form-select" @change="setFilteredRows()" v-model="filterCategory">
                <option value="" selected>All</option>
                <option :value="value" v-for="(value, key) in getStatus" :key="key">{{ value }}</option>
            </select>
        </div>
    </div>

    <table class="table table-hover table-bordered border-dark">
        <thead>
            <tr class="table-primary">
                <th v-for="(value, index) in tableKeys" :key="index">{{ value }} <i v-if="index >= 1 && index <= 5"
                        class="bi bi-filter-left" @click="sortRecords(index)"></i>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr class="table-info" v-for="task in getFilteredRows" :key="task.id">
                <td v-for="(item, index) in task" :key="index">{{ item }}</td>
                <td>
                    <select name="change_status" id="change_status" @change="changeStatus($event, task[0])">
                        <option :value="index" v-for="(status, index) in getStatus" :key="index" :disabled="index == 4"
                            :selected="task[5] === getStatus[index]">{{
                                status }}</option>
                    </select>
                </td>
                <td>
                    <div class="box">
                        <div class="Loading"></div>
                    </div>
                </td>
            </tr>
            <tr v-if="getFilteredRows.length == 0">
                <td colspan="8" class="text-center bg-primary">No Task Found</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
const performSearch = (rows, term) => {
    const results = rows.filter(
        row => row.join(" ").toLowerCase().includes(term.toLowerCase())
    )
    return results;
}

export default {
    data() {
        return {
            tableKeys: ['ID', 'Title', 'Description', 'Assigned', 'Deadline', 'Status', 'Change Status', 'Progress'],
            rows: [],
            term: "",
            sortIndex: null,
            sortDirection: null,
            filterCategory: ""
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
            this.setFilteredRows()
        },
        sortRecords(index) {
            if (this.sortIndex === index) {
                switch (this.sortDirection) {
                    case null:
                        this.sortDirection = 'asc';
                        break;
                    case 'asc':
                        this.sortDirection = 'desc';
                        break;
                    case 'desc':
                        this.sortDirection = null;
                        break;
                }
            } else {
                this.sortDirection = 'asc'
            }
            this.sortIndex = index;
            if (!this.sortDirection) {
                this.rows = performSearch(this.getRows, this.term);
                return;
            }
            this.rows = this.rows.sort(
                (rowA, rowB) => {
                    console.log(rowA[index], rowB[index])
                    if (this.sortDirection === 'desc') {
                        return rowB[index].localeCompare(rowA[index]);
                    }
                    return rowA[index].localeCompare(rowB[index]);
                }
            )
        },
        onSearch(rows) {
            this.rows = performSearch(rows, this.term);
            return this.rows
        },
        onFilterCategory(rows) {
            this.rows = rows.filter(
                row => row[5] == this.filterCategory
            )
            console.log(this.rows)
        },
        setFilteredRows() {
            this.rows = this.getRows;
            if (this.term != "") {
                this.onSearch(this.rows)
            }
            if (this.filterCategory != "") {
                return this.onFilterCategory(this.rows)
            }
            return this.rows;
        }
        // ...mapActions(['fetchTasks'])
    },
    computed: {
        ...mapGetters('worker', ['getTasks', 'getRows', 'getCounts', 'getStatus']),
        completedTasks() {
            if (this.tasks !== []) {
                const tasks = [...this.tasks];
                const completed = tasks.filter((t) => t.status_id == 4);
                return completed ? completed.length : 0
            } else {
                return 0;
            }
        },
        getFilteredRows() {
            this.setFilteredRows()
            return this.rows
        }
    },
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
        background: red;
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
        background: red;
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