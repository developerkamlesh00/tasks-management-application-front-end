<template>
  <h2 class="header">Project List</h2><br>
  <div class="search-container form-outline">
      <input class="form-control" id="search" type="text" placeholder="Search Project with Title Description and Manager Name" v-model="searchTerm" @input="searchOrganization">
      <button id="reset" @click="clearSearch">Clear</button>
  </div>
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
      <base-button id="radius">Update Project</base-button>
    </form>
  </base-dialog>
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
      <thead class="headercolor">
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
          <th scope="col">Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(project, index) in filteredProjects" :key="project.id">
          <th scope="row">{{ index+1 }}</th>
          <td>{{ project.title }}</td>
          <td>{{ project.description }}</td>
          <td>{{ project.assigned_at ? project.assigned_at.slice(0,10) : project.assigned_at}}</td>
          <td>{{ project.estimated_deadline ? project.estimated_deadline.slice(0,10) : project.estimated_deadline}}</td>
          <td>{{ project.completed_at }}</td>
          <td>{{ project.username }}</td>
          <td>
            <div class="progress">
              <div
                :class="backgroundChange(project.tasks_completed,project.total_tasks)"
                role="progressbar"
                aria-valuenow="70"
                aria-valuemin="0"
                aria-valuemax="100"
                :style="
                  'width:' +
                  parseInt(
                    (project.tasks_completed / project.total_tasks) * 100 || 0
                  ) +
                  '%'
                "
              >
                {{
                  parseInt(
                    (project.tasks_completed / project.total_tasks) * 100 || 0
                  )
                }}%
              </div>
            </div>
          </td>
          <td>
            <button class="btn linear_pink" @click="openProjectEdit(project)">Edit</button>
          </td>
          <td>
            <button class="btn btn-danger" @click="deleteProject(project)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="isLoading">
          <base-spinner></base-spinner>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters} from 'vuex';
import axios from "axios";
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseSpinner from "../../components/ui/BaseSpinner.vue";

export default {
  components: { BaseButton , BaseSpinner},
  data() {
    return {
      projectid:null,
      title: "",
      description: "",
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
      isLoading: false,

      selectedProject: null,
      searchTerm:'', //for search
      assign_at: '2000-01-01T00:00:00.000Z', //default date
      estimated_deadline: '2000-01-01T00:00:00.000Z', //default date
      assign_at_string: '',
      assign_at_string1: '',
    };
  },
  computed:{

    ...mapGetters('director',['getProjects']),
    ...mapGetters('director',['getManagers']),

    filteredProjects() {
      const projects = this.getProjects;
      console.log(projects);
      if (this.searchTerm) {
        return projects.filter(project => {
          const title = project.title.toLowerCase();
          const managername = project.username.toLowerCase();
          const description = project.description.toLowerCase();
          const term = this.searchTerm.toLowerCase();
          return managername.includes(term) || title.includes(term) || description.includes(term);
        });
      } else {
        return projects;
      }
    },
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
    ...mapActions('director',['fetchAllProjects']),
    ...mapActions('director',['fetchAllManagers']),

    backgroundChange(tasks_completed, total_tasks){ //for progress bar
      if((tasks_completed / total_tasks) * 100 < 30){
        return "progress-bar bg-danger"
      }else if((tasks_completed / total_tasks) * 100 < 60){
        return "progress-bar bg-warning"
      }else{
        return "progress-bar bg-success"
      }
    },
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
    //for delete Project
    async deleteProject(project){
      if (confirm('Are you sure you want to delete this Project?')){
        await axios.get(
          "http://localhost:8000/api/director/project/"+project.id
        )
        .then((response) =>{
            this.loadProject()
            return response.data;
        })
        .catch((err) => {
            for (let er in err.response.data) {
              this.error.push(err.response.data[er][0]);
            }
        });
      }
    },
    handleProject() {
      this.viewForm = false;
    },
    //clear search
    clearSearch(){
      this.searchTerm = ''
    },
    //open edit box and then fetch managers list
    ...mapGetters('director',['getManagers']),
    async openProject() {
      this.managerslist = this.getManagers; //used vuex for store
      console.log(this.managerslist);
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
            this.loadProject();
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
      this.isLoading = true;
      await this.fetchAllProjects(); //load project at first
      this.isLoading = false;
    },
    async loadManagers() {
      await this.fetchAllManagers(); //load all managers
    }
  },

  async mounted() {
    this.isLoading = true
    await this.loadProject();
    await this.loadManagers();
    this.isLoading = false;
  },
};
</script>

<style scoped>
#radius{
  border-radius: 30px;
}
.header {
    font-size: 2rem;
    font-weight: bold;
    padding-top: 15px;
    margin-bottom: 10px;
    color: #333;
    text-align: center;
}
.table-content {
  height: 500px;
}
th {
  text-align: top;
  
}
.headercolor{
  background-color: #ff84da; 
  color: white;
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


.search-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

#reset{
  background-color: #e01d92;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
}

.linear_pink{
background: radial-gradient(circle, rgba(252,248,255,1) 0%, hwb(286 52% 2%) 100%);
}
.linear_red{
background-color:  hwb(0 0% 7% / 0.584);
}
</style>


