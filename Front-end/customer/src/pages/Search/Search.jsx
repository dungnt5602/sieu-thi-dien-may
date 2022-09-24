import React from "react";
import { useParams } from "react-router-dom";
import { Grid, Stack, Pagination } from "@mui/material";
import ProductItem from "../../components/Product/ProductItem";
import ProductsAPI from "../../api/ProductsAPI";

const Search = () => {
  const params = useParams();
  const [products, setProducts] = React.useState([]);
  const [totalElements, setTotalElements] = React.useState(0);
  const [totalPages, setTotalPages] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  React.useEffect(() => {
    if (params.key !== undefined) {
      ProductsAPI.getProductByName(params.key, page)
        .then((res) => {
          setProducts(res.data.content);
          setTotalPages(res.data.totalPages);
          setTotalElements(res.data.totalElements);
        })
        .catch((error) => console.log(error));
    }
  }, [params.key, page]);

  return (
    <Stack className="search">
      {products.length !== 0 ? (
        <p className="search-title">
          Có {totalElements} kết quả tìm kiếm phù hợp
        </p>
      ) : (
        <div>
          <p className="search-title">
            Không tìm thấy bất kỳ kết quả nào với từ khóa trên.
          </p>
          <p className="search-info">Vui lòng nhập từ khóa tìm kiếm khác</p>
        </div>
      )}

      <Grid container spacing={3} rowSpacing={4} sx={{ mt: "12px" }}>
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
  );
};

export default Search;
