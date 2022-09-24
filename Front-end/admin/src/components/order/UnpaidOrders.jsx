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
import OrderAPI from "../../api/OrdersAPI";
import { useNavigate } from "react-router-dom";
import { TextField, Typography } from "@mui/material";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from 'dayjs';

const headCells = [
    {
        id: "create_date",
        numeric: true,
        disablePadding: true,
        label: "Ngày tạo đơn",
    },
    {
        id: "name",
        numeric: false,
        disablePadding: false,
        label: "Tên người mua",
    },
    {
        id: "address",
        numeric: false,
        disablePadding: false,
        label: "Địa chỉ",
    },
    {
        id: "status",
        numeric: false,
        disablePadding: false,
        label: "Tình trạng",
    },
    {
        id: "shipping",
        numeric: true,
        disablePadding: false,
        label: "Phí vận chuyển",
    },
    {
        id: "total",
        numeric: true,
        disablePadding: false,
        label: "Tổng tiền",
    },
    {
        id: "note",
        numeric: false,
        disablePadding: false,
        label: "Ghi chú",
    }
];

export default function UnpaidOrders() {
    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("id");
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [rows, setRows] = React.useState([]);
    const [totalElements, setTotalElements] = React.useState(0);
    const [filter, setFilter] = React.useState(false);
    const [value, setValue] = React.useState(null);

    React.useEffect(() => {
        if (!filter) {
            OrderAPI.getUnpaidOrders("", page, rowsPerPage)
                .then((res) => {
                    setRows(res.data.content);
                    setTotalElements(res.data.totalElements);
                })
                .catch((error) => console.log(error));
        }
    }, [page, rowsPerPage, filter]);

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

    const nav = useNavigate();

    const handleClick = (event, id) => {
        // const selectedIndex = selected.indexOf(id);
        // let newSelected = [];

        // if (selectedIndex === -1) {
        //     newSelected = newSelected.concat(selected, id);
        // } else if (selectedIndex === 0) {
        //     newSelected = newSelected.concat(selected.slice(1));
        // } else if (selectedIndex === selected.length - 1) {
        //     newSelected = newSelected.concat(selected.slice(0, -1));
        // } else if (selectedIndex > 0) {
        //     newSelected = newSelected.concat(
        //         selected.slice(0, selectedIndex),
        //         selected.slice(selectedIndex + 1)
        //     );
        // }

        // setSelected(newSelected);
        nav(`${id}`)
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (id) => selected.indexOf(id) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const handleChange = (newValue) => {
        setValue(newValue);
        setFilter(true);

    };

    React.useEffect(() => {
        if (filter) {
            console.log(dayjs(value).format('YYYY-MM-DD'));
            OrderAPI.getUnpaidOrders(dayjs(value).format('YYYY-MM-DD'), page, rowsPerPage)
                .then((res) => {
                    setRows(res.data.content);
                    setTotalElements(res.data.totalElements);
                })
                .catch((error) => console.log(error));
        }
    }, [value, page, rowsPerPage, filter]);

    return (
        <Box sx={{ width: "100%" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
                <DesktopDatePicker
                    label="Lọc theo ngày"
                    inputFormat="DD/MM/YYYY"
                    value={value}
                    onChange={handleChange}
                    renderInput={(params) => <TextField sx={{ ml: 2, mr: 2 }} {...params} />}
                />
                {/* <Paper sx={{ width: "100%", mb: 2 }}> */}
                {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
                <i class="fa-solid fa-rotate-right" onClick={() => {
                    setFilter(false)
                    setValue(null)
                }} style={{ fontSize: "20px", color: "blueviolet", cursor: "pointer" }}></i>
            </div>
            <TableContainer>
                {rows.length > 0 ? (
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                    >
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
                            {stableSort(rows, getComparator(order, orderBy))
                                .map((row, index) => {
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
                                                width="300px"
                                            >
                                                {row.createDate}
                                            </TableCell>
                                            {/* <TableCell align="left" width="300px">
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
                                            </TableCell> */}
                                            <TableCell align="left" width="220px">{row.buyerName}</TableCell>
                                            <TableCell align="left" width="220px">{row.address}</TableCell>
                                            <TableCell align="left" width="220px">{row.status}</TableCell>
                                            <TableCell align="left" width="220px">{row.shipping}</TableCell>
                                            <TableCell align="left" width="220px">{row.total}</TableCell>
                                            <TableCell align="left" width="220px">{row.note}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            {/* {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )} */}
                        </TableBody>
                    </Table>
                ) : (<Box sx={{ opacity: "30%", width: "100%" }}>
                    <Typography variant="h6" component="h4" marginBottom="20px" align='center'>
                        Không thấy đơn hàng cần tìm kiếm
                    </Typography>
                    <img src="https://static.thenounproject.com/png/614274-200.png" alt="empty" style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block' }} />
                </Box>)
                }
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
            {/* </Paper> */}
        </Box>
    );
}
