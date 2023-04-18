export default {
  SET_DIRECTORS(state, directors) {
    state.directors = directors;
    // console.log(directors);
  },
  SET_ERROR_MESSAGE(state, errorMessage) {
    state.errorMessage = errorMessage;
  },
  deleteDirectorSuccess(state, payload) {
    const index = state.directors.findIndex(
      (director) => director.id === payload.directorId
    );

    if (index > -1) {
      state.directors.splice(index, 1);
    }
  },
  SET_MANAGERS(state, managers) {
    state.managers = managers;
    // console.log(directors);
  },
  SET_ERROR_MESSAGE_MAANGER(state, errorMessageManager) {
    state.errorMessageManager = errorMessageManager;
  },
  deleteManagerSuccess(state, payload) {
    const index = state.managers.findIndex(
      (manager) => manager.id === payload.managerId
    );

    if (index > -1) {
      state.managers.splice(index, 1);
    }
  },
};
