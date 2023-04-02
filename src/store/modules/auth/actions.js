import axios from "axios";

export default {
  async login(context, payload) {
    return context.dispatch("auth", {
      ...payload,
    });
  },

  async auth(context, payload) {
    await axios
      .post("http://localhost:8000/api/login", payload)
      .then(function (response) {
        // console.log(response);
        // console.log(response.status);
        if (response.status === 203) {
          const error = new Error(
            "Failed to authenticate. Check your login data."
          );
          throw error;
        }

        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.userId);
        localStorage.setItem('role', response.data.role);

        context.commit("setUser", {
          token: response.data.token,
          userId: response.data.userId,
          role: response.data.role,
        });
        
      });
  },
  tryLogin(context) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const role = localStorage.getItem('role');

    console.log(token);
    console.log(userId);
    console.log(role);

    if (token && userId) {
      context.commit('setUser', {
        token: token,
        userId: userId,
        role: role
      });
    }
  },
  logout(context) {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('tokenExpiration');
    localStorage.removeItem('role');

    context.commit('setUser', {
      token: null,
      userId: null,
      role:null,
    });
  },
};
