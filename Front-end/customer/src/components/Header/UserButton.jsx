import React, { useContext } from "react";
import { Avatar, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import GlobalState from "../../GlobalState";

const subNavPreLogin = [
  {
    field: "login",
    title: "Đăng nhập",
    link: "account/login",
  },
  {
    field: "register",
    title: "Đăng ký",
    link: "account/register",
  },
];

const subNavPostLogin = [
  {
    field: "account",
    title: "Tài khoản",
    link: "account",
  },
  {
    field: "logout",
    title: "Đăng xuất",
    link: "account/logout",
  },
];

const UserButton = () => {
  const { accessToken, username } = useContext(GlobalState);
  const subNav = accessToken ? subNavPostLogin : subNavPreLogin;
  
  // console.log(subNav);

  return (
    <Stack direction="row" spacing={1} className="user-button">
      <Avatar sx={{ width: "35px", height: "35px", bgcolor: "#a90019" }}>
        <PersonIcon sx={{ width: "21px" }} />
      </Avatar>
      <Stack sx={{ alignItems: "flex-start" }}>
        <Typography variant="body2" sx={{ fontWeight: "500", mt: "5px" }}>
          {accessToken? username : "Tài khoản"}
        </Typography>
        <Typography sx={{ fontSize: "12px" }}>Xin chào</Typography>
      </Stack>

      <Stack className="subnav-container">
        <Stack sx={{ display: "none" }}>
          {subNav.map((nav) => {
            return (
              <Link
                key={nav.field}
                to={nav.link}
                className="subnav-item text-decoration-none"
              >
                {nav.title}
              </Link>
            );
          })}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default UserButton;
