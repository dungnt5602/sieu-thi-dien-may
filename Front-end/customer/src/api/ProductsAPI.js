import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8080/products",
  headers: {
    "content-type": "application/json",
  },
});

const ProductsAPI = {
  async getProducts(category, search, currentPage, filter) {
    let url;
    if (category === undefined)
      url = `?search=${search}&page=${currentPage - 1}&size=20${filter}`;
    else if (search.length > 0)
      url = `?search=categoryCode:${category}_AND_${search}&page=${currentPage - 1
        }&size=20${filter}`;
    else
      url = `?search=categoryCode:${category}&page=${currentPage - 1
        }&size=20${filter}`;
    return axiosClient.get(url);
  },
  async getProductById(productId) {
    const url = `/${productId}`;
    return axiosClient.get(url);
  },
  async getProductByName(key, currentPage) {
    const url = `/name=${key}?page=${currentPage - 1}&size=8`;
    return axiosClient.get(url);
  },
  async getTop10Discount() {
    const url = `/top10`;
    return axiosClient.get(url);
  },
  async getProductsByCategory(categoryId, currentPage, filter) {
    const url = `/category=${categoryId}?page=${currentPage - 1
      }&size=20${filter}`;
    return axiosClient.get(url);
  },
  async getProductsBrands(category) {
    let url;
    if (category === undefined) url = `/brands`;
    else url = `/brands?category=${category}`;
    return axiosClient.get(url);
  },
};

export default ProductsAPI;
