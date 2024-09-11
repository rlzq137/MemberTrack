import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import './MemberOrders.css';

const MemberOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/orders/member', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                const data = await response.json();
                setOrders(data);
            } catch (error) {
                console.error('获取订单失败:', error);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div>
            <NavBar />
            <div className="orders-container">
                <h2>我的订单</h2>
                <table className="orders-table">
                    <thead>
                        <tr>
                            <th>订单ID</th>
                            <th>商品名称</th>
                            <th>数量</th>
                            <th>订单日期</th>
                            <th>是否发货</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order.orderId}>
                                <td>{order.orderId}</td>
                                <td>{order.productName}</td>
                                <td>{order.quantity}</td>
                                <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                                <td>{order.isShipped ? '已发货' : '未发货'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MemberOrders;
