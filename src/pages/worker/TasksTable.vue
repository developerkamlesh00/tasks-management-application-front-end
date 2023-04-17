<template>
    <div class="container py-2 px-4">
    <div class="row">
        <div class="col-4">
            <base-card class="row linear_blue text-center">
                <h5><i class="bi bi-list-task"></i> Total Tasks Assigned</h5>
                <div class="display-6 text-center">{{ this.getCounts.total_tasks_assigned }}</div>
            </base-card>
        </div>
        <div class="col-4 ">
            <base-card class="row linear_green text-center">
                <h5><i class="bi bi-check-circle-fill"></i> Tasks Completed</h5>
                <div class="display-6 text-center">{{ this.getCounts.completed_tasks }}</div>
            </base-card>
        </div>
        <div class="col-4">
                <base-card class="row linear_red text-center">
                <h5><i class="bi bi-exclamation-diamond-fill"></i> Tasks Overdue</h5>
                <div class="display-6 text-center">{{ this.getCounts.overdue_tasks }}</div>
            </base-card>
        </div>
    </div>
    <div class="my-3 p-3 row">
        <div class="col-6">
            <!-- Search Box -->
            <label for="searching" class="form-label">Searching</label>
            <input type="text" class="form-control" id="searching" placeholder="Search tasks" v-model="term" @input="setFilteredRows()" />
        </div>
        <div class="col-6">
            <!-- Filter Box -->
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
                        <!-- For Change Status, Progress and View -->
                        <div v-else> {{ value }}</div>
                </th>
                <th>View</th>
            </tr>
        </thead>
        <tbody>
            <tr class="table-info" v-for="task in getFilteredRows" :key="task.id">
                <!-- 0- Task_id, 1- Title, 2- Description, 3- Assigned at, 4- Estimated deadline, 5- Status -->
                <td v-for="(item, index) in task" :key="index">
                    <template v-if="index==2">{{ item.slice(0,20) }}......</template>
                    <template v-else>{{ item }}</template>
                </td>                  
                <td>
                    <!-- Chaning Status -->
                    <select name="change_status" id="change_status" @change="changeStatus($event, task[0])" :disabled="task[5]=='Completed'|| task[5]=='Review'">
                        <option :value="index" v-for="(status, index) in getStatus" :key="index" :disabled="index == 4" :selected="task[5] === getStatus[index]">{{status }}
                        </option>
                    </select>
                </td>
                <td>
                    <!-- Progress Bar -->
                    <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="75" aria-valuemin="0"
                        aria-valuemax="100">
                        <div class="progress-bar progress-bar-striped progress-bar-animated" :class="getStyle(getStatusId[task[5]])"></div>
                    </div>
                </td>
                <td>
                    <!-- Open Task in detail -->
                    <router-link class="btn btn-outline-dark" :to="{name:'task_detail',params:{'id':task[0]}}">Open</router-link>
                </td>
            </tr>
            <!-- If there are no tasks assigned to this worker -->
            <tr v-if="getFilteredRows.length == 0">
                <td colspan="8" class="text-center bg-info">No task assigned yet!</td>
            </tr>
        </tbody>
    </table> 
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

// Filtering out the tasks rows containing a specific term entered in the Search Bar
const performSearch = (rows, term) => {
    const results = rows.filter(
        row => row.join(" ").toLowerCase().includes(term.toLowerCase())
    )
    return results;
}

export default {
    data() {
        return {
            // To avoid repetition of code in <thead> tag for sorting functionality
            tableKeys: ['ID', 'Title', 'Description', 'Assigned', 'Deadline', 'Status', 'Change Status', 'Progress'],
            rows: [],
            term: "", //Text entered in the search bar
            sortIndex: null, // Sorted by which column
            sortDirection: null, // Ascending or Descending
            filterCategory: "" // Term in filter select box
        }
    },
    methods: {
        ...mapActions('worker', ['fetchWorkerTasks', 'updateTaskStatus']),

        // For progress bars, status_id determines the widths and color, returing bootstrap classes
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

            // The localeCompare() method compares two strings in the current locale. The localeCompare() method returns sort order -1, 1, or 0 (for before, after, or equal).
            this.rows = this.rows.sort(
                (rowA, rowB) => {
                    // console.log(rowA[index], rowB[index])
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
    },
    computed: {
        ...mapGetters('worker', ['getTasks', 'getRows', 'getCounts', 'getStatus','getStatusId']),
        getFilteredRows() {
            this.setFilteredRows()
            return this.rows
        }
    },
}

</script>

<style scoped>
.linear_blue{
background: radial-gradient(circle, rgba(252,248,255,1) 0%, rgba(150,202,255,1) 100%);
}
.linear_green{
    background: radial-gradient(circle, rgba(255,255,254,1) 0%, rgba(197,247,142,1) 100%);
}
.linear_red{
    background: radial-gradient(circle, rgba(255,240,219,1) 0%, rgba(255,132,132,1) 100%);
}
</style>