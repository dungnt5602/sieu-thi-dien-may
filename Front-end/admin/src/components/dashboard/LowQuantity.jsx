import { TableContainer, Typography, Table, TableCell, TableHead, TableRow, TableBody, TablePagination, Box } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductsAPI from "../../api/ProductsAPI";

const LowQuantity = () => {

    const [products, setProducts] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [totalElements, setTotalElements] = React.useState(0);
    const nav = useNavigate();

    useEffect(() => {
        ProductsAPI.getLowQuantityProducts(page, rowsPerPage).then((res) => {
            setProducts(res.data.content);
            setTotalElements(res.data.totalElements);
        });
    }, [page, rowsPerPage]);

    const navProduct = (id) => {
        nav(`/admin/products/${id}`);
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div>
            <Typography variant="h6" component="h6" sx={{ fontSize: "14px", marginTop: 1, fontWeight: "Bold" }}>
                Sản phẩm sắp hết hàng
            </Typography>
            <TableContainer >
                {products.length > 0 ? (
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell align="left">Tên sản phẩm</TableCell>
                                <TableCell align="left">Số lượng</TableCell>
                                <TableCell align="left">Giá</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.map((product) => (
                                <TableRow
                                    key={product.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: "pointer", "&:hover": { backgroundColor: "#f5f5f5" } }}
                                    onClick={() => navProduct(product.id)}
                                >
                                    <TableCell component="th" scope="row">
                                        {product.id}
                                    </TableCell>
                                    <TableCell align="left">{product.name}</TableCell>
                                    <TableCell align="left">{product.quantity}</TableCell>
                                    <TableCell align="left">{product.newPrice}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) :
                    (<Box sx={{ opacity: "30%", width: "100%", mt: 5 }}>
                        <Typography variant="h8" component="h4" marginBottom="20px" align='center'>
                            Không có sản phẩm nào sắp hết hàng
                        </Typography>
                        <img src="https://static.thenounproject.com/png/614274-200.png" alt="empty" style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block' }} />
                    </Box>)}

                <TablePagination
                    rowsPerPageOptions={[]}
                    component="div"
                    count={totalElements}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
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
            </TableContainer>
        </div>
    )
}

export default LowQuantity;