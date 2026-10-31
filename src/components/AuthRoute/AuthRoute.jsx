import { Navigate, useLocation } from 'react-router';
import { useAuth } from '../../Context/AuthContext';
import styles from './AuthRoute.module.css';

function AuthLoading() {
  return (
    <main className={styles.loading} aria-live="polite" aria-busy="true">
      Checking your session…
    </main>
  );
}

export function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return <AuthLoading />;
  if (!isAuthenticated) {
    return (
      <Navigate
        to="/sign-in"
        replace
        state={{
          from: `${location.pathname}${location.search}${location.hash}`,
        }}
      />
    );
  }

  return children;
}

export function GuestRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <AuthLoading />;
  if (isAuthenticated) return <Navigate to="/" replace />;

  return children;
}

export function AdminRoute({ children }) {
  const { isAdmin, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return <AuthLoading />;
  if (!isAuthenticated) {
    return (
      <Navigate
        to="/sign-in"
        replace
        state={{
          from: `${location.pathname}${location.search}${location.hash}`,
        }}
      />
    );
  }
  if (!isAdmin) return <Navigate to="/" replace />;

  return children;
}

export function NonAdminRoute({ children }) {
  const { isAdmin, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return <AuthLoading />;
  if (!isAuthenticated) {
    return (
      <Navigate
        to="/sign-in"
        replace
        state={{
          from: `${location.pathname}${location.search}${location.hash}`,
        }}
      />
    );
  }
  if (isAdmin) return <Navigate to="/profile" replace />;

  return children;
}
