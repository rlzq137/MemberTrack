import React from 'react';
import './Topbar.css';

const Topbar = () => {
    return (
        <div className="topbar">
            <div className="location">当前位置: 首页</div>
            <div className="user-info">
                欢迎, 管理员 | <a href="/logout">退出</a>
            </div>
        </div>
    );
};

export default Topbar;
