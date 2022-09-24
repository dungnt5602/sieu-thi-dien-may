import * as React from "react";
import GlobalState from "../../GlobalState";
import { Box, Grid, Stack, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";
import Pagination from "@mui/material/Pagination";
import { useParams } from "react-router-dom";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import ProductItem from "../../components/Product/ProductItem";
import ProductsAPI from "../../api/ProductsAPI";
import { categoryList } from "../../shared/ListData";
import { listSort } from "../../shared/ListSort";
import Filter from "../../components/Filter/Filter";

const Typography = styled("p")(({ theme }) => {
  return {
    fontSize: "14px",
    color: "black",
  };
});

const Product = () => {
  const params = useParams();
  const { query } = React.useContext(GlobalState);
  const [products, setProducts] = React.useState([]);
  const [value, setValue] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [totalPages, setTotalPages] = React.useState(0);
  const [page, setPage] = React.useState(1);

  const handleChange = (event, value) => {
    setPage(value);
  };

  React.useEffect(() => {
    if (params.id === undefined) setTitle("Tất cả sản phẩm");
    else {
      const category = categoryList.find(
        (category) => category.id == params.id
      );
      if (category !== undefined) setTitle(category.title);
    }
  }, [params]);

  React.useEffect(() => {
    ProductsAPI.getProducts(params.id, query, page, value)
      .then((res) => {
        setProducts(res.data.content);
        setTotalPages(res.data.totalPages);
      })
      .catch((error) => console.log(error));
    if (totalPages > 20) setPage(0);
  }, [params.id, value, page, query]);

  return (
    <Grid container sx={{ width: "1170px", m: "20px auto" }}>
      <Grid item xs={3}>
        <Filter />
      </Grid>
      <Grid item xs={9}>
        <Stack className="product">
          <p className="title">{title}</p>
          <Stack direction="row" spacing={2} sx={{ mb: "4px" }}>
            <Typography
              sx={{ fontWeight: "bold", mt: "8px", fontSize: "15px" }}
            >
              Xếp theo
            </Typography>

            <FormControl>
              <RadioGroup row onChange={(e) => setValue(e.target.value)}>
                {listSort.map((item) => (
                  <FormControlLabel
                    key={item.name}
                    value={item.query}
                    control={<Radio size="small" />}
                    label={
                      <Typography className="filter-title">{item.name}</Typography>
                    }
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Stack>
          {products.length !== 0 ? (
            <Divider />
          ) : (
            <Box className="warning">
              <Typography sx={{ fontSize: "14px" }}>
                Sản phẩm đang được cập nhật. Vui lòng quay lại sau.
              </Typography>
            </Box>
          )}
          <Grid
            container
            spacing={3}
            columns={12}
            rowSpacing={4}
            sx={{ mt: "12px" }}
          >
            {products.map((product, index) => (
              <Grid item xs={3} key={index}>
                <ProductItem product={product} />
              </Grid>
            ))}
          </Grid>

          {totalPages > 1 && (
            <Pagination
              count={totalPages}
              variant="outlined"
              shape="rounded"
              color="error"
              onChange={handleChange}
              className="product-pagination"
            />
          )}
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Product;
