import * as React from "react";
import { debounce, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import ButtonBase from "@mui/material/ButtonBase";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import "./CartItem.css";
import CartsAPI from "../../api/CartsAPI";
import { useContext } from "react";
import GlobalState from "../../GlobalState";
import { totalCostOfCart } from "./CartAction";
import { useNavigate } from "react-router-dom";
import {
    handleRemoveCartItem,
    handleUpdateQuantityCartItem,
} from "./CartAction";
const Img = styled("img")({
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
});
const CartItem = ({ cartItem, cartTotal, cartOrdinal }) => {
    const context = useContext(GlobalState);
    const navigate = useNavigate();
    const [quantity, setQuantity] = React.useState(cartItem["quantity"]);
    const product = cartItem["product"];

    const handleViewProductDetail = () => {
        let url = `/products/detail/${product.id}`;
        navigate(url);
    };

    const handleRemoveItem = async () => {
        if (context.isLoggedIn) {
            await CartsAPI.removeCartItemByUserId(context.userId, cartItem)
                .then((res) => {
                    console.log(res.data);
                    if (res.data.length !== 0) {
                        // cartTotal(totalCostOfCart(res.data), res.data);
                        cartTotal(res.data[0]["cart"]["total"], res.data);
                    } else {
                        cartTotal(0, res.data);
                    }
                })
                .catch((error) => console.log(error));
        }
        let cartData = handleRemoveCartItem(cartOrdinal);
        cartTotal(totalCostOfCart(cartData), cartData);
        // setQuantity(cartItem["quantity"]);
        // context.setStatusCart(false)
    };

    const handleDecrement = async () => {
        if (Number(quantity) <= 1) {
            setQuantity("1");
            cartItem["quantity"] = quantity;
        } else {
            setQuantity(Number(quantity) - 1);
            cartItem["quantity"] = quantity - 1;
        }
        onChangeInputQuantity(cartItem["quantity"])
    };

    // onchange input 
    const onChangeInputQuantity = async (quantityChanged) => {
        cartItem["quantity"] = quantityChanged;
        console.log(cartItem["quantity"]);
        if (context.isLoggedIn) {
            await CartsAPI.updateCartItemByUserId(context.userId, cartItem["product"], cartItem)
                .then((res) => {
                    cartTotal(res.data[0]["cart"]["total"], res.data);
                })
                .catch((error) => console.log(error));
        }

        const cartData = handleUpdateQuantityCartItem(
            cartOrdinal,
            cartItem["quantity"]
        );
        cartTotal(totalCostOfCart(cartData), cartData);
    }

    const debounceCart = React.useCallback(debounce((quantityChanged) => onChangeInputQuantity(quantityChanged), 200), [])
    const handleQuantityChange = (quantity) => {
        if (Number(quantity) < 1 || quantity === '') {
            setQuantity("1");
            cartItem["quantity"] = 1;
        } 
        else {
            setQuantity(Number(quantity));
            cartItem["quantity"] = quantity;
        } 
        debounceCart(cartItem["quantity"]);
    };

    const handleIncrement = async () => {
        if (Number(quantity) < 1) {
            setQuantity("1");
            cartItem["quantity"] = quantity;
        } else {
            setQuantity(Number(quantity) + 1);
            cartItem["quantity"] = quantity + 1;
        }
        onChangeInputQuantity(cartItem["quantity"]);
    };
    return (
        <Paper
            sx={{
                p: 2,
                margin: "auto",
                maxWidth: 500,
                flexGrow: 1,
                backgroundColor: (theme) =>
                    theme.palette.mode === "dark" ? "#1A2027" : "#fff",
            }}
        >
            <Grid container spacing={2} className="product-cart">
                <Grid item>
                    <ButtonBase
                        sx={{ width: 128, height: 128 }}
                        onClick={handleViewProductDetail}
                    >
                        <Img alt="complex" src={product.imgLink} />
                    </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                            <Typography
                                gutterBottom
                                variant="subtitle1"
                                // component="div"
                                sx={{ fontWeight: "bold", cursor: "pointer" }}
                                className="product_name"
                                onClick={handleViewProductDetail}
                            >
                                {/* <Link
                                    className="product_link"
                                    to={`/products/detail/${product.id}`}
                                > */}
                                {product.name}
                                {/* </Link> */}
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            container
                            xs
                            spacing={2}
                            justifyContent={"space-between"}
                        >
                            <Grid item className="cart_item">
                                <Typography sx={{ fontWeight: "400" }}>
                                    Số lượng
                                </Typography>
                                <Stack direction="row">
                                    <button
                                        className="decrease-btn"
                                        onClick={handleDecrement}
                                    >
                                        <RemoveIcon sx={{ fontSize: "14px" }} />
                                    </button>
                                    <InputBase
                                        className="quantity"
                                        // disabled={true}
                                        inputProps={{
                                            style: {
                                                textAlign: "center",
                                            },
                                        }}
                                        // value={quantity}
                                        value={cartItem["quantity"]}
                                        onChange={(e) =>
                                            handleQuantityChange(e.target.value)
                                        }
                                        type="number"
                                    />
                                    <button
                                        className="increase-btn"
                                        onClick={handleIncrement}
                                    >
                                        <AddIcon sx={{ fontSize: "16px" }} />
                                    </button>
                                </Stack>
                            </Grid>
                            <Grid item>
                                <Typography
                                    variant="subtitle1"
                                    component="div"
                                    className="price"
                                >
                                    {(
                                        (product.price *
                                            (100 - product.discount)) /
                                        100
                                    ).toFixed(3)}
                                    .000 đ
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Typography
                                sx={{ cursor: "pointer", display:"inline-block" }}
                                variant="body2"
                                className="remove_btn"
                                onClick={handleRemoveItem}
                            >
                                Bỏ sản phẩm
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default CartItem;
