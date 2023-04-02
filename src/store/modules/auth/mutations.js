export default {
    setUser(state, payload) {
      state.token = payload.token;
      state.userId = payload.userId;
      state.didAutoLogout = false;
      state.role = payload.role;
    },
    setAutoLogout(state) {
      state.didAutoLogout = true;
    }
  };