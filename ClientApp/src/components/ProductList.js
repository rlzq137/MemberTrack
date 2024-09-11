import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import './ProductList.css';

const Topbar = () => {
    const location = useLocation();

    const getLocationText = () => {
        switch (location.pathname) {
            case '/admin/products':
                return '商品管理/商品列表';
            case '/admin/products/add':
                return '商品管理/添加商品';
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

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize] = useState(10);
    const [totalCount, setTotalCount] = useState(0);
    const [searchName, setSearchName] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);

    const fetchData = async (url) => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            setProducts(data.products || []);
            setTotalCount(data.totalCount || 0);
        } catch (error) {
            console.error('获取商品数据失败:', error);
        }
    };

    useEffect(() => {
        const url = `http://localhost:5000/api/products/all?pageNumber=${pageNumber}&pageSize=${pageSize}`;
        fetchData(url);
    }, [pageNumber, pageSize]);

    const totalPages = Math.ceil(totalCount / pageSize);

    const handlePageChange = (newPageNumber) => {
        if (newPageNumber > 0 && newPageNumber <= totalPages) {
            setPageNumber(newPageNumber);
            const url = searchTerm
                ? `http://localhost:5000/api/products/search?name=${searchTerm}&pageNumber=${newPageNumber}&pageSize=${pageSize}`
                : `http://localhost:5000/api/products/all?pageNumber=${newPageNumber}&pageSize=${pageSize}`;
            fetchData(url);
        }
    };

    const handleSearch = () => {
        setSearchTerm(searchName);
        setPageNumber(1); // 重置为第一页
        const url = `http://localhost:5000/api/products/search?name=${searchName}&pageNumber=1&pageSize=${pageSize}`;
        fetchData(url);
    };

    const handleClearSearch = () => {
        setSearchName('');
        setSearchTerm('');
        setPageNumber(1);
        const url = `http://localhost:5000/api/products/all?pageNumber=1&pageSize=${pageSize}`;
        fetchData(url);
    };

    const viewDetails = async (productId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/products/${productId}`);
            const data = await response.json();
            setSelectedProduct(data);
        } catch (error) {
            console.error('获取商品详情失败:', error);
        }
    };

    const closeDetails = () => {
        setSelectedProduct(null);
    };

    return (
        <div className="admin-dashboard">
            <Sidebar />
            <div className="main-content">
                <Topbar />
                <div className="content">
                    <h2>商品列表</h2>
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="根据名称搜索"
                            value={searchName}
                            onChange={(e) => setSearchName(e.target.value)}
                        />
                        <button onClick={handleSearch}>搜索</button>
                        <button onClick={handleClearSearch}>退出搜索</button>
                    </div>
                    <table className="product-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>名称</th>
                                <th>价格</th>
                                <th>库存</th>
                                <th>分类</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.stock}</td>
                                    <td>{product.category}</td>
                                    <td><button onClick={() => viewDetails(product.id)}>查看详情</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="pagination">
                        <button onClick={() => handlePageChange(pageNumber - 1)} disabled={pageNumber === 1}>上一页</button>
                        <span>{pageNumber} / {totalPages}</span>
                        <button onClick={() => handlePageChange(pageNumber + 1)} disabled={pageNumber === totalPages}>下一页</button>
                    </div>
                    {selectedProduct && (
                        <div className="product-details">
                            <h3>商品详情</h3>
                            <p>名称: {selectedProduct.name}</p>
                            <p>描述: {selectedProduct.description}</p>
                            <p>价格: {selectedProduct.price}</p>
                            {selectedProduct.imageURL && <img src={selectedProduct.imageURL} alt={selectedProduct.name} />}
                            <button onClick={closeDetails}>收起详情</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductList;
