// StatsSection.jsx
import React from 'react';
import styles from './StatsSection.module.css';

export default function StatsSection() {
  const stats = [
    { value: '2,40+', label: 'Active Teams Member' },
    { value: '1M+', label: 'Workflows executed' },
    { value: '8.4 hrs', label: 'Saved per team / week' },
    { value: '12ms', label: 'Global Latency' },
  ];

  return (
    <section className={styles.statsSection}>
      <div className={styles.statsContainer}>
        <div className={styles.headerGrid}>
          <div className={styles.titleWrapper}>
            <h2 className={styles.title}>
              Synkra teams move reliably, and <span className={styles.underlineWrapper}>faster</span>.
            </h2>
            <div className={styles.blueBar}></div>
          </div>
          
          <div className={styles.metaWrapper}>
            <div className={styles.tagBadge}>
              <span className={styles.warningIcon}>⚠️</span> Your Text %
            </div>
            <p className={styles.description}>
              Measured across live teams using <span className={styles.brandItalic}>Synkra</span>'s built-in run tracking and time saved reports, not estimated.
            </p>
          </div>
        </div>

        <div className={styles.metricsGrid}>
          {stats.map((stat, index) => (
            <div key={index} className={styles.metricCard}>
              <span className={styles.metricValue}>{stat.value}</span>
              <span className={styles.metricLabel}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}