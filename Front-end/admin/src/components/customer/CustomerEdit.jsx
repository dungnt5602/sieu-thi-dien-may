import { Grid, Paper, Box, Stack, Typography, Button,TableHead,TableContainer, Table, TableBody, TableRow, TableCell } from "@mui/material";
import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useParams, useNavigate } from 'react-router-dom';
import { GlobalState } from "../../auth/GlobalState";
import Radio from '@mui/material/Radio';
import axios from 'axios';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import UserAPI from "../../api/UserAPI";
import OrderAPI from "../../api/OrdersAPI";
const CustomerEdit = () => {
    const { id } = useParams();
    const accessToken = localStorage.getItem("token");
    const [gender, setGender] = React.useState("F");
    const [orders, setOrders] = React.useState([]);
    const [role, setRole] = React.useState("USER");
    const [customer, setCustomer] = React.useState({});
    const [email, setEmail] = React.useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        control,
    } = useForm();
    const { isAdd, setIsAdd } = React.useContext(GlobalState);
    useEffect(() => {
        axios.get(`http://localhost:8080/users/${id}`).then(res => {
            setCustomer(res.data);
            setGender(res.data.gender);
            setRole(res.data.role);
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
    useEffect(() => {
        if(customer) {
            reset({
                name: customer.name,
                address: customer.address,
                email: customer.email,
                mobile: customer.mobile,
            })
        }
    }, [customer, reset])
    const onSubmit = async (data) => {
        data.role = role;
        data.gender = gender;
        console.log(customer);
        console.log(data);
        UserAPI.updateAccount(accessToken, id, data)
            .then((res) => {
                getBack();
                setEmail(false);
            }).catch((err) => {
                // getBack();
                console.log(err.response.data.message.indexOf("Email"));
                if(err.code === "ERR_NETWORK") {
                    getBack();
                } else if(err.response.data.message.indexOf("Email") > -1) {
                    setEmail(true);
                }
            })
    };

    const handleChangeGender = (evt) => {
        setGender(evt.target.value);
    }

    const handleChangeRole = (evt) => {
        setRole(evt.target.value);
    }

    const getBack = () => {
        window.history.back();
    };
    return (
        <div>
        <Typography variant="h4" component="div">
            Thêm tài khoản
        </Typography>

            <Typography
                id="transition-modal-title"
                variant="subtitle1"
                component="h4"
                marginBottom="20px"
                onClick={getBack}
                sx={{
                    cursor: "pointer",
                    "&:hover": {
                        color: "#ccc",
                    },
                }}
            >
                <i class="fa-solid fa-chevron-left"></i>
                Quay lại thông tin tài khoản
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Paper elevation={1} sx={{ height: "100%" }}>
                            <Box p={3}>
                                <Typography
                                    variant="h6"
                                    component="h6"
                                    sx={{ fontSize: "16px" }}
                                >
                                    Tên tài khoản:
                                </Typography>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Nhập tên tài khoản"
                                    {...register("name", {
                                        required: "Yêu cầu nhập tên tài khoản",
                                    })}
                                    style={{
                                        width: "100%",
                                        marginBottom: "24px",
                                        marginTop: "10px",
                                        height: "30px",
                                        border: "1px solid #ccc",
                                        borderRadius: "5px",
                                        padding: "20px",
                                        fontSize: "15px"
                                    }}
                                />
                                {errors.name && (
                                    <span style={{ color: "red" }}>
                                        {errors.name.message}
                                    </span>
                                )}

                                {/* Address */}
                                
                                <Typography
                                    variant="h6"
                                    component="h6"
                                    sx={{ fontSize: "16px" }}
                                >
                                    Địa chỉ:
                                </Typography>
                                <input
                                    type="text"
                                    name="address"
                                    placeholder="Nhập địa chỉ"
                                    {...register("address", {
                                        required: "Yêu cầu nhập địa chỉ",
                                        
                                    })}
                                    style={{
                                        width: "100%",
                                        marginBottom: "24px",
                                        marginTop: "10px",
                                        height: "30px",
                                        border: "1px solid #ccc",
                                        borderRadius: "5px",
                                        padding: "20px",
                                        fontSize: "15px"
                                    }}
                                />
                                {errors.address && (
                                    <span style={{ color: "red" }}>
                                        {errors.address.message}
                                    </span>
                                )}
                                {/* email */}                                
                                <Typography
                                    variant="h6"
                                    component="h6"
                                    sx={{ fontSize: "16px" }}
                                >
                                    Email:
                                </Typography>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Nhập email"
                                    {...register("email", {
                                        required: "Yêu cầu nhập email",
                                    })}
                                    style={{
                                        width: "100%",
                                        marginBottom: "24px",
                                        marginTop: "10px",
                                        height: "30px",
                                        border: "1px solid #ccc",
                                        borderRadius: "5px",
                                        padding: "20px",
                                        fontSize: "15px"
                                    }}
                                />
                                {errors.email && (
                                    <span style={{ color: "red" }}>
                                        {errors.email.message}
                                    </span>
                                )}
                                {email ? (                                    
                                    <span style={{ color: "red" }}>
                                        Email đã tồn tại
                                    </span>
                                ): null}
                                {/* phone */}                                
                                <Typography
                                    variant="h6"
                                    component="h6"
                                    sx={{ fontSize: "16px" }}
                                >
                                    Số điện thoại: 
                                </Typography>
                            <input
                                type="number"
                                name="mobile"
                                placeholder="Nhập số điện thoại"
                                {...register("mobile", {
                                    required: "Yêu cầu nhập số điện thoại",
                                    minLength: {
                                        value: 8,
                                        message: "Độ dài tối thiểu 8 ký tự"
                                    },
                                    maxLength: {
                                        value: 12,
                                        message: "Độ dài tối đa 12 ký tự"
                                    },
                                    min: {
                                        value: 0,
                                        message: "Số điện thoại không hợp lệ"
                                    }
                                })}
                                style={{
                                    width: "100%",
                                    marginBottom: "24px",
                                    marginTop: "10px",
                                    height: "30px",
                                    border: "1px solid #ccc",
                                    borderRadius: "5px",
                                    padding: "20px",
                                    fontSize: "15px"
                                }}
                            />
                                {errors.mobile && (
                                    <span style={{ color: "red" }}>
                                        {errors.mobile.message}
                                    </span>
                                )}
                                
                                {/* gender */}                        
                                <Typography
                                    variant="h6"
                                    component="h6"
                                    sx={{ fontSize: "16px" }}
                                >
                                    Giới tính: 
                                </Typography>
                                
                            <FormControl>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue="female"
                                    name="radio-buttons-group"
                                    onChange={handleChangeGender}
                                    value={gender}
                                >
                                    <FormControlLabel value="F" control={<Radio />} label="Nữ" />
                                    <FormControlLabel value="M" control={<Radio />} label="Nam" />
                                    <FormControlLabel value="other" control={<Radio />} label="Không xác định" />
                                </RadioGroup>

                            </FormControl>
                            
                                {/* Role */}                 
                                <Typography
                                    variant="h6"
                                    component="h6"
                                    sx={{ fontSize: "16px" }}
                                >
                                    Tạo tài khoản cho: 
                                </Typography>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue="USER"
                                    name="radio-buttons-group"
                                    onChange={handleChangeRole} value={role}
                                >
                                    <FormControlLabel value="USER" control={<Radio />} label="Khách hàng" />
                                    <FormControlLabel value="ADMIN" control={<Radio />} label="Quản trị viên" />
                                </RadioGroup>
                            
                            </Box>
                        </Paper>
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
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
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    style={{
                        backgroundColor: "#fff",
                        color: "#00a8ff",
                        fontSize: "14px",
                        padding: "5px 20px",
                        borderRadius: "5px",
                        marginTop: "25px",
                        marginLeft: "85%",
                    }}
                >
                    Cập nhật thông tin
                </Button>
            </form>
        </div>
    );
};

export default CustomerEdit;
