import { useState } from 'react';
import { useAuth } from '../../Context/AuthContext';
import styles from './PaymentForm.module.css';

const emptyValues = {
  cardholderName: '',
  cardNumber: '',
  expiryDate: '',
  cvv: '',
};

function isValidCardNumber(number) {
  let total = 0;
  let shouldDouble = false;

  for (let index = number.length - 1; index >= 0; index -= 1) {
    let digit = Number(number[index]);
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    total += digit;
    shouldDouble = !shouldDouble;
  }

  return total % 10 === 0;
}

function validate(values) {
  const errors = {};
  const cardholderName = values.cardholderName.trim();
  const cardNumber = values.cardNumber.replaceAll(' ', '');
  const expiryMatch = /^(0[1-9]|1[0-2])\/(\d{2})$/.exec(values.expiryDate);

  if (!cardholderName) errors.cardholderName = 'Cardholder name is required.';
  else if (
    cardholderName.length < 2 ||
    !/^[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ .'-]*$/.test(cardholderName)
  ) {
    errors.cardholderName = 'Enter a valid cardholder name.';
  }

  if (!values.cardNumber) errors.cardNumber = 'Card number is required.';
  else if (!/^[\d ]+$/.test(values.cardNumber)) {
    errors.cardNumber = 'Use numbers and spaces only.';
  } else if (cardNumber.length < 12 || cardNumber.length > 19) {
    errors.cardNumber = 'Enter a valid card number length.';
  } else if (!isValidCardNumber(cardNumber)) {
    errors.cardNumber = 'Enter a valid card number.';
  }

  if (!values.expiryDate) errors.expiryDate = 'Expiry date is required.';
  else if (!expiryMatch) errors.expiryDate = 'Use the MM/YY format.';
  else {
    const month = Number(expiryMatch[1]);
    const year = 2000 + Number(expiryMatch[2]);
    const now = new Date();
    if (
      year < now.getFullYear() ||
      (year === now.getFullYear() && month < now.getMonth() + 1)
    ) {
      errors.expiryDate = 'Enter a date that has not expired.';
    }
  }

  if (!values.cvv) errors.cvv = 'CVV is required.';
  else if (!/^\d{3,4}$/.test(values.cvv)) {
    errors.cvv = 'Use a 3 or 4 digit CVV.';
  }

  return errors;
}

function PaymentForm({ planName, onCancel, onSuccess }) {
  const [values, setValues] = useState(emptyValues);
  const [errors, setErrors] = useState({});
  const [requestError, setRequestError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { createSubscription } = useAuth();

  function clearPaymentFields() {
    setValues(emptyValues);
    setErrors({});
    setRequestError('');
  }

  function handleCancel() {
    clearPaymentFields();
    onCancel();
  }

  function updateValue(event) {
    const { name, value } = event.target;
    const nextValues = { ...values, [name]: value };
    setValues(nextValues);
    setRequestError('');
    if (Object.keys(errors).length) setErrors(validate(nextValues));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    setRequestError('');
    if (Object.keys(nextErrors).length) return;

    setIsSubmitting(true);
    try {
      await createSubscription(planName);
      clearPaymentFields();
      onSuccess();
    } catch (error) {
      setRequestError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className={styles.backdrop} role="presentation">
      <section
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="payment-title"
      >
        <button
          className={styles.close}
          type="button"
          onClick={handleCancel}
          aria-label="Close payment form"
        >
          ×
        </button>
        <span className={styles.eyebrow}>Selected plan</span>
        <h2 id="payment-title">{planName}</h2>
        <p className={styles.note}>
          Payment details are validated locally and are never stored or sent to
          the subscription service.
        </p>
        {requestError && (
          <p className={styles.error} role="alert">
            {requestError}
          </p>
        )}
        <form className={styles.form} noValidate onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor="cardholder-name">Cardholder Name</label>
            <input
              className={errors.cardholderName ? styles.invalid : ''}
              id="cardholder-name"
              name="cardholderName"
              type="text"
              autoComplete="off"
              value={values.cardholderName}
              onChange={updateValue}
              aria-invalid={Boolean(errors.cardholderName)}
              aria-describedby={
                errors.cardholderName ? 'cardholder-name-error' : undefined
              }
            />
            {errors.cardholderName && (
              <p className={styles.error} id="cardholder-name-error">
                {errors.cardholderName}
              </p>
            )}
          </div>
          <div className={styles.field}>
            <label htmlFor="card-number">Card Number</label>
            <input
              className={errors.cardNumber ? styles.invalid : ''}
              id="card-number"
              name="cardNumber"
              type="text"
              inputMode="numeric"
              autoComplete="off"
              value={values.cardNumber}
              onChange={updateValue}
              aria-invalid={Boolean(errors.cardNumber)}
              aria-describedby={
                errors.cardNumber ? 'card-number-error' : undefined
              }
            />
            {errors.cardNumber && (
              <p className={styles.error} id="card-number-error">
                {errors.cardNumber}
              </p>
            )}
          </div>
          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="expiry-date">Expiry Date</label>
              <input
                className={errors.expiryDate ? styles.invalid : ''}
                id="expiry-date"
                name="expiryDate"
                type="text"
                inputMode="numeric"
                autoComplete="off"
                placeholder="MM/YY"
                value={values.expiryDate}
                onChange={updateValue}
                aria-invalid={Boolean(errors.expiryDate)}
                aria-describedby={
                  errors.expiryDate ? 'expiry-date-error' : undefined
                }
              />
              {errors.expiryDate && (
                <p className={styles.error} id="expiry-date-error">
                  {errors.expiryDate}
                </p>
              )}
            </div>
            <div className={styles.field}>
              <label htmlFor="card-cvv">CVV</label>
              <input
                className={errors.cvv ? styles.invalid : ''}
                id="card-cvv"
                name="cvv"
                type="password"
                inputMode="numeric"
                autoComplete="off"
                value={values.cvv}
                onChange={updateValue}
                aria-invalid={Boolean(errors.cvv)}
                aria-describedby={errors.cvv ? 'card-cvv-error' : undefined}
              />
              {errors.cvv && (
                <p className={styles.error} id="card-cvv-error">
                  {errors.cvv}
                </p>
              )}
            </div>
          </div>
          <div className={styles.actions}>
            <button
              className={styles.cancel}
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              className={styles.submit}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating subscription…' : 'Continue'}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default PaymentForm;
