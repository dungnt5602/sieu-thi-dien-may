import axiosClient from "../api/axiosClient";

export async function login(data) {
  try {
    // console.log(data);
    const response = await axiosClient.post(`/login`, JSON.stringify(data));
    return response;
  } catch (e) {
    return e.response;
  }
}

export const register = (data) => {
  return axiosClient.post("/register", data);
};
