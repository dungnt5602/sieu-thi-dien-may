import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Box, Divider, Stack, Grid } from "@mui/material";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import "./cart.css";
import CircularProgress from '@mui/material/CircularProgress';
import GlobalState from "../../GlobalState";
import CartsAPI from "../../api/CartsAPI";
import CartItem from "./CartItem";
import Recommend from "../../components/Recommend/RecommendCart";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

const Cart = () => {
    const context = React.useContext(GlobalState);
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const setCartCallback = (totalCostChange, productList) => {
        context.setTotalCost(totalCostChange);
        context.setCart(productList);
    };

    const handleCloseCart = () => {
        context.setStatusCart(false);
    };

    const getBack = () => {
        // window.location.reload();
        navigate("/");
    };

    const handleOrder = () => {
        context.setStatusCart(false);
        if (!context.isLoggedIn) {
            navigate("/account/login");
        } else {
            navigate("/orders");
        }
    };
    const numberWithCommas = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };


    React.useEffect(() => {
        setLoading(true);
        setSuccess(false);
        // logged in and localStorage is null
        if (context.isLoggedIn && !localStorage.getItem("cart")) {
            CartsAPI.getCartByUserId(context.userId, context.accessToken)
                .then((res) => {
                    context.setCart(res.data);
                    context.setTotalCost(res.data[0]["cart"]["total"]);
                })
                .catch((error) => console.log(error));
        } // logged in and localStorage not null
        else if (context.isLoggedIn && localStorage.getItem("cart")) {
            const cartData = JSON.parse(localStorage.getItem("cart"));
            for (let index = 0; index < cartData.length; index++) {
                delete cartData[index]["total"];
                CartsAPI.addProductToCart(context.userId, cartData[index])
                    .then((res) => {
                        context.setCart(res.data);
                        context.setTotalCost(res.data[0]["cart"]["total"]);
                    })
                    .catch((error) => console.log(error));
            }
            localStorage.removeItem("cart");
        } else if (!context.isLoggedIn && localStorage.getItem("cart")) {
            const cartData = JSON.parse(localStorage.getItem("cart"));
            if (cartData.length !== 0) {
                context.setCart(cartData);
                context.setTotalCost(cartData[0]["total"]);
            }
        }
        
        setLoading(false);
        setSuccess(true);
    }, []);

    const emptyCart = () => (
        <Card sx={{ maxWidth: "100%", widows: "100%" }}>
            <CardMedia
                component="img"
                sx={{ width: "300px", maxWidth: "300px", margin: "auto" }}
                image="https://bizweb.dktcdn.net/100/270/860/themes/606449/assets/empty-bags.jpg?1510132489127"
                alt="Empty Card"
            />
            <CardContent>
                <Typography
                    onClick={handleCloseCart}
                    className="empty_cart-btn"
                    gutterBottom
                    variant="h5"
                    width="300px"
                    margin="0 auto"
                    component="div"
                    textAlign={"center"}
                >
                    <Link to={"/"} className="text-decoration-none">
                        Tiếp tục mua sắm
                    </Link>
                </Typography>
            </CardContent>
        </Card>
    );

    const userCart = () => (
        <Box p={3}>
            <Grid container spacing={2}>
                <Grid item xs={7} className="table-header">
                    Sản phẩm
                </Grid>
                <Grid
                    item
                    xs={3}
                    className="table-header"
                    sx={{ textAlign: "center", paddingRight: "22px" }}
                >
                    Số lượng
                </Grid>
                <Grid item xs={2} className="table-header">
                    Giá
                </Grid>
            </Grid>
            <Divider sx={{ m: "16px auto" }} />{" "}
            <Box sx={{ overflow: "auto", maxHeight: "450px" }}>
                {context.cart.map((cartItem, index) => (
                    <CartItem
                        cartItem={cartItem}
                        cartTotal={setCartCallback}
                        cartOrdinal={index}
                    />
                ))}
            </Box>
            <Divider sx={{ m: "12px auto" }} />
        </Box>
    );

    return context.cart.length === 0 ? (
        emptyCart()
    ) : (
        <div id="cart">
            <Box className="cart_title">
                <Typography variant="h6" className="cart_title-heading">
                    Giỏ hàng
                </Typography>
                <Typography variant="span" className="cart_title-text">
                    ({context.cart.length} sản phẩm)
                </Typography>
            </Box>

            <Grid container>
                <Grid item xs={6} md={8}>
                    {userCart()}
                </Grid>
                <Grid item xs={6} md={4}>
                    <Box p={3}>
                        <Stack direction="row" className="price-row">
                            <p>Tạm tính</p>
                            <p className="product-price">
                                {numberWithCommas(context.totalCost)}
                            </p>
                        </Stack>
                        <Divider sx={{ m: "16px auto" }} />
                        <Box className="total-box">
                            <Stack direction="row" className="price-row">
                                <Stack direction="row">
                                    <AddShoppingCartIcon sx={{ mr: "12px" }} />
                                    <p>Thành tiền</p>
                                </Stack>
                                <p>{numberWithCommas(context.totalCost)}</p>
                            </Stack>
                        </Box>

                        <Button className="order_btn" onClick={handleOrder}>
                            Tiến hành đặt hàng
                        </Button>

                        <Button className="back_btn" onClick={getBack}>
                            Tiếp tục mua hàng
                        </Button>
                    </Box>
                </Grid>
            </Grid>
            <Recommend />
        </div>
    );
};

export default Cart;
