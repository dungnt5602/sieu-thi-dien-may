import React from "react";
import { debounce, Stack, Grid } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CartsAPI from "../../api/CartsAPI";
import RemoveIcon from "@mui/icons-material/Remove";
import InputBase from "@mui/material/InputBase";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import GlobalState from "../../GlobalState";
import {
    totalCostOfCart,
    handleRemoveCartItem, 
    handleUpdateQuantityCartItem
} from "../../components/Cart/CartAction";
import "./cart.css"
// import "./cart.css";
function CartItem({ cartItem, cartTotal, cartOrdinal }) {
    const [quantity, setQuantity] = React.useState(cartItem["quantity"]);
    const context = React.useContext(GlobalState);

    const numberWithCommas = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      }
    // React.useEffect(() => {

    // }, [cart])

    const handleRemoveItem = async () => {
        if (context.isLoggedIn) {
            await CartsAPI.removeCartItemByUserId(context.userId, cartItem, context.accessToken)
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
            await CartsAPI.updateCartItemByUserId(context.userId, cartItem["product"], cartItem, context.accessToken)
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
    return cartItem !== undefined ? (
        <div className="order-item cart_item">
            <Grid container spacing={2}>
                <Grid item xs={7}>
                    <Grid container spacing={1}>
                        <Grid item xs={4}>
                            <img
                                src={cartItem["product"]["imgLink"]}
                                width="100%"
                            />
                        </Grid>
                        <Grid item xs={8} sx={{ color: "black", fontWeight: "600", fontSize: "16px" }}>
                            {cartItem["product"]["name"]}
                            <b/>
                            
                            <Typography
                                sx={{ cursor: "pointer", color:"#dc0021" }}
                                variant="body2"
                                className="remove_btn"
                                onClick={handleRemoveItem}
                            >
                                Bỏ sản phẩm
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={3} sx={{ textAlign: "center" }}>
                        <Stack direction="row" className="order-container">
                            <button
                                className="decrease-btn"
                                onClick={handleDecrement}
                            >
                                <RemoveIcon sx={{ fontSize: "14px" }} />
                            </button>
                            <InputBase
                                className="quantity"
                                inputProps={{ style: { textAlign: "center" } }}
                                value={quantity}
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
                <Grid item xs={2}>
                    <p className="product-price">                        
                        {numberWithCommas(cartItem["product"]["newPrice"])}
                    </p>
                </Grid>
            </Grid>
        </div>
    ) : null;
}

export default CartItem;
