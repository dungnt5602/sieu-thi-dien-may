import React, { useEffect } from "react";
import { Typography, Grid, Button, Snackbar, Alert, Stack, Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ProductsAPI from "../../api/ProductsAPI";
import { GlobalState } from "../../auth/GlobalState";

const ProductDetail = () => {
  const nav = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = React.useState({});
  const [category, setCategory] = React.useState("");
  const getBack = () => {
    window.history.back();
  };
  const { setIsDelete, token, isEdit, setIsEdit, setIsContinue } =
    React.useContext(GlobalState);
  useEffect(() => {
    const fetchData = async () => {
      const result = await ProductsAPI.getProductById(id);
      setProduct(result.data);
      setCategory(result.data.category.name);
    };
    fetchData();
  }, [id]);

  console.log(product);

  const changeInfoModal = () => {
    nav("edit");
  };

  const deleteProduct = async () => {
    await ProductsAPI.deleteProduct(id, { status: "inactive" }, token);
    getBack();
    setIsDelete(true);
  };

  const continueProduct = async () => {
    await ProductsAPI.deleteProduct(id, { status: "active" }, token);
    getBack();
    setIsContinue(true);
  };

  function numberWithCommas(x) {
    if (x !== undefined) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
  }

  return (
    <div className="product-detail-wrapper" style={{ backgroundColor: "white", padding: "1rem 2rem" }}>
      <Typography
        id="transition-modal-title"
        variant="subtitle1"
        component="h4"
        marginTop="20px"
        onClick={getBack}
        sx={{
          cursor: "pointer", mb: "12px",
          "&:hover": {
            color: "#777",
          },
        }}
      >
        <i class="fa-solid fa-chevron-left"></i>
        Quay lại danh sách sản phẩm
      </Typography>

      {/* <h1>Thông tin sản phẩm {product.name} </h1> */}

      <Grid container spacing={2}>
        <Grid item xs={12} sm={5}>
          <img src={product.imgLink} alt={product.name} width="95%" />
        </Grid>
        <Grid item xs={12} sm={7} className="product-detail">
        <Typography className="product-name">{product.name}</Typography>
            {product.status === "inactive" ? (<Typography className="product-name" style={{ color: "red", fontSize: "12px" }}>Ngừng kinh doanh</Typography>) : null}

            <Stack direction="row" sx={{ m: "8px 0px" }}>
              <Typography sx={{ fontWeight: "bold" }}>
                Mã sản phẩm: &#160;
              </Typography>
              <Typography>{product.code}</Typography>
            </Stack>

            <Stack direction="row" sx={{ m: "8px 0px" }}>
              <Typography sx={{ fontWeight: "bold" }}>
                Thương hiệu: &#160;
              </Typography>
              <Typography>{product.title}</Typography>
            </Stack>

            <Stack direction="row">
              <Typography sx={{ fontWeight: "bold" }}>
                Tình trạng: &#160;
              </Typography>
              <Typography sx={{ color: "#018afe" }}>
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

            <Button
        variant="contained"
        onClick={changeInfoModal}
        style={{
          marginRight: "10px",
          marginBottom: "20px",
          backgroundColor: "#3b87f7",
          color: "white",
        }}
      >
        Chỉnh sửa
      </Button>
      {product.status === "active" ? (
        <Button
          variant="text"
          onClick={deleteProduct}
          style={{
            marginRight: "10px",
            marginBottom: "20px",
            backgroundColor: "#white",
            color: "#3b87f7",
          }}
        >
          Ngừng kinh doanh
        </Button>) : (
        <Button
          variant="text"
          onClick={continueProduct}
          style={{
            marginRight: "10px",
            marginBottom: "20px",
            backgroundColor: "#white",
            color: "#3b87f7",
          }}
        >
          Tiếp tục kinh doanh
        </Button>)}
        </Grid>
      </Grid>

      <Snackbar
        open={isEdit}
        autoHideDuration={3000}
        onClose={() => setIsEdit(false)
        }
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Chỉnh sửa thành công!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ProductDetail;
