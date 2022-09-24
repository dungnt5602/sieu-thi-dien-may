import { Button, Container, Grid } from "@mui/material";
import React, { useState, useContext, useEffect } from "react";
import { OrdersList } from "./OrderList/OrdersList";
import { ChangePassword } from "./ChangePassword/ChangePassword";
import GlobalState from "../../GlobalState";
import accountAPI from "../../api/AccountAPI";
import { useNavigate } from "react-router-dom";
import "./Account.scss";

export const Account = () => {
  const { userId, username, accessToken } = useContext(GlobalState);
  const [accountInfo, setAccountInfo] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      navigate("/", { replace: true });
    }
  }, [accessToken]);

  useEffect(() => {
    console.log(userId);
    accountAPI
      .getUser(userId)
      .then((response) => {
        // console.log(response?.data);
        setAccountInfo(response?.data);
        // console.log(accountInfo);
        // console.log(accountInfo.orderQuantity);
      })
      .catch((err) => {
        console.log(err);
        if (!err?.response) {
          console.log("không nhận resp từ server");
        } else if (err.response?.status === 400) {
          console.log("Không có user");
        }
      });
  }, [accessToken]);

  const accountInfos = [
    { field: "name", title: "Họ tên", value: accountInfo.name },
    { field: "username", title: "Username", value: accountInfo.username },
    { field: "email", title: "Email", value: accountInfo.email },
    { field: "mobile", title: "Điện thoại", value: accountInfo.mobile },
    { field: "address", title: "Địa chỉ", value: accountInfo.address },
  ];

  const [currentSidePage, setSidePage] = useState(0);

  const ordersListClickHandler = (e) => {
    setSidePage(0);
  };

  const changePasswClickHandler = (e) => {
    setSidePage(1);
  };

  return (
    <div className="account-wrapper bg-white">
      <Container className=" px-3 py-3">
        <Grid container className="account-container" spacing={2} columns={12}>
          <Grid item xs={3} className="account-infor-tab">
            <div className="account-infor-title mb-4">
              <h2>
                Xin chào,{" "}
                <span style={{ color: "#CA2B2D", fontWeight: "bold" }}>
                  {username}
                </span>
                !
              </h2>
              <h2>Thông tin cá nhân</h2>
            </div>
            <div className="account-infor-detail">
              {accountInfos.map((info) => (
                <p className="account-infor" key={info.field}>
                  <span style={{ fontWeight: "bold" }}>{info.title}: </span>
                  {info.value}
                </p>
              ))}
            </div>
            <div className="action-btn my-3">
              <Button
                component="button"
                variant={currentSidePage === 0 ? "outlined" : "text"}
                className="orders-list-btn my-1"
                color="error"
                onClick={(e) => ordersListClickHandler(e)}
              >
                Đơn hàng của bạn
              </Button>
              <br />
              <Button
                component="button"
                variant={currentSidePage === 1 ? "outlined" : "text"}
                className="change-password-btn my-1"
                color="error"
                onClick={(e) => changePasswClickHandler(e)}
              >
                Đổi mật khẩu
              </Button>
            </div>
          </Grid>
          <Grid item xs={9}>
            {currentSidePage === 0 ? (
              <OrdersList ordersQuantity={accountInfo.ordersQuantity} />
            ) : (
              <ChangePassword />
            )}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
