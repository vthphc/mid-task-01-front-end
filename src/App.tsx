import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import SignUpPage from "./pages/SignUpPage";
import Customer from "./pages/Customer";
import AddNewCustomer from "./pages/AddNewCustomer";
import EditCustomer from "./pages/EditCustomer";
import SettingPage from "./pages/SettingPage";
import ChangePassword from "./pages/ChangePassword";
import User from "./pages/User";

export default function App() {
    return (
        <div className="max-w-[96rem]">
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path='/dashboard/customers' element={<Customer />} />
                <Route path='/dashboard/add-customer' element={<AddNewCustomer />} />
                <Route path='/dashboard/edit-customer/:id' element={<EditCustomer />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/settings" element={<SettingPage />} />
                <Route path="/settings/change-password" element={<ChangePassword />} />
                <Route path="/dashboard/users"  element={<User />} />
            </Routes>
        </div>
    );
}
