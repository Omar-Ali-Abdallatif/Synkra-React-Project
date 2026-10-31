import React from 'react';
import styles from './PrinciplesSection.module.css';

const PrinciplesSection = () => {
  return (
    <section className={styles.principlesContainer}>
      <div className={styles.principlesHeader}>
        <h2 className={styles.principlesTitle}>What we believe about ops</h2>
        <p className={styles.principlesSubtitle}>Principles that guide every playbook we ship.</p>
      </div>

      <div className={styles.cardsGrid}>
        <div className={styles.card}>
          <div className={`${styles.iconBox} ${styles.iconGray}`}>
            <span>👁️‍🗨️</span>
          </div>
          <h3 className={styles.cardTitle}>Automation should be invisible</h3>
          <p className={styles.cardDescription}>
            The best playbook is the one you forget is running. It handles the complexity so you can focus on creativity.
          </p>
        </div>

        <div className={`${styles.card} ${styles.cardBlue}`}>
          <div className={`${styles.iconBox} ${styles.iconWhite}`}>
            <span>🛡️</span>
          </div>
          <h3 className={`${styles.cardTitle} ${styles.textWhite}`}>Reliability is a feature</h3>
          <p className={`${styles.cardDescription} ${styles.textWhite}`}>
            A workflow that fails silently is worse than no workflow at all. We build for 99.97% execution uptime.
          </p>
        </div>

        <div className={styles.card}>
          <div className={`${styles.iconBox} ${styles.iconGreen}`}>
            <span>🔀</span>
          </div>
          <h3 className={styles.cardTitle}>PMs should own the Ops</h3>
          <p className={styles.cardDescription}>
            If your product manager can't maintain it, we haven't done our job. Ops belongs to the product, not just infra.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PrinciplesSection;