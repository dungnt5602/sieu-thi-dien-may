import React, { useEffect } from "react";
import { Fragment } from "react";
import { Typography } from "@mui/material";
import { CardContent } from "@mui/material";
import axios from "axios";

export const CustomerCard = () => {
    const [totalCustomer, setTotalCustomer] = React.useState(0);

    useEffect(() => {
        axios.get(`http://localhost:8080/admin/users`).then(res => {
            setTotalCustomer(res.data.totalElements);
        }).catch(err => {
            console.log(err);
        }
        )
    }, [])

    return (
        <Fragment>
            <CardContent>
                <Typography sx={{ fontSize: "14px" }} color="text.secondary" gutterBottom>
                    Khách hàng
                </Typography>
                <Typography sx={{ fontSize: "24px" }} color="text.primary" gutterBottom>
                    {totalCustomer}
                </Typography>
            </CardContent>
        </Fragment>
    )
}