import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import MemberDashboard from './components/MemberDashboard';
import AdminDashboard from './components/AdminDashboard';
import AdminMemberList from './components/AdminMemberList';
import AdminAddMember from './components/AdminAddMember';
import AdminOrderList from './components/AdminOrderList'; // ���������
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import AddProduct from './components/AddProduct';
import MemberProductList from './components/MemberProductList';
import MemberOrders from './components/MemberOrders'; // ��������
import BackgroundDecoration from './components/pages/BackgroundDecoration'; // ��������
import FeatureSection from './components/pages/FeatureSection';             // ��������
import Footer from './components/pages/Footer';                             // ��������
import Header from './components/pages/Header';                             // ��������
import Welcome from './components/pages/Welcome';                           // ��������

import './styles.css';

function App() {
    const isAdmin = localStorage.getItem('isAdmin') === 'true'; // ��localStorage�л�ȡ����Ա��Ϣ

    return (
        <Router>
            <div className="App">
                <Routes>
                    
                    <Route path="/" element={<Welcome />} /> {/* ���� Welcome ·�� */}
                    <Route path="/background" element={<BackgroundDecoration />} /> {/* ���� BackgroundDecoration ·�� */}
                    <Route path="/features" element={<FeatureSection />} /> {/* ���� FeatureSection ·�� */}
                    <Route path="/footer" element={<Footer />} /> {/* ���� FeatureSection ·�� */}
                    <Route path="/header" element={<Header />} /> {/* ���� FeatureSection ·�� */}
                    {isAdmin ? (
                        <>
                            <Route path="/admin" element={<AdminDashboard />} />
                            <Route path="/admin/members" element={<AdminMemberList />} />
                            <Route path="/admin/members/add" element={<AdminAddMember />} />
                            <Route path="/admin/orders" element={<AdminOrderList />} /> {/* �����·�� */}
                            <Route path="/admin/products" element={<ProductList />} />
                            <Route path="/admin/products/add" element={<AddProduct />} />
                            <Route path="/products/:id" element={<ProductDetail />} />
                        </>
                    ) : (
                        <>
                            <Route path="/members/*" element={<MemberDashboard />} />
                            <Route path="/members/products" element={<MemberProductList />} />
                            <Route path="/members/orders" element={<MemberOrders />} /> {/* �����ҵĶ���·�� */}
                        </>
                    )}
                    {/* ���û��ƥ���·�ɣ��ض�����ҳ */}
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </div>
        </Router>
    );

}

export default App;