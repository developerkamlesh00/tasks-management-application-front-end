export default {
  recentUsers(state) {
    return state.recentUsers;
  },

  orgIds(state) {
    return [
      ...new Set(state.directors.map((director) => director.organization_id)),
    ];
  },
  filteredDirectors(state) {
    const filteredDirectors = state.directors;
    if (state.searchTerm.trim()) {
      const searchTerm = state.searchTerm.toLowerCase();
      return filteredDirectors.filter((director) =>
        director.name.toLowerCase().includes(searchTerm)
      );
    }
    if (state.selectedOrgId !== "") {
      return filteredDirectors.filter(
        (director) => director.organization_id === state.selectedOrgId
      );
    }
    return filteredDirectors;
  },
  totalPageCount(state, getters) {
    return Math.ceil(getters.filteredDirectors.length / state.directorsPerPage);
  },
  pagedDirectors(state, getters) {
    const start = (state.currentPage - 1) * state.directorsPerPage;
    const end = start + state.directorsPerPage;
    return getters.filteredDirectors.slice(start, end);
  },

  ///////Manager
  managerOrgIds: (state) => {
    return [
      ...new Set(state.managers.map((manager) => manager.organization_id)),
    ];
  },
  filteredManagers: (state) => {
    let filteredManagers = state.managers;
    if (state.managerSearchTerm.trim()) {
      const managerSearchTerm = state.managerSearchTerm.toLowerCase();
      filteredManagers = filteredManagers.filter((manager) =>
        manager.name.toLowerCase().includes(managerSearchTerm)
      );
    }
    if (state.managerSelectedOrgId !== "") {
      filteredManagers = filteredManagers.filter(
        (manager) => manager.organization_id === state.managerSelectedOrgId
      );
    }
    return filteredManagers;
  },
  managerTotalPageCount: (state, getters) => {
    return Math.ceil(getters.filteredManagers.length / state.managersPerPage);
  },
  pagedManagers: (state, getters) => {
    const start = (state.managerCurrentPage - 1) * state.managersPerPage;
    const end = start + state.managersPerPage;
    return getters.filteredManagers.slice(start, end);
  },

  ///////Worker 
  workerOrgIds(state) {
    return [...new Set(state.workers.map((worker) => worker.organization_id))];
  },

  filteredWorkers(state,) {
    return state.workers.filter((worker) => {
      const nameMatch = worker.name.toLowerCase().includes(state.workerSearchTerm.toLowerCase());
      const orgIdMatch = state.workerSelectedOrgId ? worker.organization_id === parseInt(state.workerSelectedOrgId) : true;
      return nameMatch && orgIdMatch;
    });
  },  
  workerTotalPageCount(state, getters) {
    return Math.ceil(getters.filteredWorkers.length / state.workersPerPage);
  },
  pagedWorkers(state, getters) {
    const start = (state.workerCurrentPage - 1) * state.workersPerPage;
    const end = start + state.workersPerPage;
    return getters.filteredWorkers.slice(start, end);
  },
  
};
