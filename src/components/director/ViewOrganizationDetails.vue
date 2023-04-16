<template>
    <base-dialog
        :show="viewForm"
        title="Edit Organization Details"
        @close="handleProject"
    >
    <form @submit.prevent="updateOrganization">
      <div class="form-control">
        <label for="title">Organization Name</label>
        <input type="text" id="title" v-model.trim="org_name" />
      </div>
      <div class="form-control">
        <label for="description">Organization Email</label>
        <input type="gmail" id="description" v-model.trim="org_email" />
      </div>
      <p v-if="!formIsValid" class="text-danger">
        Please enter a organization name and email information.
      </p>
      <div v-if="error">
        <p v-for="err in error" :key="err" class="text-danger">
          {{ err }}
        </p>
      </div><br>
      <base-button id="radius" >Update Details</base-button>
    </form>
    </base-dialog>
    <div id="container">
      <div class="d-flex aligns-items-center justify-content-center card mx-auto linear_blue textcolor" v-if="getOrganization">
        <div class="card-header headercolor">
            <h3>Organization Name : {{ getOrganization.org_name }}</h3>
        </div>
          <div class="row" >
            <div class="col-4" style="padding: 2rem;">
                <img src="../../assets/orgicon.png" width="200" height="200" alt="org icon">
            </div>
            <div class="col-8" >
              <div class="card-body">
                  <h5 class="card-title"><p><strong>E-mail :</strong> {{ getOrganization.org_email }}</p></h5>
                  <p class="card-text">Registration Date : {{ getOrganization.created_at.slice(0,10) }}</p>
                  <p class="card-text">Projects Progress</p>
                  <div class="progress">
                    <div
                      :class="backgroundChange(getOrganization.projects_completed,getOrganization.total_projects)"
                      role="progressbar"
                      aria-valuenow="70"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      :style="
                        'width:' +
                        parseInt(
                          (getOrganization.projects_completed / getOrganization.total_projects) * 100 || 0
                        ) +
                        '%'
                      "
                    >
                      {{
                        parseInt(
                          (getOrganization.projects_completed / getOrganization.total_projects) * 100 || 0
                        )
                      }}%
                    </div>
                  </div>
                  <p class="project-status"><strong>Projects Completed : </strong> {{ getOrganization.projects_completed }} / {{ getOrganization.total_projects }}</p>
                  <button class="btn buttoncolor" @click="openOrg(getOrganization)">Update Organization Details</button>
              </div>
            </div>
          </div>
      </div>
    </div>
    <div>
        <router-view v-slot="{ Component }">
            <component :is="Component" />
        </router-view>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import BaseButton from '../ui/BaseButton.vue';
import axios from 'axios';

export default {
  components: { BaseButton },
    data(){
        return{
            viewForm : false,
            formIsValid: true,

            organization : null,
            org_id : '',
            org_name : '',
            org_email : '',
            org_createdat: '',
            error:[],
        }
    },
    methods:{
        ...mapActions('director',['fetchOrganization']),

        async fetchOrg() {
            await this.fetchOrganization();
        },
        openOrg(organization){
            this.error = []
            this.viewForm = true;
            this.org_id = organization.id;
            this.org_name = organization.org_name;
            this.org_email = organization.org_email;

        },
        handleProject(){
            this.viewForm = false;
            this.org_name = '';
            this.org_email = '';
            this.org_id = '';
        },
        updateOrganization(){
            this.error = []
            const actionData ={
                id: this.org_id,
                org_name : this.org_name,
                org_email : this.org_email,
            }
            // console.log(actionData);
            axios.post('http://localhost:8000/api/director/updateorg', actionData )
            .then(response =>{
                this.fetchOrg();
                this.viewForm = false;
                this.org_name = '',
                this.org_email = '',
                this.id = '',
                console.log(response);
            }).catch(err=>{
                this.error.push(err.response.data.message);
                console.log(err);

            })
        },
        backgroundChange(project_completed, total_project){ //for progress bar
            if((project_completed / total_project) * 100 < 30){
                return "progress-bar bg-primary"
            }else if((project_completed / total_project) * 100 < 50){
                return "progress-bar bg-warning"
            }else{
                return "progress-bar bg-success"
            }
        },
    },
    computed:{
        ...mapGetters('director',['getOrg']),
        getOrganization(){
            const organization = this.getOrg;
            console.log(organization);
            return organization;
        }
    },
    async mounted(){
        await this.fetchOrg();
    }

}
</script>


<style scoped>
.headercolor{
  background-color: #ff7dd8;
  color: white;
}
.buttoncolor{
  color: white;
  background-color: #9e5fcb;
}
.card{
    width: 80%;
    margin-top: 2rem;
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
.bar-container {
  height: 20px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 10px;
}

.completed-bar {
  height: 100%;
  background-color: #4CAF50;
}

.remaining-bar {
  height: 100%;
  background-color: #f44336;
}

.project-status {
  margin-top: 10px;
  font-size: 16px;
}

.error-message {
  color: red;
  font-size: 16px;
  margin-top: 20px;
}

.linear_blue{
background: radial-gradient(circle, rgba(252,248,255,1) 0%, hwb(302 90% 0%) 100%);
}

#radius{
  border-radius: 30px;
}
</style>
