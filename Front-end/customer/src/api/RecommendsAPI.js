import axios from "axios";
const token = JSON.parse(localStorage.getItem("access_token")) ?  JSON.parse(localStorage.getItem("access_token")) : null;

const axiosClient = axios.create({
    baseURL: "http://localhost:8080/recommends",
    headers: {
        "content-type": "application/json",
    },
});
const axiosClientAuth = axios.create({
    baseURL: "http://localhost:8080/recommends",
    headers: {
        "content-type": "application/json",
        "Authorization": `Bearer ${token}`,
    },
});

const userId1 = 1;

const RecommendsAPI = {
    async getRecommendsForProductDetail(productId) {
        const url = `/products/${productId}`;
        return axiosClient.get(url);
    },

    async getRecommendForLoginUser(userId, accessToken) {
        const url = `/users/${userId}`;
        return axiosClientAuth.get(url, {
            headers: {
                'Authorization':`Bearer ${accessToken}` 
            }
        });
    },

    async getRecommendForSessionUser(recommendData) {
        const url = ``;
        return axiosClient.post(url, recommendData);
    },

    async saveRecommendDataForLoginUser(userId, productId, accessToken) {
        const url = `/users/${userId}/products/${productId}`;
        return axiosClientAuth.post(url, {}, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
    }
};

export default RecommendsAPI;
