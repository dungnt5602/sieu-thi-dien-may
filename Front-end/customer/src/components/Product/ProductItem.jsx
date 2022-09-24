import React from "react";
import { Box, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from "react-router-dom";
import "./ProductItem.css";

const Typography = styled("p")(({ theme }) => {
  return {
    fontSize: "14px",
  };
});

const ProductItem = ({ product }) => {
  const numberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  return (
    <Box className="product-item">
      <Link to={`/products/detail/${product.id}`}>
        <Box className="product-thumbnail">
          {product.status === "active" ? (<img src={product.imgLink} alt="product-img" />) :
            (<img src={product.imgLink} alt="product-img" style={{ filter: "grayscale(100%)" }} />)}
          <Stack className="button-link" direction="row">
            <ShoppingCartIcon className="shopping-icon" />
            <p className="shopping-content">Mua ngay</p>
          </Stack>
        </Box>
      </Link>
      {product.status === "inactive" ? (<Typography className="product-name" style={{ color: "red", fontSize: "12px" }}>Ngừng kinh doanh</Typography>) : null}
      <Typography sx={{ fontWeight: "500", mb: "8px" }}>
        <Link className="product_link" to={`/products/detail/${product.id}`}>
          {product.name}
        </Link>
      </Typography>

      <Stack direction="row" spacing={1}>
        <Typography
          sx={{
            mt: "1px",
            fontSize: "12px",
            color: "#bbb",
            textDecoration: "line-through",
          }}
        >
          {numberWithCommas(product.price)}
        </Typography>
        <Box
          sx={{
            padding: "2px 4px",
            background: "#dc0021",
            borderRadius: "3px",
          }}
        >
          <Typography sx={{ fontSize: "12px", color: "white" }}>
            - {product.discount}%
          </Typography>
        </Box>
      </Stack>

      <Typography sx={{ mt: "4px", color: "#dc0021", fontWeight: "600" }}>
        {numberWithCommas(product.newPrice)}
      </Typography>
    </Box>
  );
};

export default ProductItem;
