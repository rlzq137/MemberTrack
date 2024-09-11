import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import './AdminOrderList.css';

const Topbar = () => {
    const location = useLocation();

    const getLocationText = () => {
        switch (location.pathname) {
            case '/admin/orders':
                return '订单管理/订单列表';
            default:
                return '首页';
        }
    };

    return (
        <div className="topbar">
            <div className="title">订单管理系统</div>
            <div className="location">{`当前位置: ${getLocationText()}`}</div>
            <div className="user-info">
                <span>欢迎, 管理员</span>
                <a href="/logout">退出</a>
            </div>
        </div>
    );
};

const AdminOrderList = () => {
    const [orders, setOrders] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize] = useState(10);
    const [totalCount, setTotalCount] = useState(0);

    const fetchData = async (url) => {
        try {
            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            const data = await response.json();
            setOrders(data.orders || []);
            setTotalCount(data.totalCount || 0);
        } catch (error) {
            console.error('获取订单数据失败:', error);
        }
    };

    useEffect(() => {
        const url = `http://localhost:5000/api/orders/all?pageNumber=${pageNumber}&pageSize=${pageSize}`;
        fetchData(url);
    }, [pageNumber, pageSize]);

    const totalPages = Math.ceil(totalCount / pageSize);

    const handlePageChange = (newPageNumber) => {
        if (newPageNumber > 0 && newPageNumber <= totalPages) {
            setPageNumber(newPageNumber);
            const url = `http://localhost:5000/api/orders/all?pageNumber=${newPageNumber}&pageSize=${pageSize}`;
            fetchData(url);
        }
    };

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            const response = await fetch(`http://localhost:5000/api/orders/${orderId}/ship`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ isShipped: newStatus }),
            });

            if (!response.ok) {
                alert('更新订单状态失败');
                return;
            }

            // 更新前端显示
            setOrders(orders.map(order =>
                order.orderId === orderId ? { ...order, isShipped: newStatus } : order
            ));
        } catch (error) {
            console.error('更新订单状态失败:', error);
        }
    };

    return (
        <div className="admin-dashboard">
            <Sidebar />
            <div className="main-content">
                <Topbar />
                <div className="content">
                    <h2>订单列表</h2>
                    <table className="order-table">
                        <thead>
                            <tr>
                                <th>订单ID</th>
                                <th>会员ID</th>
                                <th>商品ID</th>
                                <th>数量</th>
                                <th>订单日期</th>
                                <th>是否发货</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order.orderId}>
                                    <td>{order.orderId}</td>
                                    <td>{order.memberId}</td>
                                    <td>{order.productId}</td>
                                    <td>{order.quantity}</td>
                                    <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                                    <td>
                                        <span className={`status ${order.isShipped ? 'shipped' : 'not-shipped'}`}>
                                            {order.isShipped ? '已发货' : '未发货'}
                                        </span>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleStatusChange(order.orderId, !order.isShipped)}
                                        >
                                            {order.isShipped ? '标记为未发货' : '标记为已发货'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="pagination">
                        <button onClick={() => handlePageChange(pageNumber - 1)} disabled={pageNumber === 1}>上一页</button>
                        <span>{pageNumber} / {totalPages}</span>
                        <button onClick={() => handlePageChange(pageNumber + 1)} disabled={pageNumber === totalPages}>下一页</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminOrderList;
