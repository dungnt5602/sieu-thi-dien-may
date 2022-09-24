import React from "react";
import { Routes, Route } from "react-router-dom";
import SignIn from "./LogInPage";
import { AuthLayout } from "../auth/AuthLayout";

export const Pages = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<SignIn />} />
                <Route path="/admin/*" element={<AuthLayout />} />
            </Routes>
        </div>
    )
}

