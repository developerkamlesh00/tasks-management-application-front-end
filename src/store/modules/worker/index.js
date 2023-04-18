import { boards} from "./data.js";
import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';


export default {
  namespaced: true,
  state() {
    return {
      isLoading:false,
      showMessage:false,
      message:'',
      
      boards: boards,
      totalBoards: 4,
      tasks:[],
      rows:[],

      total_tasks_assigned:0,
      todo:0,
      doing:0,
      pending:0,
      overdue_tasks:0,
      reviews_submitted:0,
      reviews_passed:0,
      completed_tasks:0,

      tasks_per_project:{}, //{project_id:[{completed:task.id},pending:{}]}
      tasks_completed:[],
      tasks_assigned_deadline:[], //{id,assigned,deadline}
      tasks_with_passed_deadlines:[], //{id,overdue_time}

      comments:[],
      projects:[],
      project_tasks:[],
      
      status:{
        1:'ToDo',
        2:'Doing',
        3:'Review',
        4:'Completed',
      },
      statusId:{
        'ToDo':1,
        'Doing':2,
        'Review':3,
        'Completed':4,
      },
    };
  },
  
  actions,
  mutations,
  getters
};
