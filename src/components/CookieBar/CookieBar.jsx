import { useState } from 'react';
import styles from './CookieBar.module.css';

/**
 * CookieBar Component
 * 
 * Renders a global floating GDPR cookie consent banner.
 * Manages visibility locally and handles user acceptance action.
 */
function CookieBar() {
  const [showCookies, setShowCookies] = useState(true);

  // Hide the banner if cookies are accepted
  if (!showCookies) return null;

  return (
    <div className={styles.cookieBar}>
      <p className={styles.cookieText}>
        We use cookies to improve your experience and understand how you use Synkra. We do not sell your data. <a href="#cookie-policy" className={styles.cookieLink}>Cookie policy</a>
      </p>
      
      <div className={styles.actionGroup}>
        <button className={styles.manageButton} type="button">
          Manage preferences
        </button>
        <button 
          className={styles.acceptButton} 
          type="button" 
          onClick={() => setShowCookies(false)}
        >
          Accept All
        </button>
      </div>
    </div>
  );
}

export default CookieBar; 
