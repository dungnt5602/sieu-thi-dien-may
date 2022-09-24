import React, { useEffect } from "react";
import OrderAPI from "../../api/OrdersAPI";
import { useParams } from "react-router-dom";
import { Typography, Grid, Button, Divider } from "@mui/material";

const OrderDetail = () => {

    const { id } = useParams();
    const [productSet, setProductSet] = React.useState([]);
    const [status, setStatus] = React.useState("");
    const [total, setTotal] = React.useState(0);
    const [orderInfo, setOrderInfo] = React.useState({});

    useEffect(() => {
        OrderAPI.getOrderById(id).then((res) => {
            console.log(res.data);
            setProductSet(res.data);
            setOrderInfo(res.data[0].order);
        }).catch((err) => {
            console.log(err);
        })

    }, [id]);

    useEffect(() => {
        if (productSet.length > 0) {
            const getOrderStatus = async () => {
                setStatus(productSet[0].order.status);
                setTotal(productSet[0].order.total);
            }
            getOrderStatus();
        }
    }, [productSet]);


    const getBack = () => {
        window.history.back();
    }

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    const validateStatus = async () => {
        let res = await OrderAPI.updateOrderStatus(id, { status: "Đã giao" })
        console.log(res);
        window.location.reload();
    }

    return (
        <div>
            <h1>
                Chi tiết đơn hàng
            </h1>
            <Typography id="transition-modal-title" variant='subtitle1' component="h4" marginBottom="20px" onClick={getBack}
                sx={{
                    cursor: "pointer",
                    "&:hover": {
                        color: "#ccc",
                    }
                }}>
                <i class="fa-solid fa-chevron-left"></i>
                Quay lại danh sách sản phẩm
            </Typography>
            <Typography variant="h6" component="h6">Người đặt: {orderInfo.buyerName} </Typography>
            <Typography variant="h6" component="h6">Số điện thoại: {orderInfo.mobile} </Typography>
            <Typography variant="h6" component="h6">Địa chỉ nhận hàng: {orderInfo.address} </Typography>
            <Typography variant="h6" component="h6">Ngày đặt: {orderInfo.createDate} </Typography>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: "30px" }}>
                <Typography variant="h6" component="h6" style={{ fontWeight: "bold" }}>Trạng thái đơn hàng: {status}</Typography>
                {/* <Typography variant="h6" component="h4" marginBottom="20px">
                    Tình trạng: {status}
                </Typography> */}

                {status === "Chờ duyệt" || status === "Đang giao" ? (
                    <Button sx={{
                        backgroundColor: '#00a8ff',
                        color: '#fff',
                        fontSize: '14px',
                        padding: '10px 20px',
                        borderRadius: '5px',
                        '&:hover': {
                            color: '#00a8ff'
                        }

                    }} onClick={validateStatus}>
                        Duyệt đơn hàng
                    </Button>
                ) : null}
            </div>
            <Grid container spacing={2} sx={{ border: '1px solid black', borderRadius: "5px" }}>
                {productSet.map((product) => (
                    <Grid item xs={12} md={12} sx={{ marginBottom: 2, paddingRight: 2 }}>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: "20px" }}>
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <h3 style={{ marginRight: '5%' }}>{product.id}</h3>
                                <img src={product.product.imgLink} alt="" style={{ width: "100px", height: "100px", marginRight: '5%' }} />
                                <h3 style={{ width: "400px" }}>{product.product.name}</h3>
                            </div>
                            <div style={{ display: 'block', flexDirection: 'column' }}>
                                <p>Tổng: {numberWithCommas(product.price)}đ</p>
                                <p>Số lượng: {product.quantity}</p>
                            </div>
                        </div>
                        <Divider />
                    </Grid>

                ))}
                <Grid item xs={12} md={12} sx={{ marginBottom: 2, paddingRight: 2 }}>
                    <h3 style={{ textAlign: 'right', color: 'red' }}>Tổng tiền: {numberWithCommas(total)}đ</h3>
                </Grid>
            </Grid>

        </div>
    )
}

export default OrderDetail;