import axios from "axios";

const token = JSON.parse(localStorage.getItem("access_token")) ?  JSON.parse(localStorage.getItem("access_token")) : null;

const axiosClient = axios.create({
    baseURL: "http://localhost:8080/carts",
    headers: {
        "content-type": "application/json",
        "Authorization": `Bearer ${token}`,
    },
});

const axiosClientAuth = axios.create({
    baseURL: "http://localhost:8080/carts",
    headers: {
        "content-type": "application/json",
    },
});

const userId1 = 1;

const CartsAPI = {
    async getCartByUserId(userId, accessToken) {
        const url = `/users/${userId}`;
        return axiosClientAuth.get(url, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
    },

    async removeCartItemByUserId(userId, cartItem, accessToken) {
        const url = `/users/${userId}`;
        return axiosClientAuth.delete(url, { data: cartItem }, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }            
        });
    },

    async updateCartItemByUserId(userId, product, cartItem, accessToken) {
        const url = `/users/${userId}/products/${product.id}`;
        return axiosClient.put(url, cartItem, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }            
        });
    },
    async addProductToCart(userId, cartItem, accessToken) {
        const url = `/users/${userId}`;
        return axiosClientAuth.post(url, cartItem, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
    },
};

export default CartsAPI;