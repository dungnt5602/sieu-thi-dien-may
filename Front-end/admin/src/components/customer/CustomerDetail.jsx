import React from 'react';
import { Box, Button, Grid, Typography, Paper, TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import OrderAPI from '../../api/OrdersAPI';
import UserAPI from '../../api/UserAPI';
const CustomerDetail = () => {

    const { id } = useParams();
    const [customer, setCustomer] = React.useState({});
    const [orders, setOrders] = React.useState([]);
    const accessToken = localStorage.getItem("token");
    const nav = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8080/users/${id}`).then(res => {
            setCustomer(res.data);
        }).catch(err => {
            console.log(err);
        })
    }, [id]);

    useEffect(() => {
        OrderAPI.getOrderByUserId(id, 0, 20).then(res => {
            setOrders(res.data);
        }
        ).catch(err => {
            console.log(err);
        })
    }, [id]);

    const getBack = () => {
        window.history.back();
    }

    const handleEdit = () => {
        nav("edit");
    }

    const handleRemove = ()=> {
        UserAPI.deleteAccout(accessToken, id)
            .then((res) => {
                getBack();
            }).catch((err) => {
                getBack();
            })
    }
    return (
        <div>
            <h1>Chi tiết khách hàng</h1>
            {/* Nút sửa thông tin tài khoản */}
            <Button sx={{
                backgroundColor: '#00a8ff',
                color: '#fff',
                fontSize: '14px',
                padding: '10px 20px',
                borderRadius: '5px',
                width: '200px',
                height: '40px',
                margin: '4px',
                float: "right",
                '&:hover': {
                    backgroundColor: '#0996df'
                },
            }} onClick={handleEdit}>
                Sửa thông tin
            </Button>
            {/* Nút xoa tài khoản */}
            <Button sx={{
            backgroundColor: '#cd1818',
            color: '#fff',
            fontSize: '14px',
            padding: '10px 20px',
            borderRadius: '5px',
            width: '200px',
            height: '40px',
            margin: '4px',
            float: "right",
            '&:hover': {
                backgroundColor: '#e60f0f',
                color: '#fff'
            },
            }} onClick={handleRemove}>
                Xóa người dùng
            </Button>
            <Typography id="transition-modal-title" variant='subtitle1' component="h4" marginBottom="20px" onClick={getBack}
                sx={{
                    cursor: "pointer",
                    "&:hover": {
                        color: "#ccc",
                    }
                }}>
                <i class="fa-solid fa-chevron-left"></i>
                Quay lại danh sách người dùng
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <Paper elevation={1} sx={{ height: "100%" }}>
                        <Box p={3}>
                            <Typography variant="h6" component="h4" marginBottom="20px">
                                Thông tin khách hàng
                            </Typography>
                            <Typography variant="subtitle1" component="p" marginBottom="20px">
                                <b>Tên khách hàng:</b> {customer.name}
                            </Typography>
                            <Typography variant="subtitle1" component="p" marginBottom="20px">
                                <b>Email:</b> {customer.email}
                            </Typography>
                            <Typography variant="subtitle1" component="p" marginBottom="20px">
                                <b>Số điện thoại:</b> {customer.mobile}
                            </Typography>
                            <Typography variant="subtitle1" component="p" marginBottom="20px">
                                <b>Địa chỉ:</b> {customer.address}
                            </Typography>
                            <Typography variant="subtitle1" component="p" marginBottom="20px">
                                <b>Tên đăng nhập: </b> {customer.username}
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Paper elevation={1} sx={{ height: "100%" }}>
                        <Box p={3}>
                            {orders.length > 0 ? (
                                <TableContainer>
                                    <Typography variant="h6" component="h4" marginBottom="20px">
                                        Các đơn hàng đã đặt
                                    </Typography>
                                    <Table aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>ID</TableCell>
                                                <TableCell align="right">Ngày đặt</TableCell>
                                                <TableCell align="right">Tổng tiền</TableCell>
                                                <TableCell align="right">Trạng thái</TableCell>
                                                <TableCell align="right">Địa chỉ giao hàng</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {orders.map((order) => (
                                                <TableRow
                                                    key={order.id}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: "pointer", "&:hover": { backgroundColor: "#fafafa" } }}
                                                    onClick={() => window.location.href = `/admin/order/${order.id}`}
                                                >
                                                    <TableCell component="th" scope="row">
                                                        {order.id}
                                                    </TableCell>
                                                    <TableCell align="right">{order.createDate}</TableCell>
                                                    <TableCell align="right">{order.total}</TableCell>
                                                    <TableCell align="right">{order.status}</TableCell>
                                                    <TableCell align="right">{order.address}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            ) : (
                                <Box sx={{ opacity: "30%" }}>
                                    <Typography variant="h6" component="h4" marginBottom="20px" align='center'>
                                        Khách hàng chưa đặt hàng
                                    </Typography>
                                    <img src="https://static.thenounproject.com/png/614274-200.png" alt="empty" style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block' }} />
                                </Box>
                            )}
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </div>


    );
}

export default CustomerDetail;