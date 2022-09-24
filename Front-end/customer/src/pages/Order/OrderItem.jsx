import React from "react";
import { Box, Divider, Stack, Grid } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CartsAPI from "../../api/CartsAPI";
import GlobalState from "../../GlobalState";
const OrderItem = () => {
    const { cart, userId } = React.useContext(GlobalState);
    const [cartData, setCartData] = React.useState([]);
    const context = React.useContext(GlobalState);

    React.useEffect(() => {
        CartsAPI.getCartByUserId(userId, context.accessToken)
            .then((res) => {
                setCartData(res.data);
            })
            .catch((error) => console.log(error));
    }, [cart]);

    const numberWithCommas = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      }
    // const renderOrder = () => {
    return cartData[0] ? (
        <div>
            <p className="order-title">Đơn hàng của bạn</p>

            <Box p={3}>
                <Grid container spacing={2}>
                    <Grid item xs={7} className="table-header">
                        Sản phẩm
                    </Grid>
                    <Grid item xs={3} className="table-header">
                        Số lượng
                    </Grid>
                    <Grid item xs={2} className="table-header">
                        Giá
                    </Grid>
                </Grid>
                <Divider sx={{ m: "16px auto" }} />{" "}
                <Box sx={{ overflow: "auto", maxHeight: "350px" }}>
                    {cartData.map((cartItem, index) => (
                        <div className="order-item">
                            <Grid container spacing={2}>
                                <Grid item xs={7}>
                                    <Grid container spacing={1}>
                                        <Grid item xs={4}>
                                            <img
                                                src={
                                                    cartItem["product"][
                                                        "imgLink"
                                                    ]
                                                }
                                                width="100%"
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            xs={8}
                                            sx={{ color: "black" }}
                                        >
                                            {cartItem["product"]["name"]}
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={3} sx={{ textAlign: "center" }}>
                                    <p>{cartItem["quantity"]}</p>
                                </Grid>
                                <Grid item xs={2}>
                                    <p className="product-price">
                                        {" "}                                        
                                        {numberWithCommas(cartItem["product"]["newPrice"])}
                                    </p>
                                </Grid>
                            </Grid>
                        </div>
                    ))}
                </Box>
                <Divider sx={{ m: "12px auto" }} />
                <Stack direction="row" className="price-row">
                    <p>Tổng giá trị sản phẩm</p>
                    <p className="product-price">
                        {numberWithCommas(cartData[0]["cart"]["total"])}
                    </p>
                </Stack>
                <Stack direction="row" className="price-row">
                    <p>Phí vận chuyển</p>
                    <p className="product-price">--- đ</p>
                </Stack>
                <Divider sx={{ m: "12px auto" }} />
                <Box className="total-box">
                    <Grid container spacing={2}>
                        <Grid item xs={9}>
                            <Stack direction="row">
                                <AddShoppingCartIcon sx={{ mr: "12px" }} />
                                <p>Tổng giá trị đơn hàng</p>
                            </Stack>
                        </Grid>
                        <Grid item xs={3} sx={{ textAlign: "right" }}>
                            <p>
                                {numberWithCommas(cartData[0]["cart"]["total"])}
                            </p>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </div>
    ) : null;

    // return cartData[0] ? renderOrder : null;
    // return renderOrder;
};

export default OrderItem;
