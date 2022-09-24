import React, { useContext, useEffect, useState } from "react";
import GlobalState from "../../../GlobalState";
import { useNavigate } from "react-router-dom";
import { Button, Snackbar, Slide, Alert } from "@mui/material";

export const Logout = () => {
  const context = useContext(GlobalState);
  const navigate = useNavigate();
  const [open, setOpen] = useState("true");

  useEffect(() => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    context.setAccessToken("");
    context.setUserId(0);
    context.setUsername("");
    context.setUserId(0);
    context.setCart([]);
    context.setTotalCost(0);
    setOpen("false");
    navigate("/", { replace: true });
  }, []);

  return <></>;
};
