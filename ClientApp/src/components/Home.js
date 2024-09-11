import React, { useState } from 'react';
import Register from './Register';
import Login from './Login';
import './Home.css'; // 确保背景图片的CSS样式

const Home = () => {
    const [isLoginHovered, setIsLoginHovered] = useState(false);
    const [isRegisterHovered, setIsRegisterHovered] = useState(false);

    return (
        <div className="home-container">
            <h1 className="welcome-text">欢迎进入会员管理系统</h1>
            <div className="form-wrapper">
                <div
                    className="form-container"
                    onMouseEnter={() => setIsLoginHovered(true)}
                    onMouseLeave={() => setIsLoginHovered(false)}
                >
                    <Login isHovered={isLoginHovered} />
                </div>
                <div
                    className="form-container"
                    onMouseEnter={() => setIsRegisterHovered(true)}
                    onMouseLeave={() => setIsRegisterHovered(false)}
                >
                    <Register isHovered={isRegisterHovered} />
                </div>
            </div>
        </div>
    );
};

export default Home;