import React from "react";
import "./Header.scss";
import {
  Badge,
  Container,
  IconButton,
  Typography,
  InputBase,
} from "@mui/material";
import { NavBar } from "./NavBar";
import { styled, alpha, createTheme } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import PersonIcon from "@mui/icons-material/Person";
import LocalMallIcon from "@mui/icons-material/LocalMall";

const Search = styled("div")(({ theme }) => {
  return {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 1),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 1),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  };
});

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 0, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: "100%",
    transition: theme.transitions.create("width"),

    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  padding: theme.spacing(1, 1),
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  color: alpha(theme.palette.common.white, 1),
}));



const HeaderBar = () => (
  <Container className="text-black d-flex flex-row py-3 align-center">
    <div className="header_top col-3 fs-2 text-black">
      <a href="/" className="logo">
        <Typography sx={{ color: "white" }} variant="h4">
          Siêu thị điện máy
        </Typography>
      </a>
    </div>
    <div className="header_search col-4 flex-grow-1">
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Tìm kiếm..."
          inputProps={{ "aria-label": "search" }}
        />
      </Search>
    </div>
    <div className="header_tool header_hotline col-2 px-3 d-flex flex-row align-center">
      <StyledIconButton>
        <LocalPhoneIcon />
      </StyledIconButton>
      <div className="d-flex flex-column">
        <Typography
          sx={{ color: "white", paddingLeft: 1, fontWeight: 700 }}
          variant="caption"
        >
          1900 6750
        </Typography>
        <Typography
          sx={{ color: "white", paddingLeft: 1, fontWeight: 700 }}
          variant="caption"
        >
          Tổng đài miễn phí
        </Typography>
      </div>
    </div>
    <div className="header_tool header_account col-2 px-3 d-flex flex-row align-center">
      <StyledIconButton>
        <PersonIcon />
      </StyledIconButton>
      <div className="d-flex flex-column">
        <Typography
          sx={{ color: "white", paddingLeft: 1, fontWeight: 700 }}
          variant="caption"
        >
          Tài khoản
        </Typography>
        <Typography
          sx={{ color: "white", paddingLeft: 1, fontWeight: 700 }}
          variant="caption"
        >
          Xin chào
        </Typography>
      </div>
    </div>
    <div className="header_tool header_cart col-1 px-3">
      <StyledIconButton>
        <Badge badgeContent={4} color="warning">
          <LocalMallIcon />
        </Badge>
      </StyledIconButton>
    </div>
  </Container>
);



export const Header = () => {
  return (
    <>
      <div className="header_top" style={{ background: "#ca2b2d" }}>
        <HeaderBar />
      </div>
      <div className="header_navbar">
        <NavBar />
      </div>
    </>
  );
};
