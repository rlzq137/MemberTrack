import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import MemberDashboard from './components/MemberDashboard';
import AdminDashboard from './components/AdminDashboard';
import AdminMemberList from './components/AdminMemberList';
import AdminAddMember from './components/AdminAddMember';
import AdminOrderList from './components/AdminOrderList'; // 引入新组件
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import AddProduct from './components/AddProduct';
import MemberProductList from './components/MemberProductList';
import MemberOrders from './components/MemberOrders'; // 新增导入
import BackgroundDecoration from './components/pages/BackgroundDecoration'; // 新增导入
import FeatureSection from './components/pages/FeatureSection';             // 新增导入
import Footer from './components/pages/Footer';                             // 新增导入
import Header from './components/pages/Header';                             // 新增导入
import Welcome from './components/pages/Welcome';                           // 新增导入

import './styles.css';

function App() {
    const isAdmin = localStorage.getItem('isAdmin') === 'true'; // 从localStorage中获取管理员信息

    return (
        <Router>
            <div className="App">
                <Routes>
                    
                    <Route path="/" element={<Welcome />} /> {/* 新增 Welcome 路由 */}
                    <Route path="/background" element={<BackgroundDecoration />} /> {/* 新增 BackgroundDecoration 路由 */}
                    <Route path="/features" element={<FeatureSection />} /> {/* 新增 FeatureSection 路由 */}
                    <Route path="/footer" element={<Footer />} /> {/* 新增 FeatureSection 路由 */}
                    <Route path="/header" element={<Header />} /> {/* 新增 FeatureSection 路由 */}
                    {isAdmin ? (
                        <>
                            <Route path="/admin" element={<AdminDashboard />} />
                            <Route path="/admin/members" element={<AdminMemberList />} />
                            <Route path="/admin/members/add" element={<AdminAddMember />} />
                            <Route path="/admin/orders" element={<AdminOrderList />} /> {/* 添加新路由 */}
                            <Route path="/admin/products" element={<ProductList />} />
                            <Route path="/admin/products/add" element={<AddProduct />} />
                            <Route path="/products/:id" element={<ProductDetail />} />
                        </>
                    ) : (
                        <>
                            <Route path="/members/*" element={<MemberDashboard />} />
                            <Route path="/members/products" element={<MemberProductList />} />
                            <Route path="/members/orders" element={<MemberOrders />} /> {/* 新增我的订单路由 */}
                        </>
                    )}
                    {/* 如果没有匹配的路由，重定向到主页 */}
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </div>
        </Router>
    );

}

export default App;