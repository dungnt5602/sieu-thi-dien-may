import axios from "axios";

const axiosClient = axios.create({
    baseURL: `http://localhost:8080/orders`,
    headers: {
        'content-type': 'application/json',
    }
})

const OrderAPI = {
    async getOrders(page, size) {
        return axiosClient.get(`?page=${page}&size=${size}`);
    },

    async getPaidOrders(date, page, size) {
        return axiosClient.get(`/paid?page=${page}&size=${size}&date=${date}`);
    },

    async getUnpaidOrders(date, page, size) {
        return axiosClient.get(`/unpaid?page=${page}&size=${size}&date=${date}`);
    },

    async getOrderById(id) {
        return axiosClient.get(`/${id}/products`);
    },

    async getOrderByUserId(id, page, size) {
        return axiosClient.get(`/user/${id}?page=${page}&size=${size}`);
    },

    async updateOrderStatus(id, status) {
        const url = `${id}/`
        return axiosClient.patch(url, status)
    },

    async getOrdersByDate(date, page, size) {
        const url = `/date=${date}?page=${page}&size=${size}`
        return axiosClient.get(url)
    }
}

export default OrderAPI;