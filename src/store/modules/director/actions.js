import axios from "axios";
export default {

  async fetchAllProjects(context) {
    const organization_id = localStorage.getItem("organization_id");
    console.log(organization_id);
    const response = await axios.get(
      "http://localhost:8000/api/director/projects/" + organization_id
    );
    console.log(response.data);
    let projects = [];
    for (let key in response.data) {
      projects.push({
        id: response.data[key].id,
        title: response.data[key].title,
        description: response.data[key].description,
        assigned_at: response.data[key].assigned_at,
        estimated_deadline: response.data[key].estimated_deadline,
        completed_at: response.data[key].completed_at,
        username: response.data[key].user["name"],
        total_tasks: response.data[key].total_tasks,
        tasks_completed: response.data[key].tasks_completed,
        manager_id: response.data[key].manager_id,
      });
    }
    console.log(projects);
    console.log("All Projects", projects);
    context.commit("setProjects", projects);
    return;
  },

  async fetchAllManagers(context){
    const organization_id = localStorage.getItem("organization_id");
    let result = await axios.get(
      "http://localhost:8000/api/director/managers/"+organization_id
    );
    let managers = [];
    for (let key in result.data) {
      managers.push({ id: result.data[key].id, name: result.data[key].name });
    }
    console.log(managers);
    console.log("All Managers", managers);
    context.commit("setManagers", managers);
    return;
  },

  async fetchOrganization(context){
    const organization_id = localStorage.getItem("organization_id");
    await axios.get(
      "http://localhost:8000/api/director/organization/"+organization_id
    ).then(response =>{
      console.log("Organization:", response.data );
      context.commit("setOrg", response.data);
    });
    return;
   // console.log(result);
  },


  //fetch workers
  async fetchWorkers(context,payload){
    await axios.get(payload)
    .then(response =>{
      console.log("All Workers:",response.data );
      context.commit("setWorkers", response.data);
    }).catch(err=>{
      return err.response.data;
    })
    return;
  },

    //fetch workers
  //fetch workers
  async fetchManagers(context,payload){
    await axios.get(payload)
    .then(response =>{
      console.log("All Managers:",response.data );
      context.commit("setManagers1", response.data);
    }).catch(err=>{
      return err.response.data;
    })
    return;
  },

  async fetchUserDetails(context){
    const userId = localStorage.getItem('userId');
    console.log(userId);
    await axios.get(`http://localhost:8000/api/director/getuser/${userId}`)
    .then(response =>{
      console.log(response.data)
      context.commit("setUser", response.data);
    }).catch(err=>{
      return err.response.data;
    })
    return;
  }
};
