import React from 'react';
import { useLocation } from 'react-router-dom';
import './MemberHeader.css';

const MemberHeader = () => {
    const location = useLocation();

    const getLocationText = () => {
        switch (location.pathname) {
            case '/members/products':
                return '商品列表';
            case '/members/profile':
                return '个人信息';
            case '/members/orders':
                return '订单信息';
            default:
                return '首页';
        }
    };

    return (
        <div className="member-header">
            <div className="title">购物系统</div>
            <div className="location">{`当前位置: ${getLocationText()}`}</div>
            <div className="user-info">
                <a href="/members/profile" className={location.pathname === '/members/profile' ? 'active' : ''}>个人信息</a>
                <a href="/members/orders" className={location.pathname === '/members/orders' ? 'active' : ''}>订单信息</a>
                <a href="/logout">退出</a>
            </div>
        </div>
    );
};

export default MemberHeader;
