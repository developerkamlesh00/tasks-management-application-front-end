export default {
    userId(state) {
      return state.userId;
    },
    token(state) {
      return state.token;
    },
    isAuthenticated(state) {
      return !!state.token;
    },
    role(state) {
      return state.role;
    },
    name(state) {
      return state.name;
    },
    organization(state) {
      return state.organization_id;
    }
  };