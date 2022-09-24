import React, { useEffect, useState, useContext } from "react";
import { Box, Grid, Divider, Alert, Snackbar, Slide } from "@mui/material";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductsAPI from "../../api/ProductsAPI";
import DiscountItem from "../../components/Home/DiscountItem";
import Spotlight from "../../components/Home/Spotlight";
import GlobalState from "../../GlobalState";
import CartBox from "../../components/Cart/CartBox";
const settings = {
  infinite: true,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3500,
};

const HomePage = () => {
  const [products, setProducts] = useState([]);

  const { accessToken, username, isLoggedIn, setIsLoggedIn } =
    useContext(GlobalState);

  const [alert, setAlert] = useState({
    open: false,
    severity: "success",
    message: "Đăng xuất thành công",
  });

  useEffect(() => {
    ProductsAPI.getProducts(undefined, '', 0, "&sort=discount,desc")
      .then((res) => {
        setProducts(res.data.content);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (accessToken && !isLoggedIn) {
      setIsLoggedIn(true);
      setAlert((prev) => {
        return {
          ...prev,
          open: true,
          message: "Đăng nhập thành công!",
          type: "login",
        };
      });
    }
    if (!accessToken && isLoggedIn) {
      setIsLoggedIn(false);
      setAlert((prev) => {
        return {
          ...prev,
          open: true,
          message: "Đăng xuất thành công!",
          type: "logout",
        };
      });
    }
  }, [accessToken]);

  const handleClose = () => {
    setAlert((prev) => {
      return {
        ...prev,
        open: false,
      };
    });
  };

  function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
  }

  return (
    <Box className="homepage">
      <Snackbar
        open={alert.open}
        autoHideDuration={3000}
        onClose={handleClose}
        TransitionComponent={TransitionUp}
      >
        <Alert icon={false} severity={alert.severity}>
          {alert.message}
        </Alert>
      </Snackbar>
      {/* Banner1 */}
      <Slider {...settings}>
        <Box
          component="img"
          width="100%"
          src="https://bizweb.dktcdn.net/thumb/2048x2048/100/304/529/themes/648708/assets/slider_3.jpg?1650597743356"
        />
        <Box
          component="img"
          width="100%"
          src="https://bizweb.dktcdn.net/thumb/2048x2048/100/304/529/themes/648708/assets/slider_2.jpg?1650597743356"
        />
      </Slider>

      {/* Discount element */}
      <Box className="discount-element">
        <Link
          to="/products"
          className="link-title text-decoration-none text-danger"
        >
          Giảm Giá Mạnh
        </Link>
        <Divider sx={{ m: "12px 0 32px 0" }} />
        <Grid container spacing={3}>
          {products.map((product, index) => {
            if (index > 1) return null;
            else
              return (
                <Grid item xs={6} key={product.id}>
                  <DiscountItem product={product} />
                </Grid>
              );
          })}
        </Grid>
        <Box sx={{ textAlign: "center" }}>
          <Link to="/promotions" className="promotion-btn">
            Xem tất cả
          </Link>
        </Box>
      </Box>

      {/* Banner2 */}
      <Grid container spacing={3} sx={{ mb: "12px" }}>
        <Grid item xs={4}>
          <Link to="/products/6">
            <Box
              component="img"
              width="100%"
              src="https://bizweb.dktcdn.net/100/304/529/themes/648708/assets/banner_image_index_1.jpg?1650597743356"
            />
          </Link>
        </Grid>
        <Grid item xs={4}>
          <Link to="/products">
            <Box
              component="img"
              width="100%"
              src="https://bizweb.dktcdn.net/100/304/529/themes/648708/assets/banner_image_index_2.jpg?1650597743356"
            />
          </Link>
        </Grid>
        <Grid item xs={4}>
          <Link to="/products/6">
            <Box
              component="img"
              width="100%"
              src="https://bizweb.dktcdn.net/100/304/529/themes/648708/assets/banner_image_index_3.jpg?1650597743356"
            />
          </Link>
        </Grid>
      </Grid>

      {/* Product 1 */}
      <Spotlight />
      <CartBox/>
    </Box>
  );
};

export default HomePage;
