import axios from "axios";

const axiosClient = axios.create({
    baseURL: `http://localhost:8080/admin/tags`,
    headers: {
        'content-type': 'application/json',
    }
})

const CategoriesAPI = {
    async getTags() {
        return axiosClient.get(`?page=0&size=1000`);
    },

    async addTags(tag, accessToken) {
        const url = '';
        return axiosClient.post(url, tag,
            {
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }
            }
        )
    }
}

export default CategoriesAPI;