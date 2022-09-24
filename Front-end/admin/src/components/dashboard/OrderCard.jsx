import React, { useEffect } from "react";
import { Fragment } from "react";
import { Typography } from "@mui/material";
import { CardContent } from "@mui/material";
import axios from "axios";

export const OrderCard = () => {

    const [totalOrders, setTotalOrders] = React.useState(0);
    useEffect(() => {
        axios.get(`http://localhost:8080/orders`).then(res => {
            setTotalOrders(res.data.totalElements);
        }).catch(err => {
            console.log(err);
        }
        )
    }, [])
    return (
        <Fragment>
            <CardContent>
                <Typography sx={{ fontSize: "14px" }} color="text.secondary" gutterBottom>
                    Tổng đơn hàng
                </Typography>
                <Typography sx={{ fontSize: "24px" }} color="text.primary" gutterBottom>
                    {totalOrders}
                </Typography>
            </CardContent>
        </Fragment>
    )
}