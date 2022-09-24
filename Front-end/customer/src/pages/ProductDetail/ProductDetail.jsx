import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Stack, Grid } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Snackbar from "@mui/material/Snackbar";
import ProductsAPI from "../../api/ProductsAPI";
import Alert from "@mui/material/Alert";
import Recommend from "../../components/Recommend/Recommends";
import CartBox from "../../components/Cart/CartBox";
import { useContext } from "react";
import GlobalState from "../../GlobalState";
import CartsAPI from "../../api/CartsAPI";
import RecommendsAPI from "../../api/RecommendsAPI";
import {
  productIsExistInCart,
  handleUpdateQuantityCartItem,
  handleAddProductToCart,
  handleCreateCart,
} from "../../components/Cart/CartAction";

const ProductDetail = () => {
  const params = useParams();
  const [product, setProduct] = React.useState([]);
  const [quantity, setQuantity] = React.useState("1");
  const [recommend, setRecommend] = React.useState([]);
  const context = useContext(GlobalState);
  const [cartNotify, setCartNotify] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const numberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const { vertical, horizontal, open } = cartNotify;
  const navigate = useNavigate();

  const handleAddThisProductCart = async () => {
    let cartData = [];
    const quantityRequest = Number(quantity) < 1 ? 1 : Number(quantity);
    if (Number(quantity) < 1) setQuantity(1);
    if (context.isLoggedIn) {
      let cartItem = {
        product: product,
        quantity: Number(quantityRequest),
      };
      await CartsAPI.addProductToCart(context.userId, cartItem, context.accessToken)
        .then((res) => {
          // console.log("Check add");
          context.setCart(res.data);
          context.setTotalCost(res.data[0]["cart"]["total"]);
          handleCartNotify();
        })
        .catch((error) => console.log(error));
      RecommendsAPI.saveRecommendDataForLoginUser(context.userId, product.id, context.accessToken);
    } else if (localStorage.getItem("cart")) {
      cartData = JSON.parse(localStorage.getItem("cart"));
      const cartItem = productIsExistInCart(product["id"], cartData);

      if (typeof cartItem == "number") {
        // console.log("Condition 2.1");
        cartData[cartItem]["quantity"] =
          Number(cartData[cartItem]["quantity"]) + Number(quantityRequest);
        cartData = handleUpdateQuantityCartItem(
          cartItem,
          cartData[cartItem]["quantity"]
        );
      } else {
        // console.log("Condition 2.2");
        cartData = handleAddProductToCart(product, Number(quantityRequest));
      }
      context.setCart(cartData);
      context.setTotalCost(cartData[0]["total"]);
      
      handleCartNotify();
    } else {
      // console.log("Condition 3");
      cartData.push(handleCreateCart(product, Number(quantityRequest)));
      localStorage.setItem("cart", JSON.stringify(cartData));
      context.setCart(cartData);
      context.setTotalCost(cartData[0]["total"]);
      
      handleCartNotify();
    }
    // context.setStatusCart(true);
    console.log(context.cart);

    let recommendData = localStorage.getItem("recommend")
      ? JSON.parse(localStorage.getItem("recommend"))
      : [];
    recommendData.push(product);
    if (recommendData.length > 15) {
      while (recommendData.length > 15) {
        recommendData.shift();
      }
    }
    localStorage.setItem("recommend", JSON.stringify(recommendData));
  };

  const handleCartNotify = () => {
    setCartNotify({ open: true, vertical: "top", horizontal: "center" });
    setTimeout(() => {
      setCartNotify({
        open: false,
        vertical: "top",
        horizontal: "center",
      });
    }, 1500);
  }

  const Typography = styled("p")(({ theme }) => {
    return {
      fontSize: "14px",
    };
  });

  const handleOrder = async () => {
    if (!context.isLoggedIn) {
      navigate("/account/login");
    } else {
      let cartItem = {
        product: product,
        quantity: Number(quantity),
      };
      await CartsAPI.addProductToCart(context.userId, cartItem, context.accessToken)
        .then((res) => {
          console.log("Cehck ", res.data);
          context.setCart(res.data);
          context.setTotalCost(res.data[0]["cart"]["total"]);
        })
        .catch((error) => console.log(error));
      navigate("/orders");
    }
  };

  const handleDecrement = () => {
    if (Number(quantity) <= 1) setQuantity("1");
    else setQuantity(Number(quantity) - 1);
  };

  const handleIncrement = () => {
    if (Number(quantity) < 1) setQuantity("1");
    else setQuantity(Number(quantity) + 1);
  };

  React.useEffect(() => {
    let recommendData = localStorage.getItem("recommend")
      ? JSON.parse(localStorage.getItem("recommend"))
      : [];
      
const token = JSON.parse(localStorage.getItem("access_token")) ?  JSON.parse(localStorage.getItem("access_token")) : null;

    ProductsAPI.getProductById(params.id)
      .then((res) => {
        setProduct(res.data);
        recommendData.push(res.data);

        if (recommendData.length > 15) {
          while (recommendData.length > 15) {
            recommendData.shift();
          }
        }
        if (context.isLoggedIn) {
          RecommendsAPI.saveRecommendDataForLoginUser(
            context.userId,
            res.data.id,
            context.accessToken
          );
        }
        localStorage.setItem(
          "recommend",
          JSON.stringify(recommendData)
        );
      })
      .catch((error) => console.log());

    RecommendsAPI.getRecommendsForProductDetail(params.id)
      .then((res) => setRecommend(res.data))
      .catch((error) => console.log(error));
  }, [params.id]);

  if (product.length === 0)
    return <Typography variant="h3">Sản phẩm này không tồn tại</Typography>;

  return (
    <div>
      <Box className="product-detail">
        <Grid container spacing={2} rowSpacing={4}>
          <Grid item xs={5}>
            {product.status === "active" ? (<Box component="img" width="100%" src={product.imgLink} />) : (<Box component="img" width="100%" src={product.imgLink} style={{ filter: "grayscale(100%)" }} />)}
          </Grid>
          <Grid item xs={7}>
            <Typography className="product-name">{product.name}</Typography>
            {product.status === "inactive" ? (<Typography className="product-name" style={{ color: "red", fontSize: "12px" }}>Ngừng kinh doanh</Typography>) : null}

            <Stack direction="row" sx={{ m: "8px 0px" }}>
              <Typography sx={{ fontWeight: "bold" }}>
                Nhà cung cấp: &#160;
              </Typography>
              <Typography>{product.title}</Typography>
            </Stack>

            <Stack direction="row">
              <Typography sx={{ fontWeight: "bold" }}>
                Tình trạng: &#160;
              </Typography>
              <Typography sx={{ color: "red" }}>
                {product.quantity === 0 ? "Hết hàng" : "Còn hàng"}
              </Typography>
            </Stack>

            <Stack direction="row" spacing={1} sx={{ mt: "10px" }}>
              <Typography className="old-price">
                {numberWithCommas(product.price)}
              </Typography>
              <Box className="discount-value">
                <Typography sx={{ fontSize: "12px", color: "white" }}>
                  - {product.discount}%
                </Typography>
              </Box>
            </Stack>

            <Typography className="new-price">
              {numberWithCommas(product.newPrice)}
            </Typography>

            <Typography sx={{ m: "14px 0" }}>{product.description}</Typography>

            {product.status === "active" ? (
              <div>
                <Typography sx={{ fontWeight: "bold" }}>Số lượng</Typography>
                <Stack direction="row" className="order-container">
                  <button className="decrease-btn" onClick={handleDecrement}>
                    <RemoveIcon sx={{ fontSize: "14px" }} />
                  </button>
                  <InputBase
                    className="quantity"
                    inputProps={{ style: { textAlign: "center" } }}
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    type="number"
                  />
                  <button className="increase-btn" onClick={handleIncrement}>
                    <AddIcon sx={{ fontSize: "16px" }} />
                  </button>
                </Stack>

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Box className="order-action1" onClick={handleOrder}>
                      <Typography className="action-title">MUA NGAY</Typography>
                      <Typography>Giao hàng tận nơi</Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={6}>
                    <CartBox />
                    <Box
                      className="order-action2"
                      onClick={handleAddThisProductCart}
                    >
                      <Typography className="action-title">GIỎ HÀNG</Typography>
                      <Typography>Đặt mua khi cần</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </div>
            ) : null}
          </Grid>
        </Grid>
      </Box>

      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        // message="Thêm sản phẩm vào giỏ hàng thành công"
        key={vertical + horizontal}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Thêm sản phẩm vào giỏ hàng thành công!
        </Alert>
      </Snackbar>
      <Recommend productsRecommend={params.id} />
    </div>
  );
};

export default ProductDetail;
