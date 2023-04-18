import axios from "axios";

export default {
  toggleDirectors({ commit }) {
    axios
      .get("http://127.0.0.1:8000/api/admin/directors")
      .then((response) => {
        commit("SET_DIRECTORS", response.data);
      })
      .catch((error) => {
        console.log(error);
        commit(
          "SET_ERROR_MESSAGE",
          "Failed to fetch directors. Please try again later."
        );
      });
  },
  deleteDirector({ commit }, directorId) {
    axios
      .post(`http://127.0.0.1:8000/api/admin/users/${directorId}`)
      .then((response) => {
        const payload = {
          directorId,
          response,
        };
        commit("deleteDirectorSuccess", payload);
      })
      .catch((error) => {
        console.log(error);
        const errorMessage =
          "Failed to delete director. Please try again later.";
        commit("SET_ERROR_MESSAGE", errorMessage);
      });
  },
  toggleManagers({ commit }) {
    axios
      .get("http://127.0.0.1:8000/api/admin/managers")
      .then((response) => {
        commit("SET_MANAGERS", response.data);
      })
      .catch((error) => {
        console.log(error);
        commit(
          "SET_ERROR_MESSAGE_MANAGER",
          "Failed to fetch managers. Please try again later."
        );
      });
  },
  deleteManagers({ commit }, managerId) {
    axios
      .post(`http://127.0.0.1:8000/api/admin/users/${managerId}`)
      .then((response) => {
        const payload = {
            managerId,
          response,
        };
        commit("deleteManagerSuccess", payload);
      })
      .catch((error) => {
        console.log(error);
        const errorMessageManager =
          "Failed to delete manager. Please try again later.";
        commit("SET_ERROR_MESSAGE_MANAGER", errorMessageManager);
      });
  },
};
