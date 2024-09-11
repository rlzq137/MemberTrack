import React from 'react';
import styles from './index.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <svg className={styles.logo} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="45" fill="#3498db"/>
          <path d="M30 70 L50 30 L70 70 Z" fill="#ffffff"/>
          <circle cx="50" cy="50" r="10" fill="#e74c3c"/>
        </svg>
        <span className={styles.logoText}>天大集市</span>
      </div>
      <div className={styles.headerButtons}>
        <button className={`${styles.headerButton} ${styles.adminLogin}`}>管理员登录</button>
        <button className={`${styles.headerButton} ${styles.userRegister}`}>用户注册</button>
        <button className={`${styles.headerButton} ${styles.userLogin}`}>用户登录</button>
      </div>
    </header>
  );
};

export default Header;