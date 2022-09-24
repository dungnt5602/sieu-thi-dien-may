import React from "react";
import { Box, Stack, Grid } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

const Typography = styled("p")(({ theme }) => {
  return {
    fontSize: "14px",
  };
});

const DiscountItem = ({ product }) => {
  const numberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <Grid container spacing={2} className="discount-product">
      <Grid item xs={6}>
        <Link to={`/products/detail/${product.id}`}>
          <Box className="product-thumbnail">
            <img src={product.imgLink} alt="product-img" />
            <Stack className="button-link" direction="row">
              <ShoppingCartIcon className="shopping-icon" />
              <p className="shopping-content">Mua ngay</p>
            </Stack>
          </Box>
        </Link>
      </Grid>
      <Grid item xs={6}>
        <Link className="product-name" to={`/products/detail/${product.id}`}>
          {product.name}
        </Link>

        <Stack direction="row" spacing={1} sx={{ m: "10px 0 2px 0" }}>
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

        <Typography className="product-description">
          {product.description}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default DiscountItem;
