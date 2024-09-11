import React from 'react';
import styles from './index.module.css';

const FeatureCard = ({ icon, title, description }) => (
  <div className={styles.featureCard}>
    <div className={styles.featureIcon}>{icon}</div>
    <h2>{title}</h2>
    <p>{description}</p>
  </div>
);

const FeatureSection = () => {
  const features = [
    { icon: '🛍️', title: '便捷二手交易', description: '轻松发布、浏览和购买校园内的二手物品。从教材到家具，应有尽有，让闲置物品焕发新生。' },
    { icon: '👥', title: '互助交友平台', description: '结识志同道合的朋友，组建学习小组，或寻找校园活动的伙伴。让大学生活更加丰富多彩。' },
    { icon: '🔒', title: '隐私保护', description: '采用先进的加密技术和严格的隐私政策，确保您的个人信息和交易数据安全无虞。' },
    { icon: '💡', title: '智能匹配', description: '基于兴趣爱好和学习需求，为您推荐最适合的商品和潜在好友，提高交易和社交效率。' },
    { icon: '📊', title: '信用评分系统', description: '建立透明的用户信用体系，鼓励诚信交易，营造良好的校园二手交易氛围。' },
    { icon: '🌟', title: '专属校园活动', description: '定期举办线上线下活动，如二手市集、才艺展示等，增进同学间的交流与互动。' },
  ];

  return (
    <section className={styles.featureSection}>
      {features.map((feature, index) => (
        <FeatureCard key={index} {...feature} />
      ))}
    </section>
  );
};

export default FeatureSection;