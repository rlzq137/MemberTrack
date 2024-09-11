import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import './AdminMemberList.css';

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

const AdminMemberList = () => {
    const [members, setMembers] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize] = useState(10);
    const [totalCount, setTotalCount] = useState(0);
    const [searchEmail, setSearchEmail] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const fetchData = async (url) => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            setMembers(data.members || []);
            setTotalCount(data.totalCount || 0);
        } catch (error) {
            console.error('获取会员数据失败:', error);
        }
    };

    useEffect(() => {
        const url = `http://localhost:5000/api/members/all?pageNumber=${pageNumber}&pageSize=${pageSize}`;
        fetchData(url);
    }, [pageNumber, pageSize]);

    const totalPages = Math.ceil(totalCount / pageSize);

    const handlePageChange = (newPageNumber) => {
        if (newPageNumber > 0 && newPageNumber <= totalPages) {
            setPageNumber(newPageNumber);
            const url = searchTerm
                ? `http://localhost:5000/api/members/search?email=${searchTerm}&pageNumber=${newPageNumber}&pageSize=${pageSize}`
                : `http://localhost:5000/api/members/all?pageNumber=${newPageNumber}&pageSize=${pageSize}`;
            fetchData(url);
        }
    };

    const handleSearch = () => {
        setSearchTerm(searchEmail);
        setPageNumber(1); // 重置为第一页
        const url = `http://localhost:5000/api/members/search?email=${searchEmail}&pageNumber=1&pageSize=${pageSize}`;
        fetchData(url);
    };

    const handleClearSearch = () => {
        setSearchEmail('');
        setSearchTerm('');
        setPageNumber(1);
        const url = `http://localhost:5000/api/members/all?pageNumber=1&pageSize=${pageSize}`;
        fetchData(url);
    };

    return (
        <div className="admin-dashboard">
            <Sidebar />
            <div className="main-content">
                <Topbar />
                <div className="content">
                    <h2>会员列表</h2>
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="根据邮箱搜索"
                            value={searchEmail}
                            onChange={(e) => setSearchEmail(e.target.value)}
                        />
                        <button onClick={handleSearch}>搜索</button>
                        <button onClick={handleClearSearch}>退出搜索</button>
                    </div>
                    <table className="member-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>用户名</th>
                                <th>邮箱</th>
                                <th>管理员</th>
                                <th>地址</th>
                                <th>出生日期</th>
                                <th>全名</th>
                                <th>性别</th>
                                <th>会员等级</th>
                                <th>电话</th>
                                <th>积分</th>
                                <th>注册日期</th>
                            </tr>
                        </thead>
                        <tbody>
                            {members.map(member => (
                                <tr key={member.id}>
                                    <td>{member.id}</td>
                                    <td>{member.username}</td>
                                    <td>{member.email}</td>
                                    <td>{member.isAdmin ? '是' : '否'}</td>
                                    <td>{member.address || '-'}</td>
                                    <td>{member.dateOfBirth ? new Date(member.dateOfBirth).toLocaleDateString() : '-'}</td>
                                    <td>{member.fullName || '-'}</td>
                                    <td>{member.gender || '-'}</td>
                                    <td>{member.memberLevel || '-'}</td>
                                    <td>{member.phone || '-'}</td>
                                    <td>{member.points || 0}</td>
                                    <td>{member.registrationDate ? new Date(member.registrationDate).toLocaleDateString() : '-'}</td>
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

export default AdminMemberList;
