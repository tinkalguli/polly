import axios from "axios";
import { SESSIONS_URL, USERS_URL } from "./utils";

const login = payload => axios.post(SESSIONS_URL, payload);

const signup = payload => axios.post(USERS_URL, payload);

const logout = (id) => axios.delete(SESSIONS_URL + id);

const authApi = {
  login,
  signup,
  logout,
};

export default authApi;