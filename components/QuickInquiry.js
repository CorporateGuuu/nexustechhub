import React, { useState, useRef } from 'react';
import styles from './QuickInquiry.module.css';

export default function QuickInquiry() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [errors, setErrors] = useState({});
  const formRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setMessage('Please correct the errors below and try again.');
      setMessageType('error');
      // Focus first error field
      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField) {
        const errorElement = formRef.current.querySelector(`[name="${firstErrorField}"]`);
        if (errorElement) {
          errorElement.focus();
        }
      }
      return;
    }

    setIsSubmitting(true);
    setMessage('');
    setErrors({});

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          phone: '+971 00 000 0000', // placeholder
          inquiryType: 'quick'
        }),
      });

      const result = await response.json();

      if (result.success) {
        setMessage('Thank you! We\'ll get back to you soon.');
        setMessageType('success');
        setFormData({ name: '', email: '', message: '' });
        // Focus success message for screen readers
        setTimeout(() => {
          const successMessage = formRef.current.querySelector('[role="alert"]');
          if (successMessage) {
            successMessage.focus();
          }
        }, 100);
      } else {
        setMessage(result.message || 'An error occurred. Please try again.');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Quick inquiry error:', error);
      setMessage('Network error. Please try again.');
      setMessageType('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.quickInquiry} aria-labelledby="inquiry-heading">
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.text}>
            <h2 id="inquiry-heading">Need Help?</h2>
            <p>Have a question about our products or services? Send us a quick message and we'll respond promptly.</p>
          </div>

          <div className={styles.form}>
            <form onSubmit={handleSubmit} ref={formRef} noValidate aria-describedby={message ? "form-message" : undefined}>
              <div className={styles.inputGroup}>
                <div className={styles.inputWrapper}>
                  <label htmlFor="inquiry-name" className={styles.label}>
                    Your Name <span className={styles.required} aria-label="required">*</span>
                  </label>
                  <input
                    id="inquiry-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                    disabled={isSubmitting}
                    required
                    aria-invalid={errors.name ? 'true' : 'false'}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                  {errors.name && (
                    <span id="name-error" className={styles.errorMessage} role="alert" aria-live="polite">
                      {errors.name}
                    </span>
                  )}
                </div>

                <div className={styles.inputWrapper}>
                  <label htmlFor="inquiry-email" className={styles.label}>
                    Your Email <span className={styles.required} aria-label="required">*</span>
                  </label>
                  <input
                    id="inquiry-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                    className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                    disabled={isSubmitting}
                    required
                    aria-invalid={errors.email ? 'true' : 'false'}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  {errors.email && (
                    <span id="email-error" className={styles.errorMessage} role="alert" aria-live="polite">
                      {errors.email}
                    </span>
                  )}
                </div>
              </div>

              <div className={styles.inputWrapper}>
                <label htmlFor="inquiry-message" className={styles.label}>
                  Your Message <span className={styles.required} aria-label="required">*</span>
                </label>
                <textarea
                  id="inquiry-message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us about your inquiry..."
                  className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
                  rows="3"
                  disabled={isSubmitting}
                  required
                  aria-invalid={errors.message ? 'true' : 'false'}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                />
                {errors.message && (
                  <span id="message-error" className={styles.errorMessage} role="alert" aria-live="polite">
                    {errors.message}
                  </span>
                )}
              </div>

              <button
                type="submit"
                className={styles.button}
                disabled={isSubmitting}
                aria-describedby={isSubmitting ? "submitting-status" : undefined}
              >
                {isSubmitting ? (
                  <>
                    <span aria-hidden="true">Sending...</span>
                    <span id="submitting-status" className={styles.srOnly}>
                      Please wait while we send your message
                    </span>
                  </>
                ) : (
                  'Send Message'
                )}
              </button>

              {message && (
                <div
                  id="form-message"
                  className={`${styles.message} ${styles[messageType]}`}
                  role="alert"
                  aria-live="polite"
                  tabIndex="-1"
                >
                  {message}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
