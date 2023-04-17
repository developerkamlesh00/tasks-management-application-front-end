export default {
    projectLists(state){
        return state.projs
      },
      workerLists(state){
        return state.workers
      },
      taskLists(state){
        return state.tasks
      },
      singleProject(state){
     
        let result= state.project[0]
        console.log(result)
        return result   
      },
      singleWorker(state){
        return state.worker[0]
      },
      assignedTaskLists(state){
        return state.assignedTasks
      },
      reviewTaskLists(state){
        const result = [].concat(...state.reviewTasks)
        let finalResult=[]
        //let values = Object.values(result);
        let value=[]
  
        for (let i = 0; i < result.length; i++){
           // let single=result[i];
            value = Object.values(result[i]);
            finalResult=finalResult.concat(value)
        }
       
        return finalResult
      },
  
      getAllWorkerNames(state){
        return state.workerNames
      },
  
      getVisible(state){
        return state.visible
      },
      getIsSuccess(state){
        return state.isSuccess
      }
    
};