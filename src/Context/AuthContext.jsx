/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import * as authService from '../services/authService';
import { getVerifiedRole, isVerifiedAdmin } from '../utils/role';

const AuthContext = createContext(null);

function getProfileId(user) {
  return (
    user?.profile_id ||
    user?.profile?.id ||
    user?.profileId ||
    user?.profile?.profile_id ||
    user?.profile_data?.profile_id ||
    user?.profile_data?.id ||
    null
  );
}

function getUserFromResponse(response) {
  return response?.user || response?.data?.user || response?.data || response;
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(authService.getStoredToken);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [subscriptionError, setSubscriptionError] = useState('');
  const [isSubscriptionLoading, setIsSubscriptionLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const logout = useCallback(() => {
    authService.logout();
    setToken(null);
    setUser(null);
    setProfile(null);
    setSubscription(null);
    setSubscriptionError('');
  }, []);

  const refreshSubscription = useCallback(async (currentUser) => {
    if (!currentUser?.email) {
      setSubscription(null);
      return null;
    }

    setIsSubscriptionLoading(true);
    setSubscriptionError('');
    try {
      const subscriptions = await authService.getSubscriptions();
      const ownSubscription = Array.isArray(subscriptions)
        ? subscriptions.find((item) => item?.user === currentUser.email) || null
        : null;
      setSubscription(ownSubscription);
      return ownSubscription;
    } catch (error) {
      setSubscription(null);
      setSubscriptionError(error.message);
      return null;
    } finally {
      setIsSubscriptionLoading(false);
    }
  }, []);

  const refreshCurrentUser = useCallback(async () => {
    const currentToken = authService.getStoredToken();
    if (!currentToken) {
      setToken(null);
      setUser(null);
      setProfile(null);
      return null;
    }

    try {
      const response = await authService.getCurrentUser();
      const currentUser = getUserFromResponse(response);
      const profileId = getProfileId(currentUser);

      setToken(authService.getStoredToken());
      setUser(currentUser);

      if (profileId) {
        const currentProfile = await authService.getProfile(profileId);
        setProfile(
          currentProfile?.profile || currentProfile?.data || currentProfile,
        );
      } else {
        setProfile(null);
      }

      await refreshSubscription(currentUser);
      return currentUser;
    } catch (error) {
      logout();
      throw error;
    }
  }, [logout, refreshSubscription]);

  useEffect(() => {
    function handleExpiredSession() {
      setToken(null);
      setUser(null);
      setProfile(null);
      setSubscription(null);
      setSubscriptionError('');
      setIsLoading(false);
    }

    window.addEventListener('auth-session-expired', handleExpiredSession);
    return () =>
      window.removeEventListener('auth-session-expired', handleExpiredSession);
  }, []);

  useEffect(() => {
    let active = true;

    async function restoreSession() {
      try {
        if (authService.getStoredToken()) await refreshCurrentUser();
      } catch {
        // The service clears invalid credentials; the UI can now safely show signed-out controls.
      } finally {
        if (active) setIsLoading(false);
      }
    }

    restoreSession();
    return () => {
      active = false;
    };
  }, [refreshCurrentUser]);

  const signIn = useCallback(
    async (credentials) => {
      const result = await authService.login(credentials);
      setToken(result.token);
      const currentUser = await refreshCurrentUser();
      return currentUser;
    },
    [refreshCurrentUser],
  );

  const createSubscription = useCallback(
    async (planName) => {
      const createdSubscription =
        await authService.createSubscription(planName);
      await refreshSubscription(user);
      return createdSubscription;
    },
    [refreshSubscription, user],
  );

  const value = {
    user,
    profile,
    token,
    isAuthenticated: Boolean(token && user),
    isLoading,
    role: getVerifiedRole(user, profile),
    // Derived only from the email returned by the authenticated-user API.
    // It is deliberately not persisted in sessionStorage.
    isAdmin: isVerifiedAdmin(user),
    subscription,
    subscriptionError,
    isSubscriptionLoading,
    login: signIn,
    register: authService.register,
    logout,
    refreshCurrentUser,
    refreshSubscription: () => refreshSubscription(user),
    createSubscription,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
