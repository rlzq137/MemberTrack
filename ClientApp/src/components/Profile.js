import React, { useState, useEffect } from 'react';

const Profile = () => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        // 获取用户个人信息
        const fetchProfile = async () => {
            const token = localStorage.getItem('token'); // 从localStorage中获取JWT Token
            const response = await fetch('http://localhost:5000/api/members/profile', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            setProfile(data);
        };

        fetchProfile();
    }, []);

    if (!profile) {
        return <div>加载中...</div>;
    }

    return (
        <div>
            <h2>个人信息</h2>
            <p>用户名: {profile.username}</p>
            <p>邮箱: {profile.email}</p>
            <p>全名: {profile.fullName}</p>
            <p>性别: {profile.gender}</p>
            <p>出生日期: {profile.dateOfBirth ? new Date(profile.dateOfBirth).toLocaleDateString() : '-'}</p>
            <p>地址: {profile.address}</p>
            <p>电话: {profile.phone}</p>
            <p>会员等级: {profile.memberLevel}</p>
            <p>积分: {profile.points}</p>
            <p>注册日期: {profile.registrationDate ? new Date(profile.registrationDate).toLocaleDateString() : '-'}</p>
        </div>
    );
};

export default Profile;
