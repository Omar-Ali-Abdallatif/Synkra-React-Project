import { useNavigate } from 'react-router';
import { useAuth } from '../../Context/AuthContext';
import styles from './Profile.module.css';

function getName(user, profile) {
  return (
    profile?.name ||
    profile?.full_name ||
    user?.name ||
    user?.full_name ||
    user?.email ||
    'Your profile'
  );
}

function Profile() {
  const {
    user,
    profile,
    logout,
    subscription,
    subscriptionError,
    isSubscriptionLoading,
    isAdmin,
  } = useAuth();
  const navigate = useNavigate();
  const name = getName(user, profile);
  const profileData = user?.profile_data || {};
  const image =
    profile?.image ||
    profile?.avatar ||
    profile?.profile_image ||
    user?.image ||
    user?.avatar;
  function handleLogout() {
    logout();
    navigate('/sign-in', { replace: true });
  }

  return (
    <main className={styles.page}>
      <section className={styles.card} aria-labelledby="profile-title">
        <div className={styles.avatar} aria-hidden="true">
          {image ? <img src={image} alt="" /> : name.charAt(0).toUpperCase()}
        </div>
        <div>
          <span className={styles.eyebrow}>Account</span>
          <h1 id="profile-title">{name}</h1>
          {user?.email && <p>{user.email}</p>}
          {(profile?.phone || profileData.phone) && (
            <p>{profile?.phone || profileData.phone}</p>
          )}
          {(profile?.role || profileData.role) && (
            <p>{profile?.role || profileData.role}</p>
          )}
        </div>
        <button className={styles.logout} type="button" onClick={handleLogout}>
          Log out
        </button>
      </section>
      {isAdmin ? (
        <section className={styles.adminSection} aria-labelledby="admin-title">
          <span className={styles.eyebrow}>Administration</span>
          <h2 id="admin-title">User management</h2>
          <p>
            User management needs backend-admin endpoints before it can safely
            load, change, or delete account data. No user or subscription data
            is shown until the backend provides an authenticated users-list,
            user-delete, and subscription-update endpoint.
          </p>
        </section>
      ) : (
        <section
          className={styles.subscriptionSection}
          aria-labelledby="subscription-title"
        >
          <span className={styles.eyebrow}>Subscription</span>
          <h2 id="subscription-title">Your current plan</h2>
          {isSubscriptionLoading ? (
            <p>Loading your subscription…</p>
          ) : subscriptionError ? (
            <p className={styles.statusError}>{subscriptionError}</p>
          ) : subscription ? (
            <div className={styles.subscriptionDetails}>
              <strong>{subscription.plan_name}</strong>
              {subscription.status && <span>{subscription.status}</span>}
            </div>
          ) : (
            <p>You do not have an active subscription yet.</p>
          )}
        </section>
      )}
    </main>
  );
}

export default Profile;
