import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import GlobalState from "../GlobalState";

export const PrivateRoute = ({ children }) => {
  const { accessToken } = useContext(GlobalState);
  if (accessToken) {
    // user is authenticated
    return <Navigate to="/" />;
  }
  return children;
};
