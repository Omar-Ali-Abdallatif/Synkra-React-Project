
import { Link } from 'react-router';
import lightLogo from '../../assets/synkra-logo/synkra-light-logo.svg';
import darkLogo from '../../assets/synkra-logo/synkra-dark-lodo.svg';
import rssIcon from '../../assets/footer-icons/RSS Icon.svg';
import twitterIcon from '../../assets/footer-icons/Twitter Icon.svg';
import facebookIcon from '../../assets/footer-icons/facebook-icon.svg';
import linkedinIcon from '../../assets/footer-icons/linkedin-icon.svg';
import { useTheme } from '../../Context/ThemeContext';
import styles from './Footer.module.css';

function Footer() {
  const { isDark } = useTheme();

  return (
    <footer className={styles['site-footer']}>
      <div className={styles['footer-links']}>
        {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Help', 'App Integrations', 'Jobs', 'Partner Program'].map((item) => (
          <a href={`#${item.toLowerCase().replaceAll(' ', '-')}`} key={item}>{item}</a>
        ))}
      </div>
      <div className={styles['footer-bottom']}>
        <Link to="/" aria-label="Synkra home"><img src={isDark ? darkLogo : lightLogo} alt="Synkra" /></Link>
        <div className={styles['social-links']} aria-label="Social links">
          <a href="#x" aria-label="X"><img src={twitterIcon} alt="" aria-hidden="true" /></a>
          <a href="#linkedin" aria-label="LinkedIn"><img src={linkedinIcon} alt="" aria-hidden="true" /></a>
          <a href="#facebook" aria-label="Facebook"><img src={facebookIcon} alt="" aria-hidden="true" /></a>
          <a href="#rss" aria-label="RSS"><img src={rssIcon} alt="" aria-hidden="true" /></a>
        </div>
        <small>© 2026 Synkra Inc.</small>
      </div>
    </footer>
  );
}

export default Footer;
