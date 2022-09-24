import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import { getComparator, stableSort } from "../shared/Sort";
import EnhancedTableHead from "../shared/EnhancedTableHead";
import EnhancedTableToolbar from "../shared/EnhancedTableToolbar";
import CategoriesAPI from "../../api/CategoriesAPI";
import { Modal, Typography } from "@mui/material";
import { Button } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import { AddCategories } from "./AddCategories";
import { GlobalState } from "../../auth/GlobalState";
import { Snackbar, Alert } from "@mui/material";
import CategoryDetails from "./CategoryDetails";

const headCells = [
  {
    id: "id",
    numeric: true,
    disablePadding: true,
    label: "ID",
  },
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Tên danh mục",
  },
  {
    id: "content",
    numeric: false,
    disablePadding: false,
    label: "Mô tả",
  },
];

export default function Categories() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("id");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState([]);
  const [totalElements, setTotalElements] = React.useState(0);
  const { isAdd, setIsAdd, isDelete, setIsDelete } =
    React.useContext(GlobalState);
  const [id, setId] = React.useState(0);

  React.useEffect(() => {
    CategoriesAPI.getCategories(page, rowsPerPage)
      .then((res) => {
        setRows(res.data.content);
        setTotalElements(res.data.totalElements);
      })
      .catch((error) => console.log(error));
  }, [page, rowsPerPage, isAdd, isDelete]);

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getBack = () => {
    window.history.back();
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const [openDetail, setOpenDetail] = React.useState(false);
  const handleClick = async (event, id) => {
    setId(id);
    setOpenDetail(true);
  };

  return (
    <Box sx={{ width: "100%", backgroundColor: "white", padding: "2rem" }}>
      {/* <Typography
        id="transition-modal-title"
        variant="subtitle1"
        component="h4"
        marginBottom="20px"
        onClick={getBack}
        sx={{
          cursor: "pointer",
          "&:hover": {
            color: "#ccc",
          },
        }}
      >
        <i class="fa-solid fa-chevron-left"></i>
        Quay lại sản phẩm
      </Typography> */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Danh mục
        </Typography>

        <Button
          sx={{
            backgroundColor: "#3b87f7",
            color: "#fff",
            fontSize: "14px",
            padding: "10px 20px",
            height: "40px",
            borderRadius: "5px",
            "&:hover": {
              color: "#00a8ff",
            },
          }}
          onClick={handleOpen}
        >
          Thêm danh mục
        </Button>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                bgcolor: "background.paper",
                border: "1px solid #000",
                boxShadow: 10,
                borderRadius: "5px",
                p: 4,
              }}
            >
              <AddCategories />
              <Button
                sx={{
                  backgroundColor: "#00a8ff",
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
                onClick={handleOpen}
              >
                Thêm danh mục
              </Button>
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={open}>
                  <Box
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      bgcolor: "background.paper",
                      border: "1px solid #000",
                      boxShadow: 10,
                      borderRadius: "5px",
                      p: 4,
                    }}
                  >
                    <AddCategories />
                  </Box>
                </Fade>
              </Modal>
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openDetail}
                onClose={() => setOpenDetail(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={openDetail}>
                  <Box
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      bgcolor: "background.paper",
                      border: "1px solid #000",
                      boxShadow: 10,
                      borderRadius: "5px",
                      p: 4,
                    }}
                  >
                    <CategoryDetails id={id} />
                  </Box>
                </Fade>
              </Modal>
            </Box>
          </Fade>
        </Modal>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={openDetail}
          onClose={() => setOpenDetail(false)}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openDetail}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                bgcolor: "background.paper",
                border: "1px solid #000",
                boxShadow: 10,
                borderRadius: "5px",
                p: 4,
              }}
            >
              <CategoryDetails id={id} />
            </Box>
          </Fade>
        </Modal>
      </Box>
      <Paper sx={{ width: "100%", mb: 2, borderBottom: "5px solid #3b87f7" }}>
        {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
        <TableContainer>
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
                      key={row.id}
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
                        width="65px"
                      >
                        {row.id}
                      </TableCell>
                      <TableCell align="left" width="220px">{row.name}</TableCell>
                      <TableCell align="left" width="220px">{row.content}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalElements}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage='Hiển thị'
          labelDisplayedRows={function defaultLabelDisplayedRows({
            from,
            to,
            count,
          }) {
            return `Từ ${from} đến ${to} trên tổng ${count !== -1 ? count : `Nhiều hơn ${to}`
              }`;
          }}
        />
      </Paper>
      <Snackbar open={isAdd} autoHideDuration={6000} onClose={() => setIsAdd(false)} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert onClose={() => setIsAdd(false)} severity="success" sx={{ width: '100%' }}>
          Thêm danh mục thành công
        </Alert>
      </Snackbar>
      <Snackbar open={isDelete} autoHideDuration={6000} onClose={() => setIsDelete(false)} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert onClose={() => setIsDelete(false)} severity="success" sx={{ width: '100%' }}>
          Xóa danh mục thành công
        </Alert>
      </Snackbar>
    </Box>
  );
}
