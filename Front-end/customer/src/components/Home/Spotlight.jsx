import React from "react";
import { Box, Grid, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import ProductItem from "../Product/ProductItem";
import ProductsAPI from "../../api/ProductsAPI";

const Spotlight = () => {
  const [spotlight1, setSpotlight1] = React.useState([]);
  const [spotlight2, setSpotlight2] = React.useState([]);
  const [spotlight3, setSpotlight3] = React.useState([]);

  React.useEffect(() => {
    ProductsAPI.getProductsByCategory(1, "")
      .then((res) => {
        setSpotlight1(res.data.content);
      })
      .catch((error) => console.log(error));

    ProductsAPI.getProductsByCategory(2, "")
      .then((res) => {
        setSpotlight2(res.data.content);
      })
      .catch((error) => console.log(error));

    ProductsAPI.getProductsByCategory(3, "")
      .then((res) => {
        setSpotlight3(res.data.content);
      })
      .catch((error) => console.log(error));
  }, []);
  let count1 = 0;
  let count2 = 0;
  let count3 = 0;
  return (
    <div>
      {/* Spotlight1 */}
      <Box className="spotlight">
        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
          <Link
            to="/products/1"
            className="component-title text-decoration-none text-danger"
            style={{ borderTopColor: "#ffc300" }}
          >
            MÁY LẠNH - MÁY LỌC KHÔNG KHÍ
          </Link>
          <Link to="/products/1" className="spotlight-nav text-decoration-none text-dark">
            Xem tất cả
          </Link>
        </Stack>
        <Grid container spacing={1}>
          <Grid item xs={3}>
            <Link to="/promotions">
              <Box
                component="img"
                alt="banner"
                width="100%"
                src="https://bizweb.dktcdn.net/100/304/529/themes/648708/assets/sec_module_product_banner_1.jpg?1650597743356"
              />
            </Link>
          </Grid>
          <Grid item xs={9}>
            <Grid container spacing={1}>
              {spotlight1.map((product, index) => {
                if (count1 > 3 || product.status === "inactive") return null;
                else {
                  count1++;
                  return (
                    <Grid item xs={3} key={product.id}>
                      <ProductItem product={product} />
                    </Grid>
                  );
                }
              })}
            </Grid>
          </Grid>
        </Grid>
      </Box>

      {/* Spotlight2 */}
      <Box className="spotlight">
        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
          <Link
            to="/products/2"
            className="component-title text-decoration-none text-danger"
            style={{ borderTopColor: "#f57650" }}
          >
            TIVI - LOA - ÂM THANH
          </Link>
          <Link to="/products/2" className="spotlight-nav text-decoration-none text-dark">
            Xem tất cả
          </Link>
        </Stack>
        <Grid container spacing={1}>
          <Grid item xs={9}>
            <Grid container spacing={1}>
              {spotlight2.map((product, index) => {
                if (count2 > 3 || product.status === "inactive") return null;
                else {
                  count2++;
                  return (
                    <Grid item xs={3} key={product.id}>
                      <ProductItem product={product} />
                    </Grid>
                  );
                }
              })}
            </Grid>
          </Grid>
          <Grid item xs={3}>
            <Link to="/products/4">
              <Box
                component="img"
                alt="banner"
                width="100%"
                src="https://bizweb.dktcdn.net/100/304/529/themes/648708/assets/sec_module_product_banner_2.jpg?1650597743356"
              />
            </Link>
          </Grid>
        </Grid>
      </Box>

      {/* Spotlight3 */}
      <Box className="spotlight">
        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
          <Link
            to="/products/3"
            className="component-title text-decoration-none text-danger"
            style={{ borderTopColor: "#ffc300" }}
          >
            MÁY SẤY - MÁY GIẶT
          </Link>
          <Link to="/products/3" className="spotlight-nav text-decoration-none text-dark">
            Xem tất cả
          </Link>
        </Stack>
        <Grid container spacing={1}>
          <Grid item xs={3}>
            <Link to="/products/7">
              <Box
                component="img"
                alt="banner"
                width="100%"
                src="https://bizweb.dktcdn.net/100/304/529/themes/648708/assets/sec_module_product_banner_4.jpg?1650597743356"
              />
            </Link>
          </Grid>
          <Grid item xs={9}>
            <Grid container>
              {spotlight3.map((product, index) => {
                if (count3 > 3 || product.status === "inactive") return null;
                else {
                  count3++;
                  return (
                    <Grid item xs={3} key={product.id}>
                      <ProductItem product={product} />
                    </Grid>
                  );
                }
              })}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Spotlight;
