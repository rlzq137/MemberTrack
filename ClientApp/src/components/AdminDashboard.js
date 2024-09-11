import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import './AdminDashboard.css';


const Topbar = () => {
    const location = useLocation();

    const getLocationText = () => {
        switch (location.pathname) {
            case '/admin/members':
                return '会员管理/会员列表';
            case '/admin/members/add':
                return '会员管理/添加会员';
            case '/admin/products':
                return '商品管理/商品列表';
            case '/admin/products/add':
                return '商品管理/添加商品';
            case '/admin/orders':
                return '订单管理/订单列表';
            default:
                return '首页';
        }
    };

    return (
        <div className="topbar">
            <div className="title">会员管理系统</div>
            <div className="location">{`当前位置: ${getLocationText()}`}</div>
            <div className="user-info">
                <span>欢迎, 管理员</span>
                <a href="/logout">退出</a>
            </div>
        </div>
    );
};

const AdminDashboard = () => {
    return (
        <div className="admin-dashboard">
            <Sidebar />
            <div className="main-content">
                <Topbar />
                <div className="content">
                    <Routes>
                        <Route path="members" element={<div>会员列表内容</div>} />
                        <Route path="members/add" element={<div>添加会员内容</div>} />
                        <Route path="products" element={<div>商品列表内容</div>} />
                        <Route path="products/add" element={<div>添加商品内容</div>} />
                        <Route path="orders" element={<div>订单列表内容</div>} />
                        {/* 其他子路由 */}
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
