import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

export default {
  namespaced: true,
  state() {
    return {
      recentUsers: [],

      directors: [],
      errorMessage: "",
      searchTerm: "",
      selectedOrgId: "",
      currentPage: 1,
      directorsPerPage: 10,

      managers: [],
      managerErrorMessage: "",
      managerSearchTerm: "",
      managerSelectedOrgId: "",
      managerCurrentPage: 1,
      managersPerPage: 10,

      workers: [],
      workerErrorMessage: "",
      workerSearchTerm: "",
      workerSelectedOrgId: "",
      workerCurrentPage:1,
      workersPerPage: 10,
    };
  },
  mutations,
  actions,
  getters,
};
