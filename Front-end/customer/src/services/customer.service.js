import { getAlertTitleUtilityClass } from "@mui/material";
import axiosClient from "../utils/clientAxios";

export const getCart = (body) => {
  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };

  axiosClient.post("/cart/getAll", body, config);
};
