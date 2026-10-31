import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import lightLogo from '../../assets/synkra-logo/synkra-light-logo.svg';
import darkLogo from '../../assets/synkra-logo/synkra-dark-lodo.svg';
import resourcesArrow from '../../assets/navbar-icons/drop-list-arrow.svg';
import { useTheme } from '../../Context/ThemeContext';
import { useAuth } from '../../Context/AuthContext';
import styles from './Navbar.module.css';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const { pathname } = useLocation();
  const { isDark } = useTheme();
  const { user, profile, isAuthenticated, isLoading, isAdmin } = useAuth();

  const isHome = pathname === '/';
  const isResources = ['/about', '/blog', '/blogdetails'].includes(pathname);

  const closeMenu = () => {
    setMenuOpen(false);
    setResourcesOpen(false);
  };

  const displayName =
    profile?.name ||
    profile?.full_name ||
    user?.name ||
    user?.full_name ||
    user?.email ||
    'Profile';
  const profileImage =
    profile?.image ||
    profile?.avatar ||
    profile?.profile_image ||
    user?.image ||
    user?.avatar;
  const initials = displayName
    .split(/[\s@]/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join('')
    .toUpperCase();

  return (
    <nav className={styles['site-nav']} aria-label="Main navigation">
      <div className={styles['nav-inner']}>
        <Link
          className={styles.brand}
          to="/"
          onClick={closeMenu}
          aria-label="Synkra home"
        >
          <img src={isDark ? darkLogo : lightLogo} alt="Synkra" />
        </Link>

        <button
          className={styles['menu-toggle']}
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
          <span className={styles['sr-only']}>Toggle navigation</span>
        </button>

        {!isLoading &&
          (isAuthenticated ? (
            <Link
              className={styles['mobile-profile']}
              to="/profile"
              onClick={closeMenu}
              aria-label="Open your profile"
            >
              {profileImage ? <img src={profileImage} alt="" /> : initials}
            </Link>
          ) : (
            <Link
              className={styles['mobile-sign-up']}
              to="/sign-up"
              onClick={closeMenu}
            >
              Sign Up
            </Link>
          ))}

        <div
          className={`${styles['nav-content']} ${menuOpen ? styles['is-open'] : ''}`}
          id="primary-navigation"
        >
          <div className={styles['nav-links']}>
            <Link
              className={`${styles['nav-link']} ${isHome ? styles['is-active'] : ''}`}
              to="/"
              onClick={closeMenu}
            >
              Solutions
            </Link>
            <Link
              className={styles['nav-link']}
              to="/features"
              onClick={closeMenu}
            >
              Platform
            </Link>
            <div
              className={`${styles['resources-menu']} ${isResources ? styles['is-active'] : ''}`}
            >
              <button
                className={styles['resources-trigger']}
                type="button"
                aria-expanded={resourcesOpen}
                aria-controls="resources-dropdown"
                onClick={() => setResourcesOpen((open) => !open)}
              >
                Resources
                <img
                  className={styles.chevron}
                  src={resourcesArrow}
                  alt=""
                  aria-hidden="true"
                />
              </button>
              <div
                className={`${styles['resources-dropdown']} ${resourcesOpen ? styles['is-open'] : ''}`}
                id="resources-dropdown"
              >
                <Link
                  className={pathname === '/about' ? styles['is-current'] : ''}
                  to="/about"
                  onClick={closeMenu}
                >
                  About
                </Link>
                <Link
                  className={pathname === '/blog' ? styles['is-current'] : ''}
                  to="/blog"
                  onClick={closeMenu}
                >
                  Blog
                </Link>
                <Link
                  className={
                    pathname === '/blogdetails' ? styles['is-current'] : ''
                  }
                  to="/blogdetails"
                  onClick={closeMenu}
                >
                  Blog Details
                </Link>
              </div>
            </div>
            <Link
              className={styles['nav-link']}
              to="/challenging"
              onClick={closeMenu}
            >
              Changelog
            </Link>
            {!isLoading && !isAdmin && (
              <Link
                className={styles['nav-link']}
                to="/pricing"
                onClick={closeMenu}
              >
                Pricing
              </Link>
            )}
          </div>

          <div className={styles['nav-actions']}>
            <ThemeToggle />
            {!isLoading &&
              (isAuthenticated ? (
                <Link
                  className={styles['profile-control']}
                  to="/profile"
                  onClick={closeMenu}
                >
                  <span className={styles.avatar} aria-hidden="true">
                    {profileImage ? (
                      <img src={profileImage} alt="" />
                    ) : (
                      initials
                    )}
                  </span>
                  <span className={styles['profile-name']}>{displayName}</span>
                </Link>
              ) : (
                <>
                  <Link
                    className={styles['sign-in']}
                    to="/sign-in"
                    onClick={closeMenu}
                  >
                    Sign in
                  </Link>
                  <Link
                    className={styles['sign-up']}
                    to="/sign-up"
                    onClick={closeMenu}
                  >
                    Sign up
                  </Link>
                </>
              ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
