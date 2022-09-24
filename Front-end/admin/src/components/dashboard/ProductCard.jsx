import React, { useEffect } from "react";
import { Fragment } from "react";
import { Typography } from "@mui/material";
import { CardContent } from "@mui/material";
import axios from "axios";

export const ProductCard = () => {

    const [totalProducts, setTotalProducts] = React.useState(0);
    useEffect(() => {
        axios.get(`http://localhost:8080/admin/products`).then(res => {
            setTotalProducts(res.data.totalElements);
        }).catch(err => {
            console.log(err);
        }
        )
    })

    return (
        <Fragment>
            <CardContent>
                <Typography sx={{ fontSize: "14px" }} color="text.secondary" gutterBottom>
                    Tổng sản phẩm
                </Typography>
                <Typography sx={{ fontSize: "24px" }} color="text.primary" gutterBottom>
                    {totalProducts}
                </Typography>
            </CardContent>
        </Fragment>
    )
}