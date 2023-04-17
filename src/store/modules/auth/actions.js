import setAuthHeader from "@/utils/setHeader";
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

        //setHeader Token
        setAuthHeader(response.data.token);

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("name", response.data.name);
        localStorage.setItem("role", response.data.role);
        localStorage.setItem("organization_id", response.data.organization_id);

        context.commit("setUser", {
          token: response.data.token,
          userId: response.data.userId,
          name: response.data.name,
          role: response.data.role,
          organization_id: response.data.organization_id,
        });
      });
  },
  tryLogin(context) {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const name = localStorage.getItem("name");
    const role = localStorage.getItem("role");
    const organization_id = localStorage.getItem("organization_id");

    //setHeader Token
    setAuthHeader(token);

    // console.log(token);
    
    console.log("user_id",userId);
    console.log("role_id",role);

    if (token && userId) {
      context.commit("setUser", {
        token: token,
        userId: userId,
        name: name,
        role: role,
        organization_id:organization_id,
      });
    }
  },
  logout(context) {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("name");
    localStorage.removeItem("role");
    localStorage.removeItem("organization_id");

    setAuthHeader(false); //reset setHeader token

    context.commit("setUser", {
      token: null,
      userId: null,
      name: null,
      role: null,
      organization_id: null,
    });
  },
};
