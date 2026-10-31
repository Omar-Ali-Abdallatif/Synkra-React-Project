import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../../Context/AuthContext';
import { getApiFieldErrors, validateSignUp } from './validation';
import styles from './AuthForm.module.css';

const initialValues = {
  email: '',
  password: '',
  confirmPassword: '',
  phone: '',
  role: 'landlord',
};

function SignUp() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [requestError, setRequestError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  function updateValue(event) {
    const { name, value } = event.target;
    const nextValues = { ...values, [name]: value };
    setValues(nextValues);
    setRequestError('');
    if (Object.keys(errors).length) setErrors(validateSignUp(nextValues));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const cleanedValues = {
      ...values,
      email: values.email.trim(),
      phone: values.phone.trim(),
    };
    const nextErrors = validateSignUp(cleanedValues);
    setErrors(nextErrors);
    setRequestError('');
    if (Object.keys(nextErrors).length) return;

    setIsSubmitting(true);
    try {
      await register(cleanedValues);
      navigate('/sign-in', {
        replace: true,
        state: {
          successMessage: 'Account created. Sign in with your new credentials.',
        },
      });
    } catch (error) {
      const apiErrors = getApiFieldErrors(error.payload);
      if (Object.keys(apiErrors).length) setErrors(apiErrors);
      setRequestError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  const fields = [
    { name: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      autoComplete: 'new-password',
    },
    {
      name: 'confirmPassword',
      label: 'Confirm password',
      type: 'password',
      autoComplete: 'new-password',
    },
    {
      name: 'phone',
      label: 'Phone number',
      type: 'tel',
      autoComplete: 'tel',
      placeholder: '+20123456789',
    },
  ];

  return (
    <main className={styles.page}>
      <section className={styles.card} aria-labelledby="sign-up-title">
        <span className={styles.eyebrow}>Get started</span>
        <h1 className={styles.title} id="sign-up-title">
          Create your account
        </h1>
        <p className={styles.intro}>
          Set up your Vitae workspace in a few details.
        </p>
        {requestError && (
          <p className={styles.error} role="alert">
            {requestError}
          </p>
        )}
        <form className={styles.form} noValidate onSubmit={handleSubmit}>
          {fields.map((field) => (
            <div className={styles.field} key={field.name}>
              <label className={styles.label} htmlFor={`sign-up-${field.name}`}>
                {field.label}
              </label>
              <input
                className={`${styles.input} ${errors[field.name] ? styles.inputInvalid : ''}`}
                id={`sign-up-${field.name}`}
                name={field.name}
                type={field.type}
                autoComplete={field.autoComplete}
                placeholder={field.placeholder}
                value={values[field.name]}
                onChange={updateValue}
                aria-invalid={Boolean(errors[field.name])}
                aria-describedby={
                  errors[field.name] ? `sign-up-${field.name}-error` : undefined
                }
              />
              {errors[field.name] && (
                <p className={styles.error} id={`sign-up-${field.name}-error`}>
                  {errors[field.name]}
                </p>
              )}
            </div>
          ))}
          <div className={styles.field}>
            <label className={styles.label} htmlFor="sign-up-role">
              Role
            </label>
            <select
              className={`${styles.select} ${errors.role ? styles.inputInvalid : ''}`}
              id="sign-up-role"
              name="role"
              value={values.role}
              onChange={updateValue}
              aria-invalid={Boolean(errors.role)}
              aria-describedby={errors.role ? 'sign-up-role-error' : undefined}
            >
              <option value="landlord">Landlord</option>
            </select>
            {errors.role && (
              <p className={styles.error} id="sign-up-role-error">
                {errors.role}
              </p>
            )}
          </div>
          <button
            className={styles.submit}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating account…' : 'Create account'}
          </button>
        </form>
        <p className={styles.switchText}>
          Already have an account?{' '}
          <Link className={styles.link} to="/sign-in">
            Sign in
          </Link>
        </p>
      </section>
    </main>
  );
}

export default SignUp;
