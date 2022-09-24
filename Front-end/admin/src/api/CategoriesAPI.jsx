import axios from "axios";

const axiosClient = axios.create({
    baseURL: `http://localhost:8080/admin/categories`,
    headers: {
        'content-type': 'application/json',
    }
})

const CategoriesAPI = {
    async getCategories(page, size) {
        return axiosClient.get(`?page=${page}&size=${size}`);
    },

    async getCategorybyId(id) {
        return axiosClient.get(`/${id}`);
    },

    async addCategory(category, accessToken) {
        const url = '';
        return axiosClient.post(url, category,
            {
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }
            }
        )
    },

    async updateCategory(category, accessToken) {
        const url = `${category.id}`
        return axiosClient.put(url, category,
            {
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }
            }
        )
    },

    async deleteCategory(id, accessToken) {
        const url = `${id}`
        return axiosClient.delete(url,
            {
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }
            }
        )
    },

    async getCategoryStatistic() {
        const url = `statistics`
        return axiosClient.get(url)
    },


}

export default CategoriesAPI;