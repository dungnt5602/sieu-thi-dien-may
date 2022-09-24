import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Link } from "react-router-dom";
import { categoryList } from "../../shared/ListData";

const CategoryNav = () => {
    return (
        <Stack direction="row" spacing={1} className="categoryNav">
            <Stack direction="row" spacing={2}>
                <MenuIcon sx={{ ml: "12px" }} />
                <Typography
                    sx={{
                        fontWeight: "bold",
                        fontSize: "14px",
                        lineHeight: "1.7",
                    }}
                >
                    Danh mục sản phẩm
                </Typography>
                <ArrowDropDownIcon sx={{ ml: "12px" }} />
            </Stack>

            <Stack className="subnav-container">
                <Stack sx={{ display: "none" }}>
                    {categoryList.map((nav, index) => {
                        return (
                            <Link
                                key={index}
                                to={nav.link}
                                className="subnav-item"
                            >
                                <Stack direction="row">
                                    <Box
                                        component="img"
                                        src={nav.icon}
                                        className="subnav-icon"
                                    />
                                    {nav.title}
                                </Stack>
                            </Link>
                        );
                    })}
                </Stack>
            </Stack>
        </Stack>
    );
};

export default CategoryNav;
