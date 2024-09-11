import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import './AddProduct.css';

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
            <div className="title">商品管理系统</div>
            <div className="location">{`当前位置: ${getLocationText()}`}</div>
            <div className="user-info">
                <span>欢迎, 管理员</span>
                <a href="/logout">退出</a>
            </div>
        </div>
    );
};

const AdminAddProduct = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [stock, setStock] = useState('');
    const [category, setCategory] = useState('');
    const [productId, setProductId] = useState('');

    const handleAddProduct = async () => {
        if (!name || !price || !stock || !category) {
            alert('名称、价格、库存和分类为必填项');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/products/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    description,
                    price: parseFloat(price),
                    imageURL,
                    stock: parseInt(stock, 10),
                    category
                }),
            });

            if (!response.ok) {
                alert('添加商品失败');
                return;
            }

            alert('商品添加成功');
            setName('');
            setDescription('');
            setPrice('');
            setImageURL('');
            setStock('');
            setCategory('');
        } catch (error) {
            console.error('添加商品失败:', error);
        }
    };

    const handleDeleteProduct = async () => {
        if (!productId) {
            alert('请输入商品ID');
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                alert('删除商品失败');
                return;
            }

            alert('商品删除成功');
            setProductId('');
        } catch (error) {
            console.error('删除商品失败:', error);
        }
    };

    return (
        <div className="admin-dashboard">
            <Sidebar />
            <div className="main-content">
                <Topbar />
                <div className="content">
                    <h2>添加商品</h2>
                    <div className="add-product-form">
                        <input
                            type="text"
                            placeholder="名称"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <textarea
                            placeholder="描述"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="价格"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="图片URL"
                            value={imageURL}
                            onChange={(e) => setImageURL(e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="库存"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="分类"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                        <button onClick={handleAddProduct}>添加商品</button>
                    </div>
                    <h2>删除商品</h2>
                    <div className="delete-product-form">
                        <input
                            type="text"
                            placeholder="商品ID"
                            value={productId}
                            onChange={(e) => setProductId(e.target.value)}
                        />
                        <button onClick={handleDeleteProduct}>删除商品</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminAddProduct;
