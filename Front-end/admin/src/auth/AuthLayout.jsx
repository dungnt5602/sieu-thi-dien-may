import React from "react";
import MiniDrawer, { DrawerHeader } from "../components/Drawer";
import Box from "@mui/material/Box";
import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard";
import { Order } from "../pages/Order";
import Table from "../components/customer/AllCustomers";
import Product from "../components/product/Product";
import { AdminInfo } from "../components/admin/AdminInfo";
import { DataProvider } from "./GlobalState";
import Categories from "../components/categories/Categories";
import AddProduct from "../components/product/AddProduct";
import ProductDetail from "../components/product/ProductDetail";
import ProductEdit from "../components/product/ProductEdit";
import OrderDetail from "../components/order/OrderDetail";
import CustomerDetail from "../components/customer/CustomerDetail";
import Analysis from "../components/analysis/Analysis";
import AddCustomer from "../components/customer/AddCustomer";
import CustomerEdit from "../components/customer/CustomerEdit";
export const AuthLayout = () => {
  return (
    <DataProvider>
      <Box sx={{ display: "flex", backgroundColor: "#fafafa" }}>
        <MiniDrawer />
        <Box component="main" sx={{ flexGrow: 1, p: 7 }}>
          <DrawerHeader />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/order" element={<Order />} />
            <Route path="/order/:id" element={<OrderDetail />} />
            <Route path="/products" element={<Product />} />
            <Route path="/products/add" element={<AddProduct />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/products/:id/edit" element={<ProductEdit />} />
            <Route path="/customer" element={<Table />} />
            <Route path="/customer/:id" element={<CustomerDetail />} />
                        <Route path="/customer/:id/edit" element={<CustomerEdit />} />
                        <Route path="customer/add" element={<AddCustomer/>} />
            <Route path="/account" element={<AdminInfo />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/analysis" element={<Analysis />} />
          </Routes>
        </Box>
      </Box>
    </DataProvider>
  );
};
