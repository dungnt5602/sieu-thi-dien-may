import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:8080/users',
  headers: {
      'content-type': 'application/json',
  }
})

const accountAPI ={
  async getUser(id) {
    const url = `${id}`;
    return axiosClient.get(url);
  }
}

export default accountAPI;