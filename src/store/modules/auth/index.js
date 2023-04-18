import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
  state() {
    return {
      userId: null,
      name:null,
      token: null,
      role: null,
      organization_id :null
    };
  },
  mutations,
  actions,
  getters
};