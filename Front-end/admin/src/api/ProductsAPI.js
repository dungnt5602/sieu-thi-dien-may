import axios from 'axios'

const axiosClient = axios.create({
    baseURL: 'http://localhost:8080/admin/products',
    headers: {
        'content-type': 'application/json',
    }
})

const ProductsAPI = {
    async getProducts(currentPage, rowsPerPage) {
        // async getProducts() {
        const url = `http://localhost:8080/products?page=${currentPage}&size=${rowsPerPage}`;
        console.log(url)
        return axiosClient.get(url)
    },

    async getProductById(id) {
        const url = `http://localhost:8080/products/${id}`;
        return axiosClient.get(url)
    },

    async addProduct(product, accessToken) {
        const url = '';
        return axiosClient.post(url, product,
            {
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }
            }
        )
    },

    async updateProduct(product, accessToken) {
        const url = `/${product.id}`;
        return axiosClient.put(url, product,
            {
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }
            }
        )
    },

    async deleteProduct(id, status, accessToken) {
        const url = `/${id}`;
        return axiosClient.patch(url, status,
            {
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }
            }
        )
    },

    async getLowQuantityProducts(page, size) {
        const url = '/low-quantity?page=' + page + '&size=' + size;
        return axiosClient.get(url)
    },

    async getProductsByCategory(categoryId, page, size) {
        const url = `/category=${categoryId}?page=${page}&size=${size}`;
        return axiosClient.get(url)
    },

    async getProductsBySearch(search, page, size) {
        const url = `/name=${search}?page=${page}&size=${size}`;
        return axiosClient.get(url)
    },
}

export default ProductsAPI