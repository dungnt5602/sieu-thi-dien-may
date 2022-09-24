import React, { useEffect, useState, Fragment, useContext } from "react";
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  Typography,
} from "@mui/material";
import OrdersAPI from "../../../api/OrdersAPI";
import GlobalState from "../../../GlobalState";

export const OrdersList = ({ ordersQuantity, ...props }) => {
  const { accessToken, userId } = useContext(GlobalState);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // console.log(userId);
    if (ordersQuantity === 0) {
      return;
    } else {
      OrdersAPI.getOrdersByUserId(userId)
        .then((response) => {
          // console.log(userId);
          setOrders(response?.data);
        })
        .catch((err) => {
          console.log(err);
          if (!err?.response) {
            console.log("không nhận resp từ server");
          } else if (err.response?.status === 400) {
            console.log("Không có user");
          }
        });
    }
  }, [accessToken]);

  const formatDateString = (dateString) => {
    const date = new Date(dateString);
    return (
      date.getUTCDate() +
      "/" +
      `${date.getUTCMonth() + 1}` +
      "/" +
      date.getUTCFullYear()
    );
  };

  const columns = [
    {
      field: "date",
      headerName: "Ngày đặt",
      colSpan: 1,
      width: 110,
    },

    {
      field: "order",
      headerName: "Đơn hàng",
      colSpan: 1,
      sortable: false,
      width: 300,
    },
    // {
    //   field: "quantity",
    //   headerName: "Số lượng",
    //   type: "number",
    //   colSpan: 1,
    //   width: 70,
    // },
    {
      field: "address",
      headerName: "Địa chỉ",
      sortable: false,
      colSpan: 1,
      width: 200,
    },
    {
      field: "status",
      headerName: "Trạng thái",
      sortable: false,
      colSpan: 1,
      width: 100,
    },
  ];

  // const orders = [
  //   {
  //     id: 1,
  //     modifiedDate: "5/9/2022",
  //     orderItemList: [
  //       {
  //         id: 8,
  //         category: "Điều hòa",
  //         name: "Điều hòa Daikin",
  //         title: "Daikin",
  //         description:
  //           "là một chiếc tủ lạnh mang gam màu đen đẳng cấp, thời thượng. Đi cùng kiểu dáng tủ lạnh side by Side 2 cửa mở rộng sang trọng, tủ lạnh không chỉ là điểm nhấn cho không gian nội thất mà nó còn giúp bạn thuận tiện trong việc quan sát, tìm kiếm và sắp xếp thực phẩm.",
  //         imgLink:
  //           "https://cdn.tgdd.vn/Products/Images/2002/264209/panasonic-cs-pu9xkh-8m-1.-550x160.jpg",
  //         price: 30.0,
  //         quantity: 1,
  //       },
  //       {
  //         id: 5,
  //         category: "Điều hòa",
  //         name: "Điều hòa Daikin",
  //         title: "Daikin",
  //         description:
  //           "là một chiếc tủ lạnh mang gam màu đen đẳng cấp, thời thượng. Đi cùng kiểu dáng tủ lạnh side by Side 2 cửa mở rộng sang trọng, tủ lạnh không chỉ là điểm nhấn cho không gian nội thất mà nó còn giúp bạn thuận tiện trong việc quan sát, tìm kiếm và sắp xếp thực phẩm.",
  //         imgLink:
  //           "https://cdn.tgdd.vn/Products/Images/2002/264209/panasonic-cs-pu9xkh-8m-1.-550x160.jpg",
  //         price: 30.0,
  //         quantity: 1,
  //       },
  //     ],
  //     address: "224 Doi Can",
  //     status: "Đang giao",
  //     shipping: 20000,
  //     total: 150000,
  //   },
  //   {
  //     id: 2,
  //     modifiedDate: "5/9/2022",
  //     orderItemList: [
  //       {
  //         id: 8,
  //         category: "Điều hòa",
  //         name: "Điều hòa Daikin",
  //         title: "Daikin",
  //         description:
  //           "là một chiếc tủ lạnh mang gam màu đen đẳng cấp, thời thượng. Đi cùng kiểu dáng tủ lạnh side by Side 2 cửa mở rộng sang trọng, tủ lạnh không chỉ là điểm nhấn cho không gian nội thất mà nó còn giúp bạn thuận tiện trong việc quan sát, tìm kiếm và sắp xếp thực phẩm.",
  //         imgLink:
  //           "https://cdn.tgdd.vn/Products/Images/2002/264209/panasonic-cs-pu9xkh-8m-1.-550x160.jpg",
  //         price: 30.0,
  //         quantity: 1,
  //       },
  //     ],
  //     address: "224 Doi Can",
  //     status: "Đang giao",
  //     shipping: 20000,
  //     total: 150000,
  //   },
  // ];

  const numberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  return (
    <>
      <h2 className="fw-normal">Đơn hàng của bạn</h2>
      <TableContainer component="div">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  sx={{ minWidth: column.width }}
                  key={column.field}
                  colSpan={column.colSpan}
                  component="th"
                  align="left"
                >
                  {column.headerName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {ordersQuantity === 0 ? (
            ""
          ) : (
            <TableBody>
              {orders.map((order) => (
                <Fragment key={order.orderId}>
                  <TableRow>
                    <TableCell
                      rowSpan={
                        order.orderItemList.length === 1
                          ? order.orderItemList.length + 1
                          : order.orderItemList.length
                      }
                      sx={{ border: 0 }}
                    >
                      {formatDateString(order.orderInfo.modifiedDate)}
                    </TableCell>
                  </TableRow>
                  <TableRow sx={{ "td, th": { border: 0 } }}>
                    {order.orderItemList.length === 0
                      ? ""
                      : order.orderItemList.map((productInfo) => (
                          <Fragment>
                            <TableRow key={productInfo.id}>
                              <TableCell scope="column" align="left">
                                <img
                                  src={productInfo.product.imgLink}
                                  alt={"Product Img"}
                                  width={100}
                                />
                              </TableCell>
                              <TableCell>
                                {productInfo.product.name} <br />
                                <Typography
                                  className="product-description fw-lighter "
                                  noWrap
                                  variant="subtitle2"
                                  sx={{ maxWidth: 200 }}
                                >
                                  {productInfo.product.description}
                                </Typography>
                              </TableCell>
                              <TableCell>{productInfo.quantity}</TableCell>
                              {/* <TableCell scope="column" align="right">
                          {product.quantity}
                        </TableCell> */}
                            </TableRow>
                          </Fragment>
                        ))}
                    <TableCell
                      rowSpan={
                        order.orderItemList.length === 1
                          ? order.orderItemList.length
                          : order.orderItemList.length - 1
                      }
                    >
                      {order.orderInfo.address}
                    </TableCell>
                    <TableCell
                      rowSpan={
                        order.orderItemList.length === 1
                          ? order.orderItemList.length
                          : order.orderItemList.length - 1
                      }
                    >
                      {order.orderInfo.status}
                    </TableCell>
                  </TableRow>
                  <TableCell colSpan={columns.length} align="right">
                    Tổng tiền:{" "}
                    <span
                      style={{
                        color: "#CA2B2D",
                        fontWeight: "bold",
                        fontSize: "20px",
                      }}
                    >
                      {numberWithCommas(order.orderInfo.total)} VNĐ
                    </span>
                  </TableCell>
                </Fragment>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </>
  );
};
