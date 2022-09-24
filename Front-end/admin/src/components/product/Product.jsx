import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import InputAdornment from "@mui/material/InputAdornment";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";
import ProductsAPI from "../../api/ProductsAPI";
import { getComparator, stableSort } from "../shared/Sort";
import EnhancedTableHead from "../shared/EnhancedTableHead";
import {
  Button,
  Snackbar,
  Alert,
  Grid,
  List,
  ListItem,
  ListItemText,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { GlobalState } from "../../auth/GlobalState";
import { useEffect } from "react";
import CategoriesAPI from "../../api/CategoriesAPI";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import "./Product.scss";

const headCells = [
  {
    id: "id",
    numeric: true,
    disablePadding: true,
    label: "Mã sản phẩm",
    width: 150,
  },
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Sản phẩm",
    width: 450,
  },
  {
    id: "brand",
    numeric: false,
    disablePadding: false,
    label: "Thương hiệu",
    width: 200,
  },
  {
    id: "price",
    numeric: false,
    disablePadding: false,
    label: "Giá cả",
    width: 150,
  },
  {
    id: "quantity",
    numeric: true,
    disablePadding: false,
    label: "Số lượng",
    width: 150,
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Tình trạng",
  },
];

export default function Product() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("id");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState([]);
  const [totalElements, setTotalElements] = React.useState(0);
  const { isDelete, setIsDelete, isAdd, setIsAdd, isContinue, setIsContinue } =
    React.useContext(GlobalState);

  const [categories, setCategories] = React.useState([]);

  const [categoryId, setCategoryId] = React.useState("");

  const [isFilter, setIsFilter] = React.useState(false);

  const [search, setSearch] = React.useState("");
  const [isSearch, setIsSearch] = React.useState(false);

  const [categoryName, setCategoryName] = React.useState("");

  const nav = useNavigate();

  React.useEffect(() => {
    if (isFilter === false && isSearch === false) {
      ProductsAPI.getProducts(page, rowsPerPage)
        .then((res) => {
          setRows(res.data.content);
          setTotalElements(res.data.totalElements);
        })
        .catch((error) => console.log(error));
    }
  }, [page, rowsPerPage, isFilter, isSearch]);

  useEffect(() => {
    CategoriesAPI.getCategories()
      .then((res) => {
        setCategories(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (isFilter === true) {
      ProductsAPI.getProductsByCategory(categoryId, page, rowsPerPage)
        .then((res) => {
          setRows(res.data.content);
          setTotalElements(res.data.totalElements);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [categoryId, page, rowsPerPage, isFilter]);

  useEffect(() => {
    if (isSearch === true) {
      ProductsAPI.getProductsBySearch(search.trim(), page, rowsPerPage)
        .then((res) => {
          setRows(res.data.content);
          setTotalElements(res.data.totalElements);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [search, page, rowsPerPage, isSearch]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    nav(`${id}`);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const handleAdd = () => {
    nav("add");
  };
  const handleChange = (event) => {
    setCategoryName(event.target.value);
  };

  return (
    <div className="product-wrapper">
      <Grid container spacing={2} style={{ marginBottom: "1rem" }}>
        <Grid item md={4}>
          <Typography variant="h4" gutterBottom>
            Sản phẩm
          </Typography>
        </Grid>
        <Grid item md={3}>
          <TextField
            id="search-bar"
            className="text"
            label="Tìm kiểm sản phẩm"
            placeholder="theo tên hoặc mã sản phẩm"
            variant="outlined"
            size="small"
            style={{ width: "100%" }}
            onInput={(e) => {
              setSearch(e.target.value);
              setIsSearch(true);
              setPage(0);
            }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton edge="end">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </Grid>
        <Grid item md={3}>
          <FormControl sx={{ width: "100%" }} size="small">
            <InputLabel id="demo-simple-select-label">Danh mục</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={categoryName}
              label="Danh mục"
              onChange={handleChange}
            >
              <MenuItem
                value="Tất cả"
                onClick={() => {
                  setIsFilter(false);
                  setIsSearch(false);
                }}
              >
                Tất cả
              </MenuItem>
              {categories.map((category, index) => (
                <MenuItem
                  key={index}
                  value={category.name}
                  onClick={() => {
                    setCategoryId(category.id);
                    setIsFilter(true);
                    setPage(0);
                  }}
                  sx={{
                    "&:hover": {
                      backgroundColor: "#fafafa",
                      cursor: "pointer",
                    },
                  }}
                >
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item md={2}>
          <Button
            sx={{
              backgroundColor: "#3b87f7",
              color: "#fff",
              fontSize: "14px",
              padding: "10px 20px",
              borderRadius: "5px",
              width: "200px",
              height: "40px",
              "&:hover": {
                color: "#00a8ff",
              },
            }}
            onClick={handleAdd}
          >
            Thêm sản phẩm
          </Button>
        </Grid>
      </Grid>
      {/* <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Sản phẩm
        </Typography>
        <Button
          sx={{
            backgroundColor: "#3b87f7",
            color: "#fff",
            fontSize: "14px",
            padding: "10px 20px",
            borderRadius: "5px",
            width: "200px",
            height: "40px",
            "&:hover": {
              color: "#00a8ff",
            },
          }}
          onClick={handleAdd}
        >
          Thêm sản phẩm
        </Button>
      </Box> */}
      <Grid container spacing={1}>
        <Grid item md={12}>
          <Paper
            sx={{ width: "100%", mb: 2, borderBottom: "5px solid #3b87f7" }}
          >
            {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
            <TableContainer>
              {rows.length > 0 ? (
                <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                  <EnhancedTableHead
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={rows.length}
                    headCells={headCells}
                  />

                  <TableBody>
                    {console.log(rows)}
                    {stableSort(rows, getComparator(order, orderBy)).map(
                      (row, index) => {
                        const isItemSelected = isSelected(row.id);
                        const labelId = `enhanced-table-checkbox-${index}`;

                        return (
                          <TableRow
                            hover
                            onClick={(event) => handleClick(event, row.id)}
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={index}
                            selected={isItemSelected}
                            sx={{ cursor: "pointer" }}
                          >
                            <TableCell padding="checkbox">
                              {/* <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        /> */}
                            </TableCell>
                            <TableCell
                              component="th"
                              id={labelId}
                              scope="row"
                              padding="none"
                              width="170px"
                            >
                              {row.code}
                            </TableCell>
                            <TableCell align="left" width="300px">
                              <Stack direction="row" spacing={2}>
                                <Box
                                  component="img"
                                  sx={{ height: 50, width: 50 }}
                                  alt="Product image"
                                  src={row.imgLink}
                                />
                                <Typography variant="body2" pt="17px">
                                  {row.name}
                                </Typography>
                              </Stack>
                            </TableCell>
                            <TableCell align="left" width="250px">
                              {row.title}
                            </TableCell>
                            <TableCell align="left" width="250px">
                              {row.newPrice}
                            </TableCell>
                            <TableCell align="left" width="250px">
                              {row.quantity}
                            </TableCell>
                            <TableCell align="left" width="250px">
                              {row.status === "active" ? (
                                <Typography
                                  sx={{ fontSize: "12px", color: "green" }}
                                >
                                  Đang kinh doanh
                                </Typography>
                              ) : (
                                <Typography
                                  sx={{ fontSize: "12px", color: "red" }}
                                >
                                  Ngừng kinh doanh
                                </Typography>
                              )}
                            </TableCell>
                          </TableRow>
                        );
                      }
                    )}
                  </TableBody>
                </Table>
              ) : (
                <Box sx={{ opacity: "30%", width: "100%" }}>
                  <Typography
                    variant="h6"
                    component="h4"
                    marginBottom="20px"
                    align="center"
                  >
                    Không có sản phẩm nào
                  </Typography>
                  <img
                    src="https://static.thenounproject.com/png/614274-200.png"
                    alt="empty"
                    style={{
                      marginLeft: "auto",
                      marginRight: "auto",
                      display: "block",
                    }}
                  />
                </Box>
              )}
            </TableContainer>
            <TablePagination
              labelRowsPerPage="Hiển thị"
              labelDisplayedRows={function defaultLabelDisplayedRows({
                from,
                to,
                count,
              }) {
                return `Từ ${from} đến ${to} trên tổng ${
                  count !== -1 ? count : `Nhiều hơn ${to}`
                }`;
              }}
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={totalElements}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Grid>
      </Grid>
      <Snackbar
        open={isDelete}
        autoHideDuration={6000}
        onClose={() => setIsDelete(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setIsDelete(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Ngừng sản phẩm thành công
        </Alert>
      </Snackbar>
      <Snackbar
        open={isAdd}
        autoHideDuration={6000}
        onClose={() => setIsAdd(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setIsAdd(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Thêm sản phẩm thành công
        </Alert>
      </Snackbar>
      <Snackbar
        open={isContinue}
        autoHideDuration={6000}
        onClose={() => setIsContinue(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setIsContinue(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Tiếp tục kinh doanh sản phẩm
        </Alert>
      </Snackbar>
    </div>
  );
}
