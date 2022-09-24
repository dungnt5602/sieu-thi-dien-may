import axios from "axios";

const token = JSON.parse(localStorage.getItem("access_token")) ?  JSON.parse(localStorage.getItem("access_token")) : null;

const axiosClient = axios.create({
  baseURL: "http://localhost:8080/orders",
  headers: {
    "content-type": "application/json",
  },
});

const userId1 = 1;

const OrdersApi = {
  async createOrderByUserId(userId, user, accessToken) {
    const url = `/users/${userId}`;
    return axiosClient.post(url, user, {
      headers: {
          'Authorization': `Bearer ${accessToken}`
      }  
    });
  },

  async getOrdersByUserId(userId) {
    const url = `users/${userId}`;
    return axiosClient.get(url);
  },
};

export default OrdersApi;
