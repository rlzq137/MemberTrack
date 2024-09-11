import React from 'react';
import styles from './index.module.css';

const BackgroundDecoration = () => {
  return (
    <div className={styles.backgroundDecoration}>
      <svg className={`${styles.floatingShape} ${styles.shape1}`} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="50" fill="#3498db"/>
      </svg>
      <svg className={`${styles.floatingShape} ${styles.shape2}`} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" fill="#e74c3c"/>
      </svg>
      <svg className={`${styles.floatingShape} ${styles.shape3}`} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <polygon points="50,0 100,100 0,100" fill="#2ecc71"/>
      </svg>
      <svg className={`${styles.floatingShape} ${styles.shape4}`} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M50,0 L100,50 L50,100 L0,50 Z" fill="#f39c12"/>
      </svg>
    </div>
  );
};

export default BackgroundDecoration;