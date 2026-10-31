import { API_BASE_URL } from '../config/api';

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';
let refreshPromise = null;

const MOCK_CREDENTIALS = {
  email: 'omar@dev.eg',
  password: 'omar@dev7577',
};

const MOCK_SESSION_TOKEN = 'mock-omar-dev-access-token';
const MOCK_SESSION_REFRESH = 'mock-omar-dev-refresh-token';

function getMockUser() {
  return {
    id: 1,
    email: MOCK_CREDENTIALS.email,
    name: 'Omar Ali',
    full_name: 'Omar Ali Abdallatif',
    role: 'landlord',
    profile_id: 1,
    profile_data: {
      role: 'landlord',
      phone: '+20123456789',
      project_name: 'Vitae',
    },
  };
}

function getMockProfile(profileId = 1) {
  return {
    id: profileId,
    name: 'Omar Ali',
    full_name: 'Omar Ali Abdallatif',
    email: MOCK_CREDENTIALS.email,
    role: 'landlord',
    phone: '+20123456789',
  };
}

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
  sessionStorage.removeItem('mockSubscription');
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
  const normalizedEmail = email ? email.trim().toLowerCase() : '';
  if (
    normalizedEmail === MOCK_CREDENTIALS.email &&
    password === MOCK_CREDENTIALS.password
  ) {
    const user = getMockUser();
    const payload = {
      access: MOCK_SESSION_TOKEN,
      refresh: MOCK_SESSION_REFRESH,
      user,
    };
    sessionStorage.setItem(ACCESS_TOKEN_KEY, MOCK_SESSION_TOKEN);
    sessionStorage.setItem(REFRESH_TOKEN_KEY, MOCK_SESSION_REFRESH);
    return { token: MOCK_SESSION_TOKEN, payload };
  }

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
  if (refreshToken === MOCK_SESSION_REFRESH) {
    return MOCK_SESSION_TOKEN;
  }

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
  if (getStoredToken() === MOCK_SESSION_TOKEN) {
    return Promise.resolve(getMockUser());
  }
  return authenticatedRequest('/api/me/');
}

export function getProfile(profileId) {
  if (getStoredToken() === MOCK_SESSION_TOKEN) {
    return Promise.resolve(getMockProfile(profileId));
  }
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
  if (getStoredToken() === MOCK_SESSION_TOKEN) {
    const stored = sessionStorage.getItem('mockSubscription');
    return Promise.resolve(
      stored
        ? JSON.parse(stored)
        : [
            {
              id: 1,
              user: MOCK_CREDENTIALS.email,
              plan_name: 'pro',
              status: 'active',
            },
          ],
    );
  }
  return authenticatedRequest('/subscriptions/');
}

export function getSubscriptionById(subscriptionId) {
  if (getStoredToken() === MOCK_SESSION_TOKEN) {
    return Promise.resolve({
      id: subscriptionId,
      user: MOCK_CREDENTIALS.email,
      plan_name: 'pro',
      status: 'active',
    });
  }
  return authenticatedRequest(`/subscriptions/${subscriptionId}/`);
}

export function createSubscription(planName) {
  if (getStoredToken() === MOCK_SESSION_TOKEN) {
    const newSubscription = [
      {
        id: Date.now(),
        user: MOCK_CREDENTIALS.email,
        plan_name: planName,
        status: 'active',
      },
    ];
    sessionStorage.setItem('mockSubscription', JSON.stringify(newSubscription));
    return Promise.resolve(newSubscription[0]);
  }
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
