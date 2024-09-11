import React, { useEffect } from 'react';  // 去掉重复导入
import styles from './index.module.css';
import BackgroundDecoration from '../BackgroundDecoration'; // 新增导入
import FeatureSection from '../FeatureSection';             // 新增导入
import Footer from '../Footer';                             // 新增导入
import Header from '../Header';                             // 新增导入
import { gsap } from 'gsap';

const Welcome = () => {
    // 使用 useEffect 来处理 GSAP 动画
    useEffect(() => {
        gsap.from('.logo-container', {
            duration: 1,
            opacity: 0,
            x: -50,
            ease: 'power3.out'
        });

        gsap.from('.welcome-section', {
            duration: 1,
            opacity: 0,
            y: 30,
            ease: 'power3.out',
            delay: 0.5
        });

        gsap.from('.feature-card', {
            duration: 0.8,
            opacity: 0,
            y: 50,
            stagger: 0.2,
            ease: 'power3.out',
            delay: 1
        });

        const wave = document.querySelector(`.${styles.wave}`);
        gsap.to(wave, {
            y: -20,
            duration: 2,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true
        });

        const floatingShapes = document.querySelectorAll('.floating-shape');
        floatingShapes.forEach(shape => {
            gsap.to(shape, {
                y: 'random(-30, 30)',
                x: 'random(-30, 30)',
                rotation: 'random(-15, 15)',
                duration: 'random(10, 20)',
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            });
        });
    }, []);  // 确保 useEffect 的依赖数组为空，以便只在组件挂载时运行

    return (
        <div className={styles.app}>
            <BackgroundDecoration />
            <Header />
            <main className={styles.mainContent}>
                <h1>欢迎来到天大集市</h1>
                <section className={styles.welcomeSection}>
                    <h2>加入天大集市，开启精彩校园生活！</h2>
                    <p>无论您是想淘到心仪的二手宝贝，还是希望结识新朋友，天大集市都能满足您的需求。</p>
                    <a href="/register" className={styles.ctaButton}>立即注册</a>
                </section>
                <FeatureSection />
            </main>
            <div className={styles.wave}></div>
            <Footer />
        </div>
    );
};

export default Welcome;
