import React, { useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Box, Divider, Stack, Grid } from "@mui/material";
import OrderItem from "./OrderItem";
import { Typography, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import UsersApi from "../../api/UsersAPI";
import OrdersApi from "../../api/OrdersAPI";
import CartsAPI from "../../api/CartsAPI";
import GlobalState from "../../GlobalState";
import CartBox from "../../components/Cart/CartBox";
const Order = () => {
    const [user, setUser] = React.useState({});
    const [products, setProducts] = React.useState([]);
    const [success, setSuccess] = React.useState(false);
    const [fail, setFail] = React.useState(false);
    const context = useContext(GlobalState);
    const navigate = useNavigate();
    // const [cartData, setCartData] = React.useState([]);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();
    const { id } = useParams();
    const getBack = () => {
        // window.location.reload();
        navigate("/");
    };

    const numberWithCommas = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };
    useEffect(() => {
        CartsAPI.getCartByUserId(context.userId, context.accessToken)
            .then((res) => {
                if (res.data.length < 1) navigate("/");
            })
            .catch((error) => console.log(error));
        // if(context.cart.length < 1) {navigate("/")}
        UsersApi.getUserById(context.accessToken, context.userId)
            .then((res) => {
                setUser(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    useEffect(() => {
        if (user) {
            reset({
                buyerName: user.name,
                email: user.email,
                mobile: user.mobile,
                address: user.address,
            });
        }
    }, [user, reset]);

    const onSubmit = (data) => {
        const user = {
            buyerName: data.buyerName,
            mobile: data.mobile,
            email: data.email,
            address: data.address,
            note: data.note,
        };
        OrdersApi.createOrderByUserId(context.userId, user, context.accessToken)
            .then((res) => {
                context.setCart([]);
                setSuccess(true);
                setUser(res.data[0]["order"]);
                setProducts(res.data);
            })
            .catch((err) => {
                console.log(err.response.data);
                setFail(true);
                // if(err.response.data.code == 400) {
                //     console.log("check");
                //     const message = err.response.data.message;
                //     console.log(Number(message.slice(message.indexOf(':')+1)) + 3);
                // }
            });
    };

    const orderSuccess = () => (
        <div id="order">
            <Grid container>
                <Grid item xs={6}>
                    <p className="order-title">Th??ng tin mua h??ng</p>

                    <p className="order-title">C???m ??n b???n ???? ?????t h??ng</p>
                    {/* <Paper elevation={1} sx={{ height: "100%" }}> */}
                    <Box p={3}>
                        {/* Buyer name */}
                        <Typography
                            variant="h6"
                            component="h6"
                            sx={{ fontSize: "16px" }}
                        >
                            T??n ng?????i mua: {user["buyerName"]}
                        </Typography>

                        {/*Email */}
                        <Typography
                            variant="h6"
                            component="h6"
                            sx={{ fontSize: "16px" }}
                        >
                            Email: {user["email"]}
                        </Typography>
                        {/* Mobile */}
                        <Typography
                            variant="h6"
                            component="h6"
                            sx={{ fontSize: "16px" }}
                        >
                            S??? ??i???n tho???i: {user["mobile"]}
                        </Typography>

                        {/* Address */}
                        <Typography
                            variant="h6"
                            component="h6"
                            sx={{ fontSize: "16px" }}
                        >
                            ?????a ch???: {user["address"]}
                        </Typography>

                        {/* Note */}
                        <Typography
                            variant="h6"
                            component="h6"
                            sx={{ fontSize: "16px" }}
                        >
                            Ghi ch??: {user["note"]}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <div>
                        <p className="order-title">????n h??ng c???a b???n</p>

                        <Box p={3}>
                            <Grid container spacing={2}>
                                <Grid item xs={7} className="table-header">
                                    S???n ph???m
                                </Grid>
                                <Grid item xs={3} className="table-header">
                                    S??? l?????ng
                                </Grid>
                                <Grid item xs={2} className="table-header">
                                    Gi??
                                </Grid>
                            </Grid>
                            <Divider sx={{ m: "16px auto" }} />{" "}
                            <Box sx={{ overflow: "auto", maxHeight: "350px" }}>
                                {products.map((cartItem, index) => (
                                    <div className="order-item">
                                        <Grid container spacing={2}>
                                            <Grid item xs={7}>
                                                <Grid container spacing={1}>
                                                    <Grid item xs={4}>
                                                        <img
                                                            src={
                                                                cartItem[
                                                                    "product"
                                                                ]["imgLink"]
                                                            }
                                                            width="100%"
                                                        />
                                                    </Grid>
                                                    <Grid
                                                        item
                                                        xs={8}
                                                        sx={{ color: "black" }}
                                                    >
                                                        {
                                                            cartItem["product"][
                                                                "name"
                                                            ]
                                                        }
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid
                                                item
                                                xs={3}
                                                sx={{ textAlign: "center" }}
                                            >
                                                <p>{cartItem["quantity"]}</p>
                                            </Grid>
                                            <Grid item xs={2}>
                                                <p className="product-price">
                                                    {" "}
                                                    {numberWithCommas(
                                                        cartItem["price"]
                                                    )}
                                                </p>
                                            </Grid>
                                        </Grid>
                                    </div>
                                ))}
                            </Box>
                            <Divider sx={{ m: "12px auto" }} />
                            <Stack direction="row" className="price-row">
                                <p>T???ng gi?? tr??? s???n ph???m</p>
                                <p className="product-price">
                                    {numberWithCommas(products[0]["order"]["total"])}
                                </p>
                            </Stack>
                            <Stack direction="row" className="price-row">
                                <p>Ph?? v???n chuy???n</p>
                                <p className="product-price">--- ??</p>
                            </Stack>
                            <Divider sx={{ m: "12px auto" }} />
                            <Box className="total-box">
                                <Grid container spacing={2}>
                                    <Grid item xs={9}>
                                        <Stack direction="row">
                                            <AddShoppingCartIcon
                                                sx={{ mr: "12px" }}
                                            />
                                            <p>T???ng gi?? tr??? ????n h??ng</p>
                                        </Stack>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={3}
                                        sx={{ textAlign: "right" }}
                                    >
                                        <p>
                                            {numberWithCommas(products[0]["order"]["total"])}
                                        </p>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </div>
                </Grid>
            </Grid>
        </div>
    );

    const orderFail = () => (
        <div id="order">
            <Grid container>
                <Grid item xs={6} sx={{textAlign: "center"}}>
                    <p className="order-title">Th??ng b??o</p>
                    <Typography sx={{textAlign: "left", paddingBottom:"180px"}}>
                        M???t s??? s???n ph???m trong gi??? h??ng kh??ng c??n ????? s??? l?????ng ?????
                        ?????t h??ng. Ch??ng t??i xin l???i v?? s??? b???t ti???n n??y
                    </Typography>
                    <Typography
                        id="transition-modal-title"
                        variant="subtitle1"
                        component="h4"
                        color="#dc0021"
                        display="inline-block"
                        marginBottom="20px"
                        onClick={getBack}
                        sx={{
                            cursor: "pointer",
                            "&:hover": {
                                backgroundColor: "#3500D3",
                            },
                            backgroundColor: "#240090",
                            color: "#fff",
                            padding: "8px 27px",
                            borderRadius: "10px"
                        }}
                    >
                        <i class="fa-solid fa-chevron-left"></i>
                        Ti???p t???c mua h??ng
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <OrderItem />
                </Grid>
            </Grid>
            <CartBox />
        </div>
    );

    return fail ? orderFail() : (success ? (orderSuccess()) : (
        <div id="order">
            <Grid container>
                <Grid item xs={6}>
                    <p className="order-title">Th??ng tin c???a b???n</p>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* <Paper elevation={1} sx={{ height: "100%" }}> */}
                        <Box p={3}>
                            {/* Buyer name */}
                            <Typography
                                variant="h6"
                                component="h6"
                                sx={{ fontSize: "16px" }}
                            >
                                T??n ng?????i mua:
                            </Typography>
                            <input
                                type="text"
                                name="buyerName"
                                placeholder="Nh???p t??n ng?????i mua"
                                {...register("buyerName", {
                                    required: "Y??u c???u nh???p t??n ng?????i mua",
                                })}
                                style={{
                                    width: "100%",
                                    marginBottom: "20px",
                                    marginTop: "10px",
                                    padding: "16px",
                                    fontSize: "14px",
                                    border: "1px solid #ccc",
                                    borderRadius: "5px",
                                }}
                            />
                            {errors.buyerName && (
                                <span style={{ color: "red" }}>
                                    {errors.buyerName.message}
                                </span>
                            )}

                            {/*Email */}
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
                                placeholder="Nh???p email"
                                {...register("email", {
                                    required: "Y??u c???u nh???p email",
                                    pattern:{
                                        value: /^\S+@\S+$/i,
                                        message: "Email ch??a chu???n ?????nh d???ng, nh???p ????ng ?????nh d???ng ??i"
                                    }
                                })}
                                style={{
                                    width: "100%",
                                    marginBottom: "20px",
                                    marginTop: "10px",
                                    padding: "16px",
                                    fontSize: "14px",
                                    border: "1px solid #ccc",
                                    borderRadius: "5px",
                                }}
                            />
                            {errors.email && (
                                <span style={{ color: "red" }}>
                                    {errors.email.message}
                                </span>
                            )}
                            {/* Mobile */}
                            <Typography
                                variant="h6"
                                component="h6"
                                sx={{ fontSize: "16px" }}
                            >
                                S??? ??i???n tho???i:
                            </Typography>
                            <input
                                type="number"
                                name="mobile"
                                placeholder="Nh???p t??n ng?????i mua"
                                {...register("mobile", {
                                    required: "Y??u c???u nh???p s??? ??i???n tho???i",
                                    minLength: {
                                        value: 8,
                                        message: "S??? ??i???n tho???i h??i ng???n, nh???p d??i h??n ??i"
                                    },
                                    maxLength: {
                                        value: 12,
                                        message: "S??? ??i???n tho???i h??i d??i, nh???p ng???n th??i"
                                    }
                                })}
                                style={{
                                    width: "100%",
                                    marginBottom: "20px",
                                    marginTop: "10px",
                                    padding: "16px",
                                    fontSize: "14px",
                                    border: "1px solid #ccc",
                                    borderRadius: "5px",
                                }}
                            />
                            {errors.mobile && (
                                <span style={{ color: "red" }}>
                                    {errors.mobile.message}
                                </span>
                            )}

                            {/* Address */}
                            <Typography
                                variant="h6"
                                component="h6"
                                sx={{ fontSize: "16px" }}
                            >
                                ?????a ch???:
                            </Typography>
                            <input
                                type="text"
                                name="address"
                                placeholder="Nh???p ?????a ch???"
                                {...register("address", {
                                    required: "Y??u c???u nh???p ?????a ch???",
                                })}
                                style={{
                                    width: "100%",
                                    marginBottom: "20px",
                                    marginTop: "10px",
                                    padding: "16px",
                                    fontSize: "14px",
                                    border: "1px solid #ccc",
                                    borderRadius: "5px",
                                }}
                            />
                            {errors.address && (
                                <span style={{ color: "red" }}>
                                    {errors.address.message}
                                </span>
                            )}

                            {/* Note */}
                            <Typography
                                variant="h6"
                                component="h6"
                                sx={{ fontSize: "16px" }}
                            >
                                Ghi ch??:
                            </Typography>
                            <textarea
                                name="note"
                                placeholder="Nh???p ghi ch??"
                                {...register("note", {})}
                                style={{
                                    width: "100%",
                                    marginBottom: "10px",
                                    marginTop: "10px",
                                    padding: "16px",
                                    fontSize: "14px",
                                    border: "1px solid #ccc",
                                    borderRadius: "5px",
                                }}
                            />
                        </Box>
                        {/* </Paper> */}
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            style={{
                                backgroundColor: "#dc0021",
                                color: "#fff",
                                fontSize: "14px",
                                padding: "14px 30px",
                                borderRadius: "5px",
                                marginLeft: "24px",
                            }}
                            sx={{
                                cursor: "pointer",
                                "&:hover": {
                                    color: "#d2001f",
                                    opacity:"0.8"
                                },
                            }}
                        >
                            ?????t h??ng
                        </Button>
                    </form>
                </Grid>
                <Grid item xs={6}>
                    <OrderItem />
                </Grid>
            </Grid>
            <CartBox />
        </div>
    ));
};

export default Order;
