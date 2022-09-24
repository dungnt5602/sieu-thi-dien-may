import * as React from "react";
import { Grid, Stack, Divider } from "@mui/material";
import ProductItem from "../../components/Product/ProductItem";
import ProductsAPI from "../../api/ProductsAPI";

const Promotion = () => {
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    ProductsAPI.getTop10Discount()
      .then((res) => {
        setProducts(res.data.content);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <Stack className="promotion">
      <p className="title">Khuyến mãi nổi bật</p>

      <Divider />

      <Grid
        container
        spacing={3}
        columns={15}
        rowSpacing={4}
        sx={{ mb: "24px" }}
      >
        {products.map((product, index) => (
          <Grid item xs={3} key={index}>
            <ProductItem product={product} />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

export default Promotion;
