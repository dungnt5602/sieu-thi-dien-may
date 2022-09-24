import React from "react";
import { styled, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import { Box, Button, Menu, MenuItem } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import "./Drawer.scss";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [openNest, setOpenNest] = React.useState(false);
  const nav = useNavigate();
  const route = useLocation();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openEl = Boolean(anchorEl);

  const handleClickEl = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseEl = () => {
    setAnchorEl(null);
  };

  const handleClick = () => {
    setOpenNest(!openNest);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setOpenNest(false);
  };

  const navDashboard = () => {
    nav("dashboard");
  };

  const navOrder = () => {
    nav("order");
  };

  const navCustomer = () => {
    nav("customer");
  };

  const navProduct = () => {
    nav("products");
  };

  const navCategory = () => {
    nav("categories");
  };

  const navAnalysis = () => {
    nav("analysis");
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    nav("/");
  };
  return (
    <>
      {/* <Box sx={{ display: 'flex' }}> */}
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        className="header"
        sx={{ backgroundColor: "#3b87f7" }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <i class="fa-solid fa-ellipsis-vertical"></i>
          </IconButton>
          <Button
            color="inherit"
            sx={{
              marginLeft: "90%",
              border: "2px solid white",
              borderRadius: "5px",
            }}
            id="basic-button"
            aria-controls={openEl ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openEl ? "true" : undefined}
            onClick={handleClickEl}
          >
            <Box sx={{ display: "flex" }}>
              <i class="fa-solid fa-user-tie"></i>
              {/* <Typography variant="h8" noWrap component="div">
                                {localStorage.getItem('username')}
                            </Typography> */}
            </Box>
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={openEl}
            onClose={handleCloseEl}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
            sx={{ marginTop: "10px" }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginLeft: "10px",
                marginRight: "10px",
              }}
            >
              <Typography variant="h8" noWrap component="div">
                Người dùng hiện tại: {localStorage.getItem("username")}
              </Typography>
              <Divider />
              <MenuItem onClick={() => nav("./account")}>
                Thông tin tài khoản
              </MenuItem>
              <MenuItem onClick={logout}>Đăng xuất</MenuItem>
            </Box>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
        className="drawer-wrapper"
        sx={{ boxShadow: "3px 0px 4px -1px rgb(0 0 0 / 20%)" }}
      >
        <DrawerHeader
          sx={{
            backgroundColor: "#3b87f7",
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <a href="/admin">
            <img
              class="logo--full"
              alt="SAPO logo"
              src="https://sapo.dktcdn.net/fe-cdn-production/images/sapo-pos-w.png"
              width="130"
            ></img>
          </a>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <i
                class="fa-solid fa-ellipsis-vertical"
                style={{ color: "white" }}
              ></i>
            ) : (
              <i
                class="fa-solid fa-ellipsis-vertical"
                style={{ color: "white" }}
              ></i>
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List className="nav-list">
          <ListItem
            disablePadding
            sx={{ display: "block" }}
            className={
              route.pathname === "/admin" ||
              route.pathname.includes("dashboard")
                ? "list-item active-item"
                : "list-item"
            }
          >
            <ListItemButton onClick={navDashboard}>
              <ListItemIcon>
                <i class="fa-solid fa-house icon"></i>
              </ListItemIcon>
              <ListItemText
                primary="Tổng quan"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            sx={{ display: "block" }}
            className={
              route.pathname.includes("order")
                ? "list-item active-item"
                : "list-item"
            }
          >
            <ListItemButton onClick={navOrder}>
              <ListItemIcon>
                <i class="fa-solid fa-paste"></i>
              </ListItemIcon>
              <ListItemText primary="Đơn hàng" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            sx={{ display: "block" }}
          >
            <ListItemButton onClick={handleClick} className={
              openNest === false &&
              (route.pathname.includes("products") ||
                route.pathname.includes("categories"))
                ? "list-item active-item"
                : "list-item"
            }>
              <ListItemIcon>
                <i class="fa-solid fa-cube"></i>
              </ListItemIcon>
              <ListItemText primary="Sản phẩm" sx={{ opacity: open ? 1 : 0 }} />
              {openNest ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openNest} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={navProduct}
                  className={
                    route.pathname.includes("products")
                      ? "list-item active-item"
                      : "list-item"
                  }
                >
                  <ListItemText
                    primary="Danh sách sản phẩm"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={navCategory}
                  className={
                    route.pathname.includes("categories")
                      ? "list-item active-item"
                      : "list-item"
                  }
                >
                  <ListItemText
                    primary="Danh mục sản phẩm"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </List>
            </Collapse>
          </ListItem>
          <ListItem
            disablePadding
            sx={{ display: "block" }}
            className={
              route.pathname.includes("customer")
                ? "list-item active-item"
                : "list-item"
            }
          >
            <ListItemButton onClick={navCustomer}>
              <ListItemIcon>
                <i class="fa-solid fa-user"></i>
              </ListItemIcon>
              <ListItemText
                primary="Khách hàng"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            sx={{ display: "block" }}
            className={
              route.pathname.includes("analysis")
                ? "list-item active-item"
                : "list-item"
            }
          >
            <ListItemButton onClick={navAnalysis}>
              <ListItemIcon>
                <i class="fa-solid fa-sack-dollar"></i>
              </ListItemIcon>
              <ListItemText
                primary="Thống kê doanh số"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}
