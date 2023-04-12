<template>
   <base-dialog
    :show="viewForm"
    title="Edit Project Info"
    @close="handleProject"
  >
    <form @submit.prevent="updateProject">
      <div class="form-control">
        <label for="title">Project Title</label>
        <input type="text" id="title" v-model.trim="title" />
      </div>
      <div class="form-control">
        <label for="description">Description</label>
        <textarea
          type="text"
          id="description"
          v-model.trim="description"
        ></textarea>
      </div>
      <div class="form-control">
        <label for="assign">Assigned at</label>
        <!-- <label for="assign">{{ formatDate(assign_at) }}</label>
        <label for="assign">{{ typeof(assign_at) }}</label> -->
        <input type="date" id="assign" v-model.trim="assign_at_string"/>
      </div>
      <div class="form-control">
        <label for="estimated">Estimated Deadline</label>
        <!-- <label for="estimated">{{ estimated_deadline }}</label> -->
        <!-- <input type="date" id="estimated" v-model.trim="estimated_deadline" /> -->
        <input type="date" id="estimated" v-model.trim="assign_at_string1" />
      </div>

      <div class="form-control">
        <label for="role">Manager Name</label>
        <select
          v-model="manager_id"
          id="role"
          class="form-select"
          aria-label="Default select example"
        >
          <option v-for="ele in managerslist" :key="ele.id" :value="ele.id" :selected="ele.id === manager_id">
            {{ ele.name }}
          </option>
        </select>
      </div>

      <p v-if="!formIsValid" class="text-danger">
        Please enter a project name and description information.
      </p>
      <div v-if="error">
        <p v-for="err in error" :key="err" class="text-danger">
          {{ err }}
        </p>
      </div>

      <div id="success" v-if="successful" class="p-3 mb-2 text-white">
        {{ successful }}
      </div>

      <base-button id="btncreate">Update Project</base-button>
    </form>
  </base-dialog>
  <!-- <router-view v-slot="{ Component }">
    <component :is="Component" />
  </router-view> -->
  <div class="table-responsive text-nowrap table-content">
    <table
      id="dtHorizontalVerticalExample"
      class="table table-striped table-bordered table-sm"
      cellspacing="0"
      width="100%"
    >
      <caption>
        List of Projects
      </caption>
      <thead>
        <tr>
          <th scope="col">No.</th>
          <th scope="col">Title</th>
          <th scope="col">Desciption</th>
          <th scope="col">Assigned Date</th>
          <th scope="col">Estimated Deadline</th>
          <th scope="col">Completed</th>
          <th scope="col">Manager Name</th>
          <th scope="col">Progress</th>
          <th scope="col">Edit</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="project in projects" :key="project.id">
          <th scope="row">{{ project.id }}</th>
          <td>{{ project.title }}</td>
          <td>{{ project.description }}</td>
          <td>{{ project.assigned_at }}</td>
          <td>{{ project.estimated_deadline }}</td>
          <td>{{ project.completed_at }}</td>
          <td>{{ project.user['name'] }}</td>
          <td>
            <div class="progress">
              <div
                class="progress-bar bg-success"
                role="progressbar"
                aria-valuenow="70"
                aria-valuemin="0"
                aria-valuemax="100"
                :style="
                  'width:' +
                  parseInt(
                    (project.tasks_completed / project.total_tasks) * 100 || 1
                  ) +
                  '%'
                "
              >
                {{
                  parseInt(
                    (project.tasks_completed / project.total_tasks) * 100 || 1
                  )
                }}%
              </div>
            </div>
          </td>
          <td>
            <button class="btn btn-primary" @click="openProjectEdit(project)">Edit</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <canvas id="myChart" width="400" height="400"></canvas>
</template>

<script>
import axios from "axios";
import BaseButton from '@/components/ui/BaseButton.vue';
// import { Chart, CategoryScale, LinearScale, BarController, BarElement } from 'chart.js';

// Chart.register(CategoryScale, LinearScale, BarController, BarElement);

