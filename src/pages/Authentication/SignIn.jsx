import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { useAuth } from '../../Context/AuthContext';
import { getApiFieldErrors, validateSignIn } from './validation';
import styles from './AuthForm.module.css';

const initialValues = { email: '', password: '' };

function SignIn() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [requestError, setRequestError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const successMessage = location.state?.successMessage;

  function updateValue(event) {
    const { name, value } = event.target;
    const nextValues = { ...values, [name]: value };
    setValues(nextValues);
    setRequestError('');
    if (Object.keys(errors).length) setErrors(validateSignIn(nextValues));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const cleanedValues = { ...values, email: values.email.trim() };
    const nextErrors = validateSignIn(cleanedValues);
    setErrors(nextErrors);
    setRequestError('');
    if (Object.keys(nextErrors).length) return;

    setIsSubmitting(true);
    try {
      await login(cleanedValues);
      navigate(location.state?.from || '/', { replace: true });
    } catch (error) {
      const apiErrors = getApiFieldErrors(error.payload);
      if (Object.keys(apiErrors).length) setErrors(apiErrors);
      setRequestError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className={styles.page}>
      <section className={styles.card} aria-labelledby="sign-in-title">
        <span className={styles.eyebrow}>Welcome back</span>
        <h1 className={styles.title} id="sign-in-title">
          Sign in to Synkra
        </h1>
        <p className={styles.intro}>
          Continue managing the work that keeps your team moving.
        </p>
        {successMessage && (
          <p className={styles.notice} role="status">
            {successMessage}
          </p>
        )}
        {requestError && (
          <p className={styles.error} role="alert">
            {requestError}
          </p>
        )}
        <form className={styles.form} noValidate onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="sign-in-email">
              Email
            </label>
            <input
              className={`${styles.input} ${errors.email ? styles.inputInvalid : ''}`}
              id="sign-in-email"
              name="email"
              type="email"
              autoComplete="email"
              value={values.email}
              onChange={updateValue}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={
                errors.email ? 'sign-in-email-error' : undefined
              }
            />
            {errors.email && (
              <p className={styles.error} id="sign-in-email-error">
                {errors.email}
              </p>
            )}
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="sign-in-password">
              Password
            </label>
            <input
              className={`${styles.input} ${errors.password ? styles.inputInvalid : ''}`}
              id="sign-in-password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={values.password}
              onChange={updateValue}
              aria-invalid={Boolean(errors.password)}
              aria-describedby={
                errors.password ? 'sign-in-password-error' : undefined
              }
            />
            {errors.password && (
              <p className={styles.error} id="sign-in-password-error">
                {errors.password}
              </p>
            )}
          </div>
          <button
            className={styles.submit}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
        <p className={styles.switchText}>
          New to Synkra?{' '}
          <Link className={styles.link} to="/sign-up">
            Create an account
          </Link>
        </p>
      </section>
    </main>
  );
}

export default SignIn;
