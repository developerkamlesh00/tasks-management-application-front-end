import { boards} from "./data.js";
import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';


export default {
  namespaced: true,
  state() {
    return {
      totalBoards: 4,
      boards: boards,
      tasks: {},
    };
  },
  
  actions,
  mutations,
  getters
};
