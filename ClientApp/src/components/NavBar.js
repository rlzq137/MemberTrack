// NavBar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('isAdmin');
        navigate('/'); // 重定向到主页
    };

    return (
        <nav className="navbar">
            <ul>
                <li><Link to="/members/profile">个人信息</Link></li>
                <li><Link to="/members/orders">我的订单</Link></li>
                <li><Link to="/members/products">商品列表</Link></li>
                <li><button onClick={handleLogout} className="logout-button">退出登录</button></li>
            </ul>
        </nav>
    );
};

export default NavBar;
