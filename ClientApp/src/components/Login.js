import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ isHovered }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/members/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setErrorMessage(errorData.message);
                return;
            }

            const data = await response.json();
            console.log('登录成功:', data);

            // 将 JWT Token 存储到 localStorage 中
            localStorage.setItem('token', data.token);
            localStorage.setItem('isAdmin', data.isAdmin);

            if (data.isAdmin) {
                navigate('/admin');
            } else {
                navigate('/members');
            }
        } catch (error) {
            console.error('登录失败:', error);
            setErrorMessage('登录失败，请稍后再试');
        }
    };

    return (
        <div className={`login-container ${isHovered ? 'hovered' : ''}`}>
            <h2>登录</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
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
            <button onClick={handleLogin}>登录</button>
        </div>
    );
};

export default Login;
