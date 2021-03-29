import axios from "axios";

const login = payload => axios.post("/sessions", payload);

const signup = payload => axios.post("/users", payload);

const logout = (id) => axios.delete(`/sessions/${id}`);

const authApi = {
  login,
  signup,
  logout,
};

export default authApi;