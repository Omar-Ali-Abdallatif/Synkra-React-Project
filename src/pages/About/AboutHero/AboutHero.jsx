import React from 'react';
import styles from './AboutHero.module.css';

export default function AboutHero() {
  return (
    <section className={styles.aboutSection}>
      <div className={styles.container}>
        <div className={styles.headerRow}>
          <div className={styles.tag}>
            <span className={styles.tagIcon}>📄</span>
            <span>ABOUT SYNKRA</span>
          </div>
        </div>

        <div className={styles.contentGrid}>
          <div className={styles.titleWrapper}>
            <h2 className={styles.mainTitle}>
              Crafting Structural <br />
              <span className={styles.italicTitle}>Elegance</span>.
            </h2>
            <div className={styles.titleUnderline} />
          </div>

          <div className={styles.descriptionBox}>
            <p className={styles.bodyText}>
              We built Synkra because we couldn't find the tool we actually needed. We believe ops shouldn't be a bottleneck—it should be a brain.
            </p>
          </div>
        </div>

        <div className={styles.heroImageWrapper}>
          <div className={styles.headquartersBadge}>
            <span className={styles.hqLabel}>Headquarters</span>
            <span className={styles.hqCity}>San Francisco, CA</span>
          </div>
        </div>
      </div>
    </section>
  );
}