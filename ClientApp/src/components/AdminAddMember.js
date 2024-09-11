import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import './AdminMemberList.css';
import './AdminAddMember.css'; // 引入新样式

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

const AdminAddMember = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [gender, setGender] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [memberLevel, setMemberLevel] = useState('');
    const [points, setPoints] = useState('');
    const [deleteId, setDeleteId] = useState('');
    const [deleteEmail, setDeleteEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            setErrorMessage('密码和确认密码不一致');
            return;
        }
        if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
            setErrorMessage('请输入有效的邮箱地址');
            return;
        }
        if (!username) {
            setErrorMessage('用户名不能为空');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/members/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username, email, password, fullName, gender, dateOfBirth,
                    phone, address, memberLevel, points
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                setErrorMessage(errorData.message || '注册失败，请稍后再试');
                return;
            }

            const data = await response.json();
            console.log(data);
            setErrorMessage('注册成功');
        } catch (error) {
            console.error(error);
            setErrorMessage('注册失败，请稍后再试');
        }
    };

    const handleDelete = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/members/delete', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: deleteId,
                    email: deleteEmail
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                setErrorMessage(errorData.message || '删除失败，请稍后再试');
                return;
            }

            setErrorMessage('删除成功');
        } catch (error) {
            console.error(error);
            setErrorMessage('删除失败，请稍后再试');
        }
    };

    return (
        <div className="admin-dashboard">
            <Sidebar />
            <div className="main-content">
                <Topbar />
                <div className="content">
                    <h2>添加会员</h2>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <div className="form-container">
                        <div className="register-form">
                            <input
                                type="text"
                                placeholder="用户名"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="密码"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="确认密码"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="全名"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="性别"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                            />
                            <input
                                type="date"
                                placeholder="出生日期"
                                value={dateOfBirth}
                                onChange={(e) => setDateOfBirth(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="电话"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="地址"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="会员级别"
                                value={memberLevel}
                                onChange={(e) => setMemberLevel(e.target.value)}
                            />
                            <input
                                type="number"
                                placeholder="积分"
                                value={points}
                                onChange={(e) => setPoints(e.target.value)}
                            />
                        </div>
                        <button onClick={handleRegister} className="action-button">添加会员</button>
                    </div>
                    <h2>删除会员</h2>
                    <div className="form-container">
                        <div className="delete-form">
                            <input
                                type="text"
                                placeholder="会员ID"
                                value={deleteId}
                                onChange={(e) => setDeleteId(e.target.value)}
                            />
                            <input
                                type="email"
                                placeholder="会员邮箱"
                                value={deleteEmail}
                                onChange={(e) => setDeleteEmail(e.target.value)}
                            />
                        </div>
                        <button onClick={handleDelete} className="action-button">删除会员</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminAddMember;
