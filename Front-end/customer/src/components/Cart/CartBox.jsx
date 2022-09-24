import * as React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Divider, Grid } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Link } from "react-router-dom";
import "./CartBox.css";
import CartsAPI from "../../api/CartsAPI";
import CartItem from "./CartItem";
import { useContext } from "react";
import GlobalState from "../../GlobalState";
import RecommendsAPI from "../../api/RecommendsAPI";
export default function CartBox() {
    const context = useContext(GlobalState);
    const navigate = useNavigate();
    const handleCloseCart = () => {
        context.setStatusCart(false);
    };

    const handleOpenCartPage = () => {
        navigate("/carts");
    }

    const setCartCallback = (totalCostChange, productList) => {
        context.setTotalCost(totalCostChange);
        context.setCart(productList);
    };

    const handleOrder = () => {
        context.setStatusCart(false);
        if (!context.isLoggedIn) {
            navigate("/account/login");
        } else {
            navigate("/orders")
        }
    }

    React.useEffect(() => {
        if (context.isLoggedIn && !localStorage.getItem("cart")) {
            CartsAPI.getCartByUserId(context.userId, context.accessToken)
                .then((res) => {
                    context.setCart(res.data);
                    context.setTotalCost(res.data[0]["cart"]["total"]);
                })
                .catch((error) => console.log(error));
        } else if (context.isLoggedIn && localStorage.getItem("cart")) {
            const cartData = JSON.parse(localStorage.getItem("cart"));
            for (let index = 0; index < cartData.length; index++) {
                delete cartData[index]["total"];
                 CartsAPI.addProductToCart(context.userId ,cartData[index], context.accessToken)
                    .then((res) => {
                        context.setCart(res.data);
                        context.setTotalCost(res.data[0]["cart"]["total"]);
                    })
                    .catch((error) => console.log(error));
                
                RecommendsAPI.saveRecommendDataForLoginUser(context.userId, cartData[index]["product"]["id"], context.accessToken);
            }
            CartsAPI.getCartByUserId(context.userId, context.accessToken)
            .then((res) => {
                context.setCart(res.data);
                context.setTotalCost(res.data[0]["cart"]["total"]);
            })
            .catch((error) => console.log(error));
            localStorage.removeItem("cart");
        } else if (!context.isLoggedIn && localStorage.getItem("cart")) {
            const cartData = JSON.parse(localStorage.getItem("cart"));
            if (cartData.length !== 0) {
                context.setCart(cartData);
                context.setTotalCost(cartData[0]["total"]);
            }
        }
    }, []);

    const emptyCart = () => (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                width={300}
                image="https://bizweb.dktcdn.net/100/270/860/themes/606449/assets/empty-bags.jpg?1510132489127"
                alt="Empty Card"
            />
            <CardContent>
                <Typography
                    onClick={handleCloseCart}
                    className="empty_cart-btn"
                    gutterBottom
                    variant="h5"
                    component="div"
                    textAlign={"center"}
                >
                    <Link to={"/"} className="text-decoration-none">Tiếp tục mua sắm</Link>
                </Typography>
            </CardContent>
        </Card>
    );

    const userCart = () => (
        <Box
            sx={{
                width: 500,
            }}
            role="presentation"
            className="cart_box"
        >
            <Box className="cart_title">
                <Grid container spacing={2}>
                    <Grid className="cart_heading" item xs={8} onClick={handleOpenCartPage}
                        sx={{cursor: "pointer"}}>
                        <Typography variant="h6" className="cart_title-heading">
                            Giỏ hàng
                        </Typography>
                        <Typography variant="span" className="cart_title-text">
                            ({context.cart.length} sản phẩm)
                        </Typography>
                    </Grid>

                    <Grid item xs={4}>
                        <Box className="close_btn">
                            <IconButton
                                aria-label="add an alarm"
                                onClick={handleCloseCart}
                            >
                                <CloseIcon />
                            </IconButton>
                        </Box>
                    </Grid>
                </Grid>
            </Box>

            <Grid container className="cart_container">
                {context.cart.length === 0
                    ? emptyCart()
                    : context.cart.map((product, index) => (
                          <Grid item key={index}>
                              {/* <CartItem product={product["product"]} /> */}
                              <CartItem
                                  cartItem={product}
                                  cartTotal={setCartCallback}
                                  cartOrdinal={index}
                              />
                          </Grid>
                      ))}
            </Grid>

            <Divider variant="middle" />
            {context.cart.length === 0 ? null : (
                <Box>
                    <Grid
                        container
                        justifyContent="space-between"
                        className="cart_price"
                    >
                        <Typography
                            gutterBottom
                            variant="subtitle1"
                            component="div"
                            sx={{ fontWeight: "bold" }}
                            className="product_name"
                        >
                            Thành tiền
                        </Typography>

                        <Typography
                            gutterBottom
                            variant="subtitle1"
                            component="div"
                            sx={{ fontWeight: "bold" }}
                            className="product_name"
                        >
                            {/* {products[0]["cart"]} */}
                            {context.totalCost.toFixed(3)}.000 đ
                        </Typography>
                    </Grid>

                    <Button className="order_btn" onClick={handleOrder}>
                        Tiến hành đặt hàng
                    </Button>
                </Box>
            )}
        </Box>
    );

    return (
        <div>
            <React.Fragment>
                {/* <Box className="order-action2" onClick={handleOpenCart}>
                    <Typography className="action-title">GIỎ HÀNG</Typography>
                    <Typography>Đặt mua khi cần</Typography>
                </Box> */}
                <Drawer open={context.statusCart} onClose={handleCloseCart}>
                    {userCart()}
                </Drawer>
            </React.Fragment>
        </div>
    );
}
