import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
    const [isMemberMenuOpen, setIsMemberMenuOpen] = useState(false);
    const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);
    const [isOrderMenuOpen, setIsOrderMenuOpen] = useState(false);

    const toggleMemberMenu = () => setIsMemberMenuOpen(!isMemberMenuOpen);
    const toggleProductMenu = () => setIsProductMenuOpen(!isProductMenuOpen);
    const toggleOrderMenu = () => setIsOrderMenuOpen(!isOrderMenuOpen);

    return (
        <div className="sidebar">
            <ul>
                <li>
                    <div className="menu-title" onMouseDown={toggleMemberMenu}>
                        会员管理
                        <span className={`arrow ${isMemberMenuOpen ? 'open' : ''}`}></span>
                    </div>
                    <ul className={`submenu ${isMemberMenuOpen ? 'open' : ''}`}>
                        <li><Link to="/admin/members">会员列表</Link></li>
                        <li><Link to="/admin/members/add">添加会员</Link></li>
                    </ul>
                </li>
                <li>
                    <div className="menu-title" onMouseDown={toggleProductMenu}>
                        商品管理
                        <span className={`arrow ${isProductMenuOpen ? 'open' : ''}`}></span>
                    </div>
                    <ul className={`submenu ${isProductMenuOpen ? 'open' : ''}`}>
                        <li><Link to="/admin/products">商品列表</Link></li>
                        <li><Link to="/admin/products/add">添加商品</Link></li>
                    </ul>
                </li>
                <li>
                    <div className="menu-title" onMouseDown={toggleOrderMenu}>
                        订单管理
                        <span className={`arrow ${isOrderMenuOpen ? 'open' : ''}`}></span>
                    </div>
                    <ul className={`submenu ${isOrderMenuOpen ? 'open' : ''}`}>
                        <li><Link to="/admin/orders">订单列表</Link></li>
                    </ul>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;