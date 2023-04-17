export default {
    getProjects(state, payload){
        state.projs = payload.value
      },
  
      getUsers(state, payload){
        state.workers = payload.value
  
      }
};