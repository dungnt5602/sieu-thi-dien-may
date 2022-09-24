import axios from "axios";

const axiosClient = axios.create({
    baseURL: `http://localhost:8080/auth/login`,
    headers: {
        'content-type': 'application/json',
    }
})

const LoginAPI = {
    async login(username, password) {
        return axiosClient.post(``, { username, password });
    }
}

export default LoginAPI;