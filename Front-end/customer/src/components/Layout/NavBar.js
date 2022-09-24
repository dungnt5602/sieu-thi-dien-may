import React from "react";
import "./NavBar.scss";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Button,
  Container,
  Typography,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";

const StyledTextButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1, 3),
  textTransform: "none",
  borderRadius: 0,
  "&:hover": {
    background: "#ffc700",
    color: "black",
  },
}));

export const NavBar = () => {
  return (
    <Container className="d-flex flex-row text-white align-items-center">
      <div
        className="category_list col-3 p-2 d-flex flex-row"
        style={{ background: "#ca2b2d" }}
      >
        <MenuIcon sx={{ marginRight: 2 }} />
        <Typography>Danh mục sản phẩm</Typography>

      </div>
      <div className="nav_item home text-black ">
        <StyledTextButton variant="text" href="/home" sx={{ color: "black" }}>
          Trang chủ
        </StyledTextButton>
      </div>
      <div className="nav_item introduce text-black ">
        <StyledTextButton
          variant="text"
          href="/introduce"
          sx={{ color: "black" }}
        >
          Giới thiệu
        </StyledTextButton>
      </div>
      <div className="nav_item product text-black ">
        <StyledTextButton
          variant="text"
          href="/product"
          sx={{ color: "black" }}
        >
          Sản phẩm
        </StyledTextButton>
      </div>
      <div className="nav_item contact text-black ">
        <StyledTextButton
          variant="text"
          href="/contact"
          sx={{ color: "black" }}
        >
          Liên hệ
        </StyledTextButton>
      </div>
    </Container>
  );
};
