export default {
    setUser(state, payload) {
      state.token = payload.token;
      state.name = payload.name;
      state.userId = payload.userId;
      state.role = payload.role;
      state.organization_id = payload.organization_id;
    },
  };