import axios from "axios";

const axiosClient = axios.create({
  baseURL: "localhost:8080",
  headers: {
    "Content-type": "application/json",
  },
});

export default axiosClient;
