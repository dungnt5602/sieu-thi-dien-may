import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Product from "./Product/Product";
import ProductDetail from "./ProductDetail/ProductDetail";
import Introduction from "./Introduction/Introduction";
import Promotion from "./Promotion/Promotion";
import Search from "./Search/Search";
import Order from "./Order/Order";
import HomePage from "./Home/Home";
import { PrivateRoute } from "../components/PrivateRoute";
import { Account, Login, Logout, Contact, Register } from "./index";
import Cart from "./Cart/Cart";
function Pages() {
    return (
        <Routes>
            <Route path="" element={<HomePage />} />
            <Route path="/home" element={<Navigate to="/" />} />
            <Route path="/account">
                <Route path="" element={<Account />} />
                <Route
                    path="login"
                    element={
                        <PrivateRoute>
                            <Login />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="register"
                    element={
                        <PrivateRoute>
                            <Register />
                        </PrivateRoute>
                    }
                />
                <Route path="logout" element={<Logout />} />
            </Route>
            <Route path="/products">
                <Route path="" element={<Product />} />
                <Route path=":id" element={<Product />} />
                <Route path="detail/:id" element={<ProductDetail />} />
            </Route>
            <Route path="/introduction" element={<Introduction />} />
            <Route path="/promotions" element={<Promotion />} />
            <Route path="/search=:key" element={<Search />} />
            <Route path="/orders" element={<Order />} />
            <Route path="/carts" element={<Cart/>}/>
            <Route path="/contact" element={<Contact />} />
        </Routes>
    );
}

export default Pages;
