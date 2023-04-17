<template>
  <base-dialog
    :show="viewForm"
    :title= "messagetitle"
    @close="handleDialog"
  >{{ message }}
  </base-dialog>
  <h2 class="header">Create Managers and Workers</h2><br>
    <div class="form-control linear_pink">
      <div class="container">
        <div class="row mx-auto">
          <label for="formFileSm" class="form-label">Create Managers and Worker Using CSV file</label>
          <div class="col">
            <div class="form-group">
              <input class="form-control" id="formFileSm" type="file" @change="onFileSelected"/>
            </div>
          </div>
          <div class="col">
            <div class="form-group">
              <button class="btn btn-primary" @click="convertToJson">Import</button>
            </div>
          </div>
        </div>
      </div>
    </div><br>
  <form @submit.prevent="submitForm">
    <div class="form-control linear_pink">
      <label for="role">Role</label>
      <select
        v-model="role"
        id="role"
        class="form-select"
        aria-label="Default select example"
      >
        <option selected value="3">Manager</option>
        <option value="4">Worker</option>
      </select>
    </div>
    <div class="form-control linear_pink">
      <label for="name">Name</label>
      <input type="text" id="name" v-model.trim="name" />
    </div>
    <div class="form-control linear_pink">
      <label for="email">E-Mail</label>
      <input type="email" id="email" v-model.trim="email" />
    </div>
    <div class="form-control linear_pink">
      <label for="password">Password</label>
      <input type="password" id="password" v-model.trim="password" />
    </div>

    <p v-if="!formIsValid">
      Please enter a valid information for registration like email and password
      (must be at least 6 characters long).
    </p>
    <p v-if="error" class="text-danger">
      {{ error }}
    </p>

    <div id="success" v-if="successful" class="p-3 mb-2 text-white">{{ successful }}</div>
    <!-- <p v-if="successful" class="text-success">
      
    </p> -->
    <base-button id="btnregister">Register User</base-button>
  </form>
</template>

<script>
import Papa from "papaparse";
import axios from "axios";

export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      role: null,
      formIsValid: true,
      error: null,
      successful:null,

      csvData: '',
      jsonData: '',
      viewForm: false,
      message : '',
      messagetitle: '',
      res:false,  // checkpoint for file type 
    };
  },
  methods: {
    handleDialog() {
      this.viewForm = false;
      this.message = '';
      this.messagetitle = '';
      this.res= false;
    },
    async submitForm() {
      this.successful = null;
      this.formIsValid = true;
      if (
        this.name === "" ||
        this.email === "" ||
        !this.email.includes("@") ||
        this.password.length < 6
      ) {
        this.formIsValid = false;
        return;
      }

      //console.log(this.$store.getters.organization);
      const actionPayload = {
        name: this.name,
        email: this.email,
        password: this.password,
        organization_id: this.$store.getters.organization,
        role_id: this.role,
      };


      try {
        let result = await axios
          .post("http://localhost:8000/api/director/register", actionPayload)
          .then(function (response) {
            if (response.status === 203) {
              const error = new Error("User Not Created");
              throw error;
            }
            console.log(response);

            return "Successfully Created";
          
          }).catch(err =>{
            this.error = err.response.data.email[0];
          });
        if(result){
          this.successful = result;
          this.name= "";
          this.email= "";
          this.password= "";
          this.role= null;
          this.formIsValid= true;
          this.error= null;
        }
      } catch (error) {
        this.error = "Something Wrong....";
      }
    },

    handleError() {
      this.error = null;
    },

    //for sending Data using CSV file 
    onFileSelected(event) {
      const file = event.target.files[0];

      if (file && file.type == "text/csv") {
        this.res = true;
        const reader = new FileReader();
        reader.onload = (e) => {
          this.csvData = e.target.result.replace(/\r/g, "");
        };
        reader.readAsText(file);
      } else {
        this.res = false;
        this.viewForm = true;
        this.message = "You Selected file type is not CSV please select proper file.";
        this.messagetitle = "Wrong File"
      }
    },
    async convertToJson() {
      if(this.res){
        const options = {
          header: true,
          delimiter: ",",
          newline: "\n",
        };
  
        const parsedData = Papa.parse(this.csvData, options).data;
        parsedData.pop(); // Remove the last record
        parsedData.pop();
        // console.log("Remove Last" ,parsedData);
        const updatedData = parsedData.map(dataRow => {
          const updatedRow = { ...dataRow }; // Create a copy of the row
          if(updatedRow.role_id === 'worker'){
            updatedRow.role_id = 4;
          } else if(updatedRow.role_id === 'manager') {
            updatedRow.role_id = 3;
          }
          updatedRow.organization_id = this.$store.getters.organization; // Add the extra field to the copy
          return updatedRow;
        });
  
        const jsonData = JSON.stringify(updatedData);
        this.jsonData = jsonData;
  
        console.log(updatedData)
        console.log(jsonData);
  
        let res= await axios.post('http://localhost:8000/api/director/bulkregister',updatedData)
        .then(function (response) {
          console.log(response);
          return "Successfully Created";
          
        }).catch(err =>{
          this.dataIncorrect();
          console.log(err);
        });
        if(res){
          this.viewForm = true;
          this.message = "Successfully Imported All Data....";
          this.messagetitle = "Successfull "
        }
      }else{
        this.viewForm = true;
        this.message = "You Selected file type is not CSV please select proper file.";
        this.messagetitle = "Wrong File"
      }
    },
    dataIncorrect(){
      this.viewForm = true;
      this.message = "Data Duplicate or may not be formatted....please provide like this 'name,email,password,role'";
      this.messagetitle = "Duplicate Data or may not be formatted"
    }
    
  },
};
</script>

<style scoped>
.header {
    font-size: 2rem;
    font-weight: bold;
    padding-top: 15px;
    /* margin-bottom: 10px; */
    color: #333;
    text-align: center;
}
#card {
  max-width: 60rem;
}
#success{
  background-color : #138922
}
#btnregister {
  border-radius: 30px;
}
form, .csvcontainer {
  margin: 1rem;
  margin-top: -1rem;
  padding: 1rem;
}

.form-control, .csvcontainer {
  background: transparent;
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
