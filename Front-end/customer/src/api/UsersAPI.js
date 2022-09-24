import axios from "axios";
const token = JSON.parse(localStorage.getItem("access_token")) ?  JSON.parse(localStorage.getItem("access_token")) : null;

const axiosClient = axios.create({
    baseURL: "http://localhost:8080/users",
    headers: {
        "content-type": "application/json",
    },
});

const userId1 = 1;

const UsersAPI = {
    async getUserById(token, userId) {
        const url = `/${userId}`;
        return axiosClient.get(url, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
    },
};

export default UsersAPI;