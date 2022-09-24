import React from "react";
import { Box, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import CategoryNav from "./CategoryNav";
import "./header.css";

const subNav = [
  {
    title: "Trang chủ",
    link: "/",
  },
  {
    title: "Giới thiệu",
    link: "/introduction",
  },
  {
    title: "Sản phẩm",
    link: "/products",
  },
  {
    title: "Khuyến mãi",
    link: "/promotions",
  },
];

const MainNav = () => {
  return (
    <Box className="mainNav">
      <Stack direction="row" sx={{ width: "1170px" }}>
        <CategoryNav />
        {subNav.map((nav, index) => {
          return (
            <Link
              key={index}
              to={nav.link}
              className="pageNav text-decoration-none"
            >
              {nav.title}
            </Link>
          );
        })}
        <a href="#footer" className="pageNav">
          Liên hệ
        </a>
      </Stack>
    </Box>
  );
};

export default MainNav;
