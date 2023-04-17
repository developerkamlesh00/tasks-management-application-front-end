import axios from "axios";

export default {
  async fetchRecentUsers({ commit }) {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/admin/recent-users"
      );
      commit("SET_RECENT_USERS", response.data); 
    } catch (error) {
      console.error(error);
    }
  },

  async toggleDirectors({ commit }) {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/admin/directors"
      );
      commit("SET_DIRECTORS", response.data);
    } catch (error) {
      console.log(error);
      commit(
        "SET_ERROR_MESSAGE",
        "Failed to fetch directors. Please try again later."
      );
    }
  },
  async deleteDirector({ commit, state }, directorId) {
    console.log(directorId);
    // Call the delete API endpoint here
    if (confirm("Are you sure you want to delete this director?")) {
      try {
        const response = await axios.post(
          `http://127.0.0.1:8000/api/admin/users/${directorId}`
        );
        const index = state.directors.findIndex(
          (director) => director.id === directorId
        );

        if (index > -1) {
          state.directors.splice(index, 1);
        }
        console.log(response);
      } catch (error) {
        console.log(error);
        commit(
          "SET_ERROR_MESSAGE",
          "Failed to delete director. Please try again later."
        );
      }
    }
  },
  resetSearch({ commit, dispatch }) {
    commit("SET_SEARCH_TERM", "");
    commit("SET_SELECTED_ORG_ID", "");
    commit("SET_CURRENT_PAGE", 1);
    dispatch("toggleDirectors");
  },
  changePage({ commit }, page) {
    commit("SET_CURRENT_PAGE", page);
  },
  //////// manager
  toggleManagers({ commit }) {
    axios
      .get("http://127.0.0.1:8000/api/admin/managers")
      .then((response) => {
        commit("setManagers", response.data);
      })
      .catch((error) => {
        console.log(error);
        commit(
          "setManagerErrorMessage",
          "Failed to fetch managers. Please try again later."
        );
      });
  },
  deleteManager({ state, commit }, managerId) {
    if (
      confirm(
        "Are you sure you want to delete this manager? This action cannot be undone."
      )
    ) {
      axios
        .post(`http://127.0.0.1:8000/api/admin/users/${managerId}`)
        .then((response) => {
          const index = state.managers.findIndex(
            (manager) => manager.id === managerId
          );
          if (index > -1) {
            state.managers.splice(index, 1);
          }
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
          commit(
            "setManagerErrorMessage",
            "Failed to delete manager. Please try again later."
          );
        });
    }
  },
  managerResetSearch({ commit, dispatch }) {
    commit("setManagerSearchTerm", "");
    commit("setManagerSelectedOrgId", "");
    commit("setManagerCurrentPage", 1);
    dispatch("deleteManager");
  },
  changeManagerPage({ commit }, page) {
    commit("setManagerCurrentPage", page);
  },

///////Worker

  toggleWorkers({ commit }) {
    axios
      .get('http://127.0.0.1:8000/api/admin/workers')
      .then((response) => {
        commit('setWorkers', response.data);
      })
      .catch((error) => {
        console.log(error);
        commit(
          'setWorkerErrorMessage',
          'Failed to fetch workers. Please try again later.'
        );
      });
  },
  deleteWorker({ commit, state }, workerId) {
    console.log(workerId);
    // Call the delete API endpoint here

    if (confirm('Are you sure you want to delete this worker?')) {
      axios
        .post(`http://127.0.0.1:8000/api/admin/users/${workerId}`)
        .then((response) => {
          const index = state.workers.findIndex(
            (worker) => worker.id === workerId
          );

          if (index > -1) {
            state.workers.splice(index, 1);
          }
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
          commit(
            'setWorkerErrorMessage',
            'Failed to delete worker. Please try again later.'
          );
        });
    }
  },
  workerResetSearch({ commit, dispatch }) {
    commit('setWorkerSearchTerm', '');
    commit('setWorkerSelectedOrgId', '');
    commit('setWorkerCurrentPage', 1);
    dispatch('toggleWorkers');
  },
  workerChangePage({ commit }, page) {
    commit('setWorkerCurrentPage', page);
  },
  workerResetPage({ commit }) {
    commit('setWorkerCurrentPage', 1);
  }
};
