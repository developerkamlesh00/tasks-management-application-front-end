import router from '@/router';
import { createStore } from 'vuex';


const store = createStore({
    
  state() {
    return {
      isLoggedIn: false
    };
  },
  mutations: {
    authenticate(state, loginStatus) {
      state.isLoggedIn = loginStatus;
    }
  },
  actions: {
    login({ commit }) {
      commit('authenticate', true);
    },
    logout({ commit }) {
      commit('authenticate', false);
      router.push({name:'login'})
    }
  },
  getters: {
    isAuthenticated(state) {
      return state.isLoggedIn;
    }
  }
});

export default store;