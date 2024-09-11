import React, { useState } from 'react';
import './Register.css';

const Register = ({ isHovered }) => {
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

    return (
        <div className={`register-container ${isHovered ? 'hovered' : ''}`}>
            <h2>注册</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
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
            <button onClick={handleRegister}>注册</button>
        </div>
    );
};

export default Register;
