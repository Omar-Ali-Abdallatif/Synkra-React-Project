const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^\+[1-9]\d{7,14}$/;
const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

export function validateSignIn(values) {
  const errors = {};
  const email = values.email.trim();

  if (!email) errors.email = 'Email is required.';
  else if (!emailPattern.test(email))
    errors.email = 'Enter a valid email address.';
  if (!values.password) errors.password = 'Password is required.';
  else if (!passwordPattern.test(values.password)) {
    errors.password =
      'Use 8+ characters with uppercase, lowercase, a number, and a special character.';
  }

  return errors;
}

export function getApiFieldErrors(payload) {
  if (!payload || typeof payload !== 'object') return {};

  const errors = {};
  const supportedFields = ['email', 'password', 'phone', 'role'];

  supportedFields.forEach((field) => {
    const value = payload[field];
    if (value)
      errors[field] = Array.isArray(value) ? value.join(' ') : String(value);
  });

  if (payload.profile_data && typeof payload.profile_data === 'object') {
    ['phone', 'role'].forEach((field) => {
      const value = payload.profile_data[field];
      if (value) {
        errors[field] = Array.isArray(value) ? value.join(' ') : String(value);
      }
    });
  }

  return errors;
}

export function validateSignUp(values) {
  const errors = validateSignIn(values);

  if (values.password && !passwordPattern.test(values.password)) {
    errors.password =
      'Use 8+ characters with uppercase, lowercase, a number, and a special character.';
  }
  if (!values.confirmPassword)
    errors.confirmPassword = 'Please confirm your password.';
  else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Passwords do not match.';
  }
  if (!values.phone.trim()) errors.phone = 'Phone number is required.';
  else if (!phonePattern.test(values.phone.trim())) {
    errors.phone = 'Enter an international number, for example +20123456789.';
  }
  if (!values.role) errors.role = 'Please select a role.';

  return errors;
}
