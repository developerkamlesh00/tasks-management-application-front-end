import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
  namespaced: true,
  state() {
    return {
      projs: [],
      workers: [],
      project: [],
      worker:[],
      tasks:[],
      modified_tasks:[],
      assignedTasks:[],
      reviewTasks:[],
      workerNames:[],
      visible:[],
      isSuccess:2,
      projectIdCollection:[]
    };
  },
  mutations,
  actions,
  getters
};
