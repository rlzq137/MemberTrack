// MemberDashboard.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './NavBar';
import Profile from './Profile';
import MemberOrders from './MemberOrders';
import MemberProductList from './MemberProductList';

const MemberDashboard = () => {
    return (
        <div>
            <NavBar />
            <div className="content">
                <Routes>
                    <Route path="profile" element={<Profile />} />
                    <Route path="orders" element={<MemberOrders />} />
                    <Route path="products" element={<MemberProductList />} />
                    <Route path="*" element={<Navigate to="profile" />} />
                </Routes>
            </div>
        </div>
    );
};

export default MemberDashboard;
