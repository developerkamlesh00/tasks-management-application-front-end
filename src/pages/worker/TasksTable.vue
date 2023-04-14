<template>
    <div class="container py-2 px-4">
    <div class="row">
        <div class="col-4">
            <base-card class="row  linear_blue text-center">
                <h5><i class="bi bi-list-task"></i> Total Tasks Assigned</h5>
                <div class="display-6 text-center">{{ this.getCounts.total_tasks_assigned }}</div>
            </base-card>
        </div>
        <div class="col-4 ">
            <base-card class="row  linear_green text-center">
                <h5><i class="bi bi-check-circle-fill"></i> Tasks Completed</h5>
                <div class="display-6 text-center">{{ this.getCounts.completed_tasks }}</div>
            </base-card>
        </div>
        <div class="col-4">
                <base-card class="row  linear_red text-center">
                <h5><i class="bi bi-exclamation-diamond-fill"></i> Tasks Overdue</h5>
                <div class="display-6 text-center">{{ this.getCounts.overdue_tasks }}</div>
            </base-card>
        </div>
    </div>
    <div class="my-3 p-3 row">
        <div class="col-6">
            <label for="searching" class="form-label">Searching</label>
            <input type="text" class="form-control" id="searching" placeholder="Search tasks" v-model="term" @input="setFilteredRows()" />
        </div>
        <div class="col-6">
            <label for="filter" class="form-label">Filter by category</label>
            <select name="category" class="form-select" id="filter" @change="setFilteredRows()" v-model="filterCategory">
                <option value="" selected>All</option>
                <option :value="value" v-for="(value, key) in getStatus" :key="key">{{ value }}</option>
            </select>
        </div>
    </div>
    <p><em>*Click on header to sort the column</em></p>
    <table class="table table-hover table-bordered border-dark">
        <thead>
            <tr class="table-primary text-center">
                <th v-for="(value, index) in tableKeys" :key="index">
                    <div v-if="index >= 1 && index <= 5" class="pointer">
                        <i class="bi bi-filter-left" @click="sortRecords(index)">
                            {{ value }}</i>
                        </div>     
                        <div v-else> {{ value }}</div>
                </th>
                <th>View</th>
            </tr>
        </thead>
        <tbody>
            <tr class="table-info" v-for="task in getFilteredRows" :key="task.id">
                <td v-for="(item, index) in task" :key="index"><template v-if="index==2">{{ item.slice(0,20) }}......</template><template v-else>{{ item }}</template></td>                  
                <td>
                    <select name="change_status" id="change_status" @change="changeStatus($event, task[0])" :disabled="task[5]=='Completed'">
                        <option :value="index" v-for="(status, index) in getStatus" :key="index" :disabled="index == 4"
                            :selected="task[5] === getStatus[index]">{{
                                status }}</option>
                    </select>
                </td>
                <td>
                    <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="75" aria-valuemin="0"
                        aria-valuemax="100">
                        <div class="progress-bar progress-bar-striped progress-bar-animated" :class="getStyle(getStatusId[task[5]])"></div>
                    </div>
                </td>
                <td>
                    <router-link class="btn btn-outline-dark" :to="{name:'task_detail',params:{'id':task[0]}}">Open
                </router-link>
                </td>
            </tr>
            <tr v-if="getFilteredRows.length == 0">
                <td colspan="8" class="text-center bg-primary">No Task Found</td>
            </tr>
        </tbody>
    </table>
           
</div>
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
        getStyle(status_id){
            const width=(status_id)*100/4;
            const bg=['bg-danger','bg-warning','bg-info','bg-success'];
            return `w-${width} ${bg[status_id-1]}`
        },
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
        ...mapGetters('worker', ['getTasks', 'getRows', 'getCounts', 'getStatus','getStatusId']),
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
.body {
    background-color: aquamarine;
    margin: 0;
    padding: 10px;    
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
.linear_blue{
background: radial-gradient(circle, rgba(252,248,255,1) 0%, rgba(150,202,255,1) 100%);
}
.linear_green{
    background: radial-gradient(circle, rgba(255,255,254,1) 0%, rgba(197,247,142,1) 100%);
}
.linear_red{
    background: radial-gradient(circle, rgba(255,240,219,1) 0%, rgba(255,132,132,1) 100%);
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