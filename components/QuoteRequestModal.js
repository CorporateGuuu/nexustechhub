import { useState, useEffect } from 'react';
import ErrorBoundary from './ErrorBoundary';
import styles from './QuoteRequestModal.module.css';

export default function QuoteRequestModal({ isOpen, onClose, preselectedProduct = null }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    businessType: 'retail',
    urgency: 'standard',
    specialRequirements: ''
  });

  const [products, setProducts] = useState([]);
  const [formState, setFormState] = useState({
    isSubmitting: false,
    isSubmitted: false,
    errors: [],
    successMessage: '',
    quoteId: ''
  });

  const businessTypes = [
    { value: 'retail', label: 'Retail Store' },
    { value: 'repair_shop', label: 'Repair Shop' },
    { value: 'distributor', label: 'Distributor' },
    { value: 'technician', label: 'Independent Technician' },
    { value: 'corporate', label: 'Corporate' },
    { value: 'other', label: 'Other' }
  ];

  const urgencyOptions = [
    { value: 'standard', label: 'Standard (3-5 days)' },
    { value: 'urgent', label: 'Urgent (1-2 days)' },
    { value: 'emergency', label: 'Emergency (Same day)' }
  ];

  // Initialize with preselected product if provided
  useEffect(() => {
    if (preselectedProduct && isOpen) {
      setProducts([{
        id: Date.now(),
        name: preselectedProduct.name,
        sku: preselectedProduct.sku,
        category: preselectedProduct.category,
        basePrice: preselectedProduct.price,
        quantity: 1
      }]);
    }
  }, [preselectedProduct, isOpen]);

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

  const handleProductChange = (productId, field, value) => {
    setProducts(prev => prev.map(product =>
      product.id === productId
        ? { ...product, [field]: field === 'quantity' ? parseInt(value) || 1 : value }
        : product
    ));
  };

  const addProduct = () => {
    const newProduct = {
      id: Date.now(),
      name: '',
      sku: '',
      category: '',
      basePrice: 0,
      quantity: 1
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const removeProduct = (productId) => {
    setProducts(prev => prev.filter(product => product.id !== productId));
  };

  const calculateBulkPricing = (basePrice, quantity) => {
    let unitPrice = basePrice;
    let discount = 0;

    if (quantity >= 10) {
      discount = 15;
      unitPrice = basePrice * 0.85;
    } else if (quantity >= 5) {
      discount = 10;
      unitPrice = basePrice * 0.90;
    } else if (quantity >= 2) {
      discount = 5;
      unitPrice = basePrice * 0.95;
    }

    return {
      unitPrice: Math.round(unitPrice * 100) / 100,
      totalPrice: Math.round(unitPrice * quantity * 100) / 100,
      discount,
      savings: Math.round((basePrice - unitPrice) * quantity * 100) / 100
    };
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

    if (products.length === 0) {
      errors.push('At least one product must be added to the quote request.');
    }

    products.forEach((product, index) => {
      if (!product.name.trim()) {
        errors.push(`Product ${index + 1}: Name is required.`);
      }
      if (!product.sku.trim()) {
        errors.push(`Product ${index + 1}: SKU is required.`);
      }
      if (!product.basePrice || product.basePrice <= 0) {
        errors.push(`Product ${index + 1}: Valid base price is required.`);
      }
      if (!product.quantity || product.quantity < 1) {
        errors.push(`Product ${index + 1}: Quantity must be at least 1.`);
      }
    });

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          products: products.map(({ id, ...product }) => product)
        }),
      });

      const result = await response.json();

      if (result.success) {
        setFormState({
          isSubmitting: false,
          isSubmitted: true,
          errors: [],
          successMessage: result.message,
          quoteId: result.data.quoteId
        });
      } else {
        setFormState(prev => ({
          ...prev,
          isSubmitting: false,
          errors: result.errors || [result.message]
        }));
      }
    } catch (error) {
      console.error('Quote request submission error:', error);
      setFormState(prev => ({
        ...prev,
        isSubmitting: false,
        errors: ['Network error. Please check your connection and try again.']
      }));
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      businessType: 'retail',
      urgency: 'standard',
      specialRequirements: ''
    });
    setProducts([]);
    setFormState({
      isSubmitting: false,
      isSubmitted: false,
      errors: [],
      successMessage: '',
      quoteId: ''
    });
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  if (formState.isSubmitted) {
    return (
      <div className={styles.modalOverlay} onClick={handleClose}>
        <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
          <div className={styles.successContainer}>
            <div className={styles.successIcon}>✅</div>
            <h3 className={styles.successTitle}>Quote Request Submitted!</h3>
            <p className={styles.successMessage}>{formState.successMessage}</p>
            <div className={styles.quoteId}>
              <strong>Quote ID: {formState.quoteId}</strong>
            </div>
            <div className={styles.successActions}>
              <button onClick={handleClose} className={styles.closeButton}>
                Close
              </button>
              <button
                onClick={() => setFormState(prev => ({ ...prev, isSubmitted: false }))}
                className={styles.newQuoteButton}
              >
                Request Another Quote
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary componentName="Quote Request Modal">
      <div className={styles.modalOverlay} onClick={handleClose}>
        <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Request Quote</h2>
          <button onClick={handleClose} className={styles.closeButton}>
            ✕
          </button>
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
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Contact Information</h3>

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
                <label htmlFor="businessType" className={styles.label}>
                  Business Type
                </label>
                <select
                  id="businessType"
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleInputChange}
                  className={styles.select}
                >
                  {businessTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="urgency" className={styles.label}>
                  Urgency
                </label>
                <select
                  id="urgency"
                  name="urgency"
                  value={formData.urgency}
                  onChange={handleInputChange}
                  className={styles.select}
                >
                  {urgencyOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>Products</h3>
              <button
                type="button"
                onClick={addProduct}
                className={styles.addProductButton}
              >
                + Add Product
              </button>
            </div>

            {products.map((product, index) => {
              const pricing = calculateBulkPricing(product.basePrice, product.quantity);

              return (
                <div key={product.id} className={styles.productCard}>
                  <div className={styles.productHeader}>
                    <h4>Product {index + 1}</h4>
                    {products.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeProduct(product.id)}
                        className={styles.removeProductButton}
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>
                        Product Name <span className={styles.required}>*</span>
                      </label>
                      <input
                        type="text"
                        value={product.name}
                        onChange={(e) => handleProductChange(product.id, 'name', e.target.value)}
                        className={styles.input}
                        placeholder="e.g., iPhone 15 Pro OLED Screen"
                        required
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.label}>
                        SKU <span className={styles.required}>*</span>
                      </label>
                      <input
                        type="text"
                        value={product.sku}
                        onChange={(e) => handleProductChange(product.id, 'sku', e.target.value)}
                        className={styles.input}
                        placeholder="e.g., NTH-IP15-SCREEN-001"
                        required
                      />
                    </div>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>
                        Category
                      </label>
                      <input
                        type="text"
                        value={product.category}
                        onChange={(e) => handleProductChange(product.id, 'category', e.target.value)}
                        className={styles.input}
                        placeholder="e.g., iPhone Parts"
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.label}>
                        Base Price (AED) <span className={styles.required}>*</span>
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={product.basePrice}
                        onChange={(e) => handleProductChange(product.id, 'basePrice', parseFloat(e.target.value) || 0)}
                        className={styles.input}
                        placeholder="0.00"
                        required
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.label}>
                        Quantity <span className={styles.required}>*</span>
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={product.quantity}
                        onChange={(e) => handleProductChange(product.id, 'quantity', e.target.value)}
                        className={styles.input}
                        required
                      />
                    </div>
                  </div>

                  {product.basePrice > 0 && product.quantity > 0 && (
                    <div className={styles.pricingPreview}>
                      <div className={styles.pricingRow}>
                        <span>Unit Price:</span>
                        <span>AED {pricing.unitPrice} {pricing.discount > 0 && `(${pricing.discount}% off)`}</span>
                      </div>
                      <div className={styles.pricingRow}>
                        <span>Total:</span>
                        <span><strong>AED {pricing.totalPrice}</strong></span>
                      </div>
                      {pricing.savings > 0 && (
                        <div className={styles.pricingRow}>
                          <span>You Save:</span>
                          <span className={styles.savings}>AED {pricing.savings}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Additional Information</h3>

            <div className={styles.formGroup}>
              <label htmlFor="specialRequirements" className={styles.label}>
                Special Requirements
              </label>
              <textarea
                id="specialRequirements"
                name="specialRequirements"
                value={formData.specialRequirements}
                onChange={handleInputChange}
                className={styles.textarea}
                placeholder="Any special requirements, installation notes, or additional information..."
                rows="3"
              />
            </div>
          </div>

          <div className={styles.formActions}>
            <button
              type="button"
              onClick={handleClose}
              className={styles.cancelButton}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={formState.isSubmitting}
              className={styles.submitButton}
            >
              {formState.isSubmitting ? (
                <>
                  <span className={styles.spinner}></span>
                  Submitting Quote...
                </>
              ) : (
                'Request Quote'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
    </ErrorBoundary>
  );
}
