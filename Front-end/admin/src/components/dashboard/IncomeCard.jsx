import React, { useEffect } from "react";
import { Fragment } from "react";
import { Typography } from "@mui/material";
import { CardContent } from "@mui/material";
import axios from "axios";

export const IncomeCard = () => {

    const [orders, setOrders] = React.useState([]);
    useEffect(() => {
        axios.get(`http://localhost:8080/orders`).then(res => {
            setOrders(res.data.content);
        }).catch(err => {
            console.log(err);
        }
        )
    }, [])

    const getTotalIncome = () => {
        let total = 0;
        orders.forEach(order => {
            if (order.status === "Đã giao") {
                total += order.total;
            }
        }
        )
        return numberWithCommas(total);
    }

    function numberWithCommas(x) {
        if (x !== undefined) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        }
    }

    return (
        <Fragment>
            <CardContent>
                <Typography sx={{ fontSize: "14px" }} color="text.secondary" gutterBottom>
                    Thu nhập
                </Typography>
                <Typography sx={{ fontSize: "24px" }} color="text.primary" gutterBottom>
                    {getTotalIncome()} VNĐ
                </Typography>
            </CardContent>
        </Fragment>
    )
}