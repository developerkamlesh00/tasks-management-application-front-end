<template>
  <h2 class="header">Create Project</h2><br>
  <form @submit.prevent="createProject">
    <div class="form-control linear_pink">
      <label for="title">Project Title</label>
      <input type="text" id="title" v-model.trim="title" />
    </div>
    <div class="form-control linear_pink">
      <label for="description">Description</label>
      <textarea
        type="text"
        id="description"
        v-model.trim="description"
      ></textarea>
    </div>
    <div class="form-control linear_pink">
      <label for="assign">Assigned at</label>
      <input type="date" id="assign" v-model.trim="assign_at" />
    </div>
    <div class="form-control linear_pink">
      <label for="estimated">Estimated Deadline</label>
      <input type="date" id="estimated" v-model.trim="estimated_deadline" />
    </div>

    <div class="form-control linear_pink">
      <label for="role">Manager Name</label>
      <select v-model="manager_id" id="role" class="form-select" aria-label="Default select example">
        <option v-for="ele in managerslist" :key="ele.id" :value="ele.id">{{ ele.name }}</option>
      </select>
    </div>

    <p v-if="!formIsValid" class="text-danger">Please enter a project name and description information.</p>
    <div v-if="error">
      <p v-for="err in error" :key="err" class="text-danger">
        {{ err }}
      </p>
    </div>

    <div id="success" v-if="successful" class="p-3 mb-2 text-white">
      {{ successful }}
    </div>

    <base-button id="btncreate">Create Project</base-button>
  </form>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      title: "",
      description: "",
      assign_at: null,
      estimated_deadline: null,
      manager_id: null,
      managerslist: [],
      formIsValid: true,
      error: [],
      successful: null,
    };
  },
  methods: {
    async createProject() {
      this.successful = null;
      this.formIsValid = true;
      this.error = [];
      if (
        this.title === "" ||
        this.description === "" ||
        this.assign_at === "" ||
        this.estimated_deadline ==="" ||
        this.manager_id === ""
      ) {
        this.formIsValid = false;
        return;
      }

      //console.log(this.$store.getters.organization);
      const actionPayload = {
        title: this.title,
        description: this.description,
        assigned_at: this.assign_at,
        estimated_deadline : this.estimated_deadline,
        organization_id: this.$store.getters.organization,
        manager_id: this.manager_id,
      };

      try {
        let result = await axios
          .post("http://localhost:8000/api/director/createproject", actionPayload)
          .then(function (response) {
            return response.data;
          })
          .catch((err) => {
            for(let er in err.response.data){
              this.error.push(err.response.data[er][0]);
            }
          });
        if (result) {
          this.successful = result;
          this.title = "";
          this.description = "";
          this.assign_at = "";
          this.estimated_deadline = null;
          (this.manager_id = null), (this.formIsValid = true);
          this.error = null;
        }
      } catch (error) {
        this.error = ["Something Wrong...."];
      }
    },
  },
  async mounted() {
    let org = await this.$store.getters.organization;
    let result = await axios.get("http://localhost:8000/api/director/managers/"+org);
    let managers =[]
    for (let key in result.data) {
      managers.push({'id':result.data[key].id ,'name':result.data[key].name})
    }
    this.managerslist = managers   
  },
};
</script>

<style scoped>
.header {
    font-size: 2rem;
    font-weight: bold;
    padding-top: 15px;
    margin-bottom: 10px;
    color: #333;
    text-align: center;
}
#card {
  /* max-width: 60rem; */
  max-width: fit-content;
}
#success {
  background-color: #138922;
}
#btncreate {
  border-radius: 30px;
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

.linear_pink{
background: radial-gradient(circle, rgba(252,248,255,1) 0%, hwb(302 90% 0%) 100%);
}
</style>
