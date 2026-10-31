export function getVerifiedRole(user, profile) {
  return (
    profile?.role ||
    user?.role ||
    user?.profile?.role ||
    user?.profile_data?.role ||
    null
  );
}

export function isAdminEmail(email) {
  return (
    typeof email === 'string' &&
    email.trim().toLowerCase().endsWith('@admin.sy')
  );
}

export function isVerifiedAdmin(user) {
  return isAdminEmail(user?.email);
}
