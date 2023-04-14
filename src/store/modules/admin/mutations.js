export default {
  SET_RECENT_USERS(state, recentUsers) {
    state.recentUsers = recentUsers;
  },

  SET_DIRECTORS(state, directors) {
    state.directors = directors;
  },
  SET_ERROR_MESSAGE(state, errorMessage) {
    state.errorMessage = errorMessage;
  },
  SET_SEARCH_TERM(state, searchTerm) {
    state.searchTerm = searchTerm;
  },
  SET_SELECTED_ORG_ID(state, selectedOrgId) {
    state.selectedOrgId = selectedOrgId;
  },
  SET_CURRENT_PAGE(state, currentPage) {
    state.currentPage = currentPage;
  },

  ////// Manager
  setManagers(state, managers) {
    state.managers = managers;
  },
  setManagerErrorMessage(state, errorMessage) {
    state.managerErrorMessage = errorMessage;
  },
  setManagerSearchTerm(state, searchTerm) {
    state.managerSearchTerm = searchTerm;
  },
  setManagerSelectedOrgId(state, orgId) {
    state.managerSelectedOrgId = orgId;
  },
  setManagerCurrentPage(state, page) {
    state.managerCurrentPage = page;
  },

  ///////Worker
  setWorkers(state, workers) {
    state.workers = workers;
  },
  setWorkerErrorMessage(state, errorMessage) {
    state.workerErrorMessage = errorMessage;
  },
  setWorkerSearchTerm(state, searchTerm) {
    state.workerSearchTerm = searchTerm;
  },
  setWorkerSelectedOrgId(state, orgId) {
    state.workerSelectedOrgId = orgId;
  },
  setWorkerCurrentPage(state, page) {
    // console.log(state.workerCurrentPage);
    state.workerCurrentPage = page;
  },
};
