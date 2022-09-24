import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
    Avatar,
    Box,
    Badge,
    Stack,
    Typography,
    IconButton,
} from "@mui/material";
import SearchBtn from "./SearchBtn";
import UserButton from "./UserButton";
import MainNav from "./MainNav";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import GlobalState from "../../GlobalState";
import CartBox from "../Cart/CartBox";
const Header = () => {
    const context = useContext(GlobalState);

    const navigate = useNavigate();
    const handleOpenCart = () => {
        navigate("/carts");
    };

    // return window.location.pathname !== "/orders" ? 
    return (
        <Box bgcolor="#dc0021" height="auto" align="center" id="header">
            <Stack
                direction="row"
                alignItems="center"
                sx={{
                    width: "1170px",
                    height: "80px",
                    justifyContent: "space-between",
                }}
            >
                <Box
                    component="img"
                    alt="Logo"
                    src="https://www.sapo.vn/Themes/Portal/Default/StylesV2/images/home/logo-w.png"
                />

                <SearchBtn />

                <Stack
                    direction="row"
                    spacing={1}
                    sx={{ color: "white", alignItems: "center" }}
                >
                    <Avatar
                        sx={{
                            width: "35px",
                            height: "35px",
                            bgcolor: "#a90019",
                        }}
                    >
                        <LocalPhoneIcon sx={{ width: "18px" }} />
                    </Avatar>
                    <Stack sx={{ alignItems: "flex-start" }}>
                        <Typography
                            variant="body2"
                            sx={{ fontWeight: "500", mt: "5px" }}
                        >
                            1900 6750
                        </Typography>
                        <Typography sx={{ fontSize: "12px" }}>
                            Tổng đài miễn phí
                        </Typography>
                    </Stack>
                </Stack>

                <UserButton />

                <Badge
                    color="warning"
                    overlap="circular"
                    badgeContent={context.cart.length.toString()}
                    onClick={handleOpenCart}
                >
                    <IconButton
                        sx={{
                            width: "35px",
                            height: "35px",
                            bgcolor: "#a90019",
                            "&:hover": {
                                bgcolor: "#a90019",
                                opacity: "0.8",
                            },
                        }}
                    >
                        <LocalMallIcon sx={{ width: "18px", color: "white" }} />
                    </IconButton>
                </Badge>
                <CartBox />
            </Stack>
            <MainNav />
        </Box>
    )
};
export default Header;
