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
        console.log(response);
        console.log(response.status);
        if (response.status === 203) {
          const error = new Error(
            "Failed to authenticate. Check your login data."
          );
          throw error;
        }
        context.commit("setUser", {
          token: response.data.token,
          userId: response.data.userId,
          role: response.data.role,
          //userId: responseData.localId,
        });
        // return response;
      });

    //const responseData = await response.json();

    // const responseData = response;
    // console.log(responseData);
    // console.log(response.status);
    // if (!response.ok) {
    //   const error = new Error(
    //     responseData.message || 'Failed to authenticate. Check your login data.'
    //   );
    //   console.log(error);
    //   throw error;
    // }
    // console.log(responseData);

    //const expiresIn = +responseData.expiresIn * 1000;
    // const expiresIn = 5000;
    //const expirationDate = new Date().getTime() + expiresIn;

    // localStorage.setItem('token', responseData.Token);
    // localStorage.setItem('userId', responseData.localId);
    // localStorage.setItem('tokenExpiration', expirationDate);

    // timer = setTimeout(function() {
    //   context.dispatch('autoLogout');
    // }, expiresIn);

    // context.commit('setUser', {
    //   token: responseData.idToken,
    //   userId: responseData.localId
    // });
  },
  // tryLogin(context) {
  //   const token = localStorage.getItem('token');
  //   const userId = localStorage.getItem('userId');
  //   const tokenExpiration = localStorage.getItem('tokenExpiration');

  //   const expiresIn = +tokenExpiration - new Date().getTime();

  //   if (expiresIn < 0) {
  //     return;
  //   }

  //   timer = setTimeout(function() {
  //     context.dispatch('autoLogout');
  //   }, expiresIn);

  //   if (token && userId) {
  //     context.commit('setUser', {
  //       token: token,
  //       userId: userId
  //     });
  //   }
  // },
  // logout(context) {
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('userId');
  //   localStorage.removeItem('tokenExpiration');

  //   clearTimeout(timer);

  //   context.commit('setUser', {
  //     token: null,
  //     userId: null
  //   });
  // },
  // autoLogout(context) {
  //   context.dispatch('logout');
  //   context.commit('setAutoLogout');
  // }
};
