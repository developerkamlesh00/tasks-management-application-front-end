import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
  namespaced: true,
  state() {
    return {
      projects: [],
      managers: [],
      managers1: [],
      workers: [],
      user: null,
      org: null,
    };
  },
  mutations,
  actions,
  getters
};
