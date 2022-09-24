import axios from "axios";

const axiosClient = axios.create({
    baseURL: `http://localhost:8080/admin`,
    headers: {
        'content-type': 'application/json',
    }
})

const UserAPI = {
    async createAccount(token, user) {
        const url = `/users`
        return axiosClient.post(url, user, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
    },
    async deleteAccout(token, userId) {
        const url = `/users/${userId}`;
        return axiosClient.delete(url, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
    },
    async updateAccount(token, userId, user) {
        const url = `/users/${userId}`;
        return axiosClient.put(url, user, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
    }
}

export default UserAPI;