import React, { useState } from 'react';
import ErrorBoundary from './ErrorBoundary';
import LoadingSpinner from './LoadingSpinner';
import styles from './ContactForm.module.css';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });

  const [formState, setFormState] = useState({
    isSubmitting: false,
    isSubmitted: false,
    errors: [],
    successMessage: ''
  });

  const inquiryTypes = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'quote', label: 'Quote Request' },
    { value: 'technical', label: 'Technical Support' },
    { value: 'wholesale', label: 'Wholesale Inquiry' },
    { value: 'partnership', label: 'Business Partnership' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear errors when user starts typing
    if (formState.errors.length > 0) {
      setFormState(prev => ({
        ...prev,
        errors: []
      }));
    }
  };

  const validateForm = () => {
    const errors = [];

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errors.push('Name is required and must be at least 2 characters long.');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      errors.push('A valid email address is required.');
    }

    const phoneRegex = /^(\+971|971|05)[0-9]{8,9}$/;
    if (!formData.phone.trim() || !phoneRegex.test(formData.phone.replace(/\s|-/g, ''))) {
      errors.push('A valid UAE phone number is required (e.g., +971 50 123 4567).');
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errors.push('Message is required and must be at least 10 characters long.');
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const errors = validateForm();
    if (errors.length > 0) {
      setFormState(prev => ({
        ...prev,
        errors
      }));
      return;
    }

    setFormState(prev => ({
      ...prev,
      isSubmitting: true,
      errors: []
    }));

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setFormState({
          isSubmitting: false,
          isSubmitted: true,
          errors: [],
          successMessage: result.message
        });

        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          subject: '',
          message: '',
          inquiryType: 'general'
        });
      } else {
        setFormState(prev => ({
          ...prev,
          isSubmitting: false,
          errors: result.errors || [result.message]
        }));
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      setFormState(prev => ({
        ...prev,
        isSubmitting: false,
        errors: ['Network error. Please check your connection and try again.']
      }));
    }
  };

  if (formState.isSubmitted) {
    return (
      <div className={styles.successContainer}>
        <div className={styles.successIcon}>✅</div>
        <h3 className={styles.successTitle}>Message Sent Successfully!</h3>
        <p className={styles.successMessage}>{formState.successMessage}</p>
        <button
          onClick={() => setFormState({ isSubmitting: false, isSubmitted: false, errors: [], successMessage: '' })}
          className={styles.newMessageButton}
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <ErrorBoundary componentName="Contact Form">
      <div className={styles.contactForm}>
      <div className={styles.formHeader}>
        <h2 className={styles.formTitle}>Get in Touch</h2>
        <p className={styles.formSubtitle}>
          Send us a message and we'll respond within 24 hours
        </p>
      </div>

      {formState.errors.length > 0 && (
        <div className={styles.errorContainer}>
          <div className={styles.errorIcon}>⚠️</div>
          <div className={styles.errorContent}>
            <h4>Please correct the following errors:</h4>
            <ul>
              {formState.errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>
              Full Name <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={styles.input}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email Address <span className={styles.required}>*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={styles.input}
              placeholder="your.email@example.com"
              required
            />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="phone" className={styles.label}>
              Phone Number <span className={styles.required}>*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={styles.input}
              placeholder="+971 50 123 4567"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="company" className={styles.label}>
              Company Name
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              className={styles.input}
              placeholder="Your company name (optional)"
            />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="inquiryType" className={styles.label}>
              Inquiry Type
            </label>
            <select
              id="inquiryType"
              name="inquiryType"
              value={formData.inquiryType}
              onChange={handleInputChange}
              className={styles.select}
            >
              {inquiryTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="subject" className={styles.label}>
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              className={styles.input}
              placeholder="Brief subject of your inquiry"
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="message" className={styles.label}>
            Message <span className={styles.required}>*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            className={styles.textarea}
            placeholder="Please provide details about your inquiry..."
            rows="5"
            required
          />
        </div>

        <div className={styles.formActions}>
          <button
            type="submit"
            disabled={formState.isSubmitting}
            className={styles.submitButton}
          >
            {formState.isSubmitting ? (
              <>
                <span className={styles.spinner}></span>
                Sending Message...
              </>
            ) : (
              'Send Message'
            )}
          </button>
        </div>
      </form>

      <div className={styles.contactInfo}>
        <p className={styles.contactNote}>
          <strong>Need immediate assistance?</strong><br />
          Call us at <a href="tel:+971585531029">+971 58 553 1029</a> or
          WhatsApp us for instant support.
        </p>
      </div>
    </div>
    </ErrorBoundary>
  );
}
