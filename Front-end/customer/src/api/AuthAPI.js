import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8080/auth",
  headers: {
    "content-type": "application/json",
  },
});

const AuthAPI = {
  async login(account) {
    const url = `login`;
    return axiosClient.post(url, account);
  },

  async register(registerRequest) {
    const url = `register`;
    return axiosClient.post(url, registerRequest);
  },
};

export default AuthAPI;