export default {
  components: { BaseButton },
  data() {
    return {
      projectid:null,
      title: "",
      description: "",
      //estimated_deadline: null,
      completed_at: null,
      manager_id: null,
      progress: 0,
      tasks_completed: null,
      total_tasks: null,

      projects: [],
      managerslist: [],
      error: [],
      viewForm: false,
      formIsValid: true,
      successful: null,
      selectedProject: null,

      assign_at: '2000-01-01T00:00:00.000Z', //default date 
      estimated_deadline: '2000-01-01T00:00:00.000Z', //default date 
      assign_at_string: '',
      assign_at_string1: '',
    };
  },
 
  //for update Date 
  watch: {
    assign_at(newValue) {
      if(newValue){
        this.assign_at_string = newValue.slice(0, 10);
      }else{
        this.assign_at_string = null;
      }
    },
    estimated_deadline(newValue) {
      if(newValue){
        this.assign_at_string1 = newValue.slice(0, 10);
      }else{
        this.assign_at_string1 = null;
      }
    },
  },

  methods: {
    openProjectEdit(project) {
      //this.selectedProject = project;
      this.viewForm = true;
      this.openProject(); //get all managers
      this.projectid = project.id;
      this.title = project.title;
      this.description = project.description;
      this.assign_at = project.assigned_at;
      this.estimated_deadline = project.estimated_deadline;
      this.manager_id = project.manager_id;
      this.viewForm = true;
      
    },

    handleProject() {
      this.viewForm = false;
    },
    //open edit box and then fetch managers list
    async openProject() {
      let org = await this.$store.getters.organization;
      console.log(org);
      let result = await axios.get(
        "http://localhost:8000/api/director/managers/"+org
      );
      let managers = [];
      for (let key in result.data) {
        managers.push({ id: result.data[key].id, name: result.data[key].name });
      }
      this.managerslist = managers;
    },

    //update Project here......
    async updateProject() {
      this.successful = null;
      this.formIsValid = true;
      if (
        this.title === "" ||
        this.description === "" ||
        this.assign_at === "" ||
        this.estimated_deadline === "" ||
        this.manager_id === ""
      ) {
        this.formIsValid = false;
        return;
      }

      const actionPayload = {
        title: this.title,
        description: this.description,
        assigned_at: this.assign_at_string,
        estimated_deadline: this.assign_at_string1,
        organization_id: this.$store.getters.organization,
        manager_id: this.manager_id,
      };

      try {
        console.log(this.projectid);
        await axios
          .post(
            "http://localhost:8000/api/director/updateproject/"+this.projectid,
            actionPayload
          )
          .then((response) =>{
            this.handleProject();
            this.loadProject()
            return response.data;
          })
          .catch((err) => {
            // this.error = err;
            for (let er in err.response.data) {
              this.error.push(err.response.data[er][0]);
            }
          });
      } catch (error) {
        this.error = ["Something Wrong...."];
      }
    },
    async loadProject() {
      let org = await this.$store.getters.organization;
      console.log(org);
      await axios
        .get("http://localhost:8000/api/director/projects/" + org)
        .then((response) => {
          console.log(response.data);
          this.projects = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
  
      //await this.$store.commit("setprojects",this.projects);
      //console.log(await this.$store.getters.getProjects);
      //get proxy result into json format
      const projects = JSON.parse(JSON.stringify(this.projects));
      this.projects = projects;
    },
    async reloadComponent() {
      await this.loadProject();
    }
  },

  async mounted() {
    await this.loadProject()
    // const ctx = document.getElementById('myChart');
    // const myChart = new Chart(ctx, {
    //   type: 'bar',
    //   data: {
    //     labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    //     datasets: [{
    //       label: '# of Votes',
    //       data: [12, 19, 3, 5, 2, 3],
    //       backgroundColor: [
    //         'rgba(255, 99, 132, 0.2)',
    //         'rgba(54, 162, 235, 0.2)',
    //         'rgba(255, 206, 86, 0.2)',
    //         'rgba(75, 192, 192, 0.2)',
    //         'rgba(153, 102, 255, 0.2)',
    //         'rgba(255, 159, 64, 0.2)'
    //       ],
    //       borderColor: [
    //         'rgba(255, 99, 132, 1)',
    //         'rgba(54, 162, 235, 1)',
    //         'rgba(255, 206, 86, 1)',
    //         'rgba(75, 192, 192, 1)',
    //         'rgba(153, 102, 255, 1)',
    //         'rgba(255, 159, 64, 1)'
    //       ],
    //       borderWidth: 1
    //     }]
    //   },
    //   options: {
    //     scales: {
    //       x: {
    //         type: 'category'
    //       },
    //       y: {
    //         ticks: {
    //           beginAtZero: true
    //         }
    //       }
    //     }
    //   }
    // });
    // console.log(myChart);
  },

};
</script>

<style scoped>
.table-content {
  height: 400px;
}
th {
  text-align: top;
}
td {
  text-align: left;
  padding-top: 10px;
}

a {
  margin-top: -10px;
  text-align: center;
  height: 50px;
  background-color: rgb(21, 186, 232);
}

form {
  margin: 1rem;
  margin-top: -1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}
</style>
