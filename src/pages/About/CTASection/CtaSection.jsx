// CtaSection.jsx
import React from 'react';
import styles from './CtaSection.module.css';

export default function CtaSection() {
  return (
    <section className={styles.ctaSection}>
      <div className={styles.ctaCard}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>
            Your team is spending hours on work that <span className={styles.brandName}>Synkra</span> can run in seconds
          </h2>

          <div className={styles.ctaButtons}>
            <button className={styles.primaryButton}>Create an Account</button>
            <button className={styles.secondaryButton}>
              <span>Talk to our team instead</span>
              <svg className={styles.headsetIcon} viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none">
                <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
                <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
              </svg>
            </button>
          </div>

          <p className={styles.ctaSubtext}>
            *Ship your first live playbook in 10 minutes. No credit card, no setup call required.
          </p>

          <div className={styles.ctaFooter}>
            <blockquote className={styles.quote}>
              "We don't just build software, we cultivate an ecosystem where every operational detail is treated with the reverence of fine art. Reliability is our ultimate aesthetic."
            </blockquote>
            <div className={styles.authorBox}>
              <span className={styles.authorName}>PABLO THOMPSON</span>
              <span className={styles.authorTitle}>– CO-FOUNDER &amp; CHIEF VISIONARY –</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}