import styles from './NewsletterCard.module.css'; 

function NewsletterCard({ variant = 'light' }) {
  return (
    <div className={`${styles.asideCard} ${variant === 'dark' ? styles.asideCardDark : ''}`}>
      <p className={styles.asideTitle}>NEWSLETTER</p>
      <h3 className={styles.newsletterHeading}>Ops thinking, once a week. No noise.</h3>
      <p className={styles.newsletterText}>
        Join 4,000+ engineers and product leaders receiving our weekly teardown of the best SaaS ops practices.
      </p>
      <label htmlFor="newsletter-email" className={styles.visuallyHidden}></label>
      <input className={styles.newsletterInput} id="newsletter-email" type="email" placeholder="work@email.com" required />
      <button className={styles.newsletterBtn}>Subsribe</button>
    </div>
  );
}

export default NewsletterCard;