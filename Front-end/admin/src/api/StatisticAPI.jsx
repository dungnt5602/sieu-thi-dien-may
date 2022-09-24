import axios from "axios";

const axiosClient = axios.create({
    baseURL: `http://localhost:8080/admin`,
    headers: {
        'content-type': 'application/json',
    }
})

const StatisticAPI = {
    async getStatistic(startDate, endDate) {
        const url = `statistic?startDate=${startDate}&endDate=${endDate}`
        return axiosClient.get(url)
    },

    async getYearStatistic(year) {
        const url = `/statistic/year?year=${year}`
        return axiosClient.get(url)
    }
}

export default StatisticAPI;