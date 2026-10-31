import { API_BASE_URL } from '../config/api';

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';
let refreshPromise = null;

function getMessage(payload, fallback) {
  if (typeof payload === 'string') return payload;
  if (payload?.detail) return payload.detail;
  if (payload?.message) return payload.message;

  const firstError = payload && Object.values(payload).flat().find(Boolean);
  return typeof firstError === 'string' ? firstError : fallback;
}

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      Accept: 'application/json',
      ...options.headers,
    },
  });

  const contentType = response.headers.get('content-type') || '';
  const payload = contentType.includes('application/json')
    ? await response.json()
    : null;

  if (!response.ok) {
    const error = new Error(getMessage(payload, 'Something went wrong.'));
    error.status = response.status;
    error.payload = payload;
    throw error;
  }

  return payload;
}

function extractToken(payload) {
  const token =
    payload?.access ||
    payload?.access_token ||
    payload?.token ||
    payload?.key ||
    payload?.data?.access ||
    payload?.data?.access_token ||
    payload?.data?.token;

  if (!token || typeof token !== 'string') {
    throw new Error(
      'The login response did not include an authentication token.',
    );
  }

  return token;
}

export function getStoredToken() {
  return sessionStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getStoredRefreshToken() {
  return sessionStorage.getItem(REFRESH_TOKEN_KEY);
}

export function isAuthenticated() {
  return Boolean(getStoredToken());
}

export function clearSession() {
  sessionStorage.removeItem(ACCESS_TOKEN_KEY);
  sessionStorage.removeItem(REFRESH_TOKEN_KEY);
}

export function logout() {
  clearSession();
}

export async function register({ email, password, phone, role }) {
  const normalizedEmail = email.trim().toLowerCase();

  return request('/register/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: normalizedEmail,
      password,
      profile_data: {
        project_name: 'Vitae',
        role,
        phone,
      },
    }),
  });
}

export async function login({ email, password }) {
  const payload = await request('/login/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const token = extractToken(payload);
  sessionStorage.setItem(ACCESS_TOKEN_KEY, token);
  if (typeof payload?.refresh === 'string') {
    sessionStorage.setItem(REFRESH_TOKEN_KEY, payload.refresh);
  }
  return { token, payload };
}

function notifyExpiredSession() {
  clearSession();
  window.dispatchEvent(new Event('auth-session-expired'));
}

export async function refreshAccessToken(
  refreshToken = getStoredRefreshToken(),
) {
  if (!refreshToken) {
    throw new Error('Your session has ended. Please sign in again.');
  }

  const payload = await request('/token/refresh/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh: refreshToken }),
  });

  if (!payload?.access || typeof payload.access !== 'string') {
    throw new Error('The refresh response did not include an access token.');
  }

  sessionStorage.setItem(ACCESS_TOKEN_KEY, payload.access);
  if (typeof payload.refresh === 'string') {
    sessionStorage.setItem(REFRESH_TOKEN_KEY, payload.refresh);
  }
  return payload.access;
}

async function refreshOnce() {
  if (!refreshPromise) {
    refreshPromise = refreshAccessToken().finally(() => {
      refreshPromise = null;
    });
  }
  return refreshPromise;
}

export async function authenticatedRequest(
  path,
  options = {},
  retried = false,
) {
  const token = getStoredToken();

  if (!token) {
    throw new Error('Your session has ended. Please sign in again.');
  }

  try {
    return await request(path, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    if (error.status === 401 && !retried) {
      try {
        await refreshOnce();
        return authenticatedRequest(path, options, true);
      } catch {
        notifyExpiredSession();
        throw new Error('Your session has ended. Please sign in again.');
      }
    }
    if (error.status === 401) notifyExpiredSession();
    throw error;
  }
}

export function getCurrentUser() {
  return authenticatedRequest('/api/me/');
}

export function getProfile(profileId) {
  return authenticatedRequest(`/profiles/${profileId}/`);
}

export function getAdminPlans() {
  return authenticatedRequest('/api/admin/plans/');
}

export function getAdminUsers() {
  throw new Error(
    'Admin user management is unavailable because the backend does not provide a users-list endpoint.',
  );
}

export function approveStaff(userId) {
  return authenticatedRequest(`/staff/approve/${userId}/`, { method: 'POST' });
}

export function getSubscriptions() {
  return authenticatedRequest('/subscriptions/');
}

export function getSubscriptionById(subscriptionId) {
  return authenticatedRequest(`/subscriptions/${subscriptionId}/`);
}

export function createSubscription(planName) {
  return authenticatedRequest('/subscriptions/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ plan_name: planName }),
  });
}

export function updateSubscription() {
  throw new Error(
    'Subscription updates are unavailable because the backend does not support PATCH or PUT for subscriptions.',
  );
}
